    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCrzyJ208oevU87idEw3aQzuEcvHgYgtoo",
    authDomain: "train-schedule-c5017.firebaseapp.com",
    databaseURL: "https://train-schedule-c5017.firebaseio.com",
    projectId: "train-schedule-c5017",
    storageBucket: "train-schedule-c5017.appspot.com",
    messagingSenderId: "191512980615"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";

  $("#submitBtn").on("click", function(){
    event.preventDefault();

   trainName = $("#trainName").val().trim();
   destination = $("#destination").val().trim();
   firstTrain = $("#firstTime").val().trim();
    frequency = $("#frequency").val().trim();
    
    $(".form-field").val('');
    
    console.log(trainName)

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        });

        sessionStorage.clear();
    
});

database.ref().on("child_added", function(childsnapshot){
    var timeConverted = moment(childsnapshot.val().firstTrain,"hh:mm").subtract(1, "years"); 
    console.log(timeConverted);
    var diffTime = moment().diff(moment(timeConverted),"minutes");
    console.log(diffTime);
    var tRemain = diffTime % childsnapshot.val().frequency;
    console.log(tRemain);
    var minTime = childsnapshot.val().frequency-tRemain;
    console.log(minTime);
    var nextTrain = moment().add(minTime,"minutes");
    console.log(nextTrain);
    $("#tbody").append("<tr> <td>"+childsnapshot.val().trainName+"</td><td>"+childsnapshot.val().destination+"</td><td>"+childsnapshot.val().frequency+"</td><td>"+moment(nextTrain).format("LT")+"</td><td>"+minTime+"</td><td>");

  });

