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

  var trainName = ""
  var destination = ""
  var firstTrain = ""
  var frequency = ""
  var newT = Date.now();
    //var format = moment("HH:mm")

  $("#submitBtn").on("click", function(){
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTime").val().trim();
    frequency = $("#frequency").val().trim();

    console.log(trainName)

    var trainInfo = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
    }

database.ref().push(trainInfo)


});

database.ref().orderByChild("dateAdded").on("child_added", function(snapshot){
    newT = new Date();
    var data = snapshot.val();
    var nextTrain = data.frequency+data.firstTrain
    // format.moment(dateAdded)
    $("#tbody").append("<tr> <td>"+data.trainName+"</td><td>"+data.destination+"</td><td>"+data.firstTrain+"</td><td>"+data.frequency+"</td><td>"+nextTrain+"</td><td>");

  });

