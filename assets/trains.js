var config = {
  apiKey: "AIzaSyAph7NdyViwMZZZDXF9zwiku1Buszo3mIE",
  authDomain: "train-69059.firebaseapp.com",
  databaseURL: "https://train-69059.firebaseio.com",
  projectId: "train-69059",
  storageBucket: "train-69059.appspot.com",
  messagingSenderId: "616860510835"
};
firebase.initializeApp(config);

var database = firebase.database();
// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  var trainArrival = $("#arrival-input").val().trim();
  var trainAway = ""

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    arrival: trainArrival,
    minutesAway: trainAway
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.arrival);
  console.log(newTrain.minutesAway);

  alert("New Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#arrival-input").val("");
  $("#minAway-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainArrival = childSnapshot.val().arrival;
  var trainAway = childSnapshot.val().minutesAway;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFrequency);
  console.log(trainArrival);
  console.log(trainAway);


  var tFrequency = trainFrequency;

    // Time is whatever the user inputs on the form
    var firstTime = trainArrival;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // difftime mod tfreq  --- Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Away
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

    var nextArrival =moment(nextTrain).format("hh:mm A");
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(tMinutesTillTrain)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
