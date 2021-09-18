// Bootstrap to update main layout of the page 

var timeTableDisplayEl = $("#timeTableDisplay");
var dateDisplayEl = $("#currentDay");


// For loop generate table row x 8, assgin relevant class to each.
for (i = 0; i < 9; i++ ) {
  if (i<3) {
    var hour = (i + 9) + "AM";
  } else if (i === 3) {
    var hour = (i + 9) + "PM";
  } else {
    var hour = (i -3) + "PM";
  }
  
  var timeTableRowEl = $("<tr>").addClass("row");

  var hourEl = $("<td>").addClass("col-2 hour").text(hour);
  var inputEl = $("<td>").addClass("col-8 time-block").text("input area");
  var saveBtn = $("<td>").addClass("col-2 btn saveBtn").text("saveButton");

  timeTableRowEl.append(
    hourEl,
    inputEl,
    saveBtn
  );

  timeTableDisplayEl.append(timeTableRowEl);

  // eval("var " + )
  // let timeHour = "9am";
  // var inputArea = "";
  // var saveBtn
}


// Add event listener to the timeblocks, based on target update relevant row only.
// With Moment.js .diff() method, compare timeblock vs current time, update attributes accordingly.



// Moment.js to display current date and time
// format is Thursday, September 15th

// handle displaying the date
function displayDate() {
  var dateToday = moment().format("dddd, MMMM Do");
  dateDisplayEl.text(dateToday);
  console.log(dateToday);
}

displayDate();


// Moment.js to compare curent time vs schedule time => dynamically update status of task

// Jquery to dynamically update html and css

// Save events for each hour of the day - local storage
