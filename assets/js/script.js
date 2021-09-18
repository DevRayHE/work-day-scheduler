// Bootstrap to update main layout of the page 

var timeTableDisplayEl = $("#timeTableDisplay");
var dateDisplayEl = $("#currentDay");


// For loop generate table row x 8, assgin relevant class and IDs to each.
// Jquery to dynamically update html and css
for (i = 0; i < 9; i++ ) {
  if (i<3) {
    var hour = (i + 9) + "AM";
  } else if (i === 3) {
    var hour = (i + 9) + "PM";
  } else {
    var hour = (i -3) + "PM";
  }

  // Check and make all hour same length format, such as convert 9AM to 09AM.
  if (hour.length !== 4) {
    hour = "0" + hour;
  }
  
  var timeTableRowEl = $("<tr>").addClass("row");

  var hourEl = $("<td>")
    .addClass("col-2 hour")
    .text(hour);
  
  var inputRowEl = $("<td>")
    .addClass("col-8");

  // Assign each btn a unique ID for event listening
  var saveBtnEl = $("<td>")
    .addClass("col-2")
    .text("saveButton");

  $("<input>").attr({
    type:"button",
    id: hour+"Btn",
  })
  .addClass("saveBtn")
  .text("saveButton")
  .appendTo(saveBtnEl);


    // .attr({
    // type:"button",
    // id: hour + "Btn",
    // enable:true})
    // .addClass("col-2 saveBtn")
    // .text("saveButton")
 

  // Assign each input field a unique ID
  $("<input>").attr({ 
    type:"text", 
    id: hour + "Input",
    placeholder:"Available", 
    class:"time-block"})
    .appendTo(inputRowEl);

  timeTableRowEl.append(
    hourEl,
    inputRowEl,
    saveBtnEl
  );

  timeTableDisplayEl.append(timeTableRowEl);

  // eval("var " + )
  // let timeHour = "9am";
  // var inputArea = "";
  // var saveBtn
}


// Add event listener to the timeblocks, based on target update relevant row only.
$(":input").click(function (event) {
  console.log("clicked!");
  console.log(event.target.id.substring(0,4));
});


// Save events for each hour of the day - local storage
function saveInput() {
  console.log("content saved!");
}
// With Moment.js .diff() method, compare timeblock vs current time, update attributes accordingly.



// Moment.js to display current date and time
// handle displaying the date
function displayDate() {
  var dateToday = moment().format("dddd, MMMM Do");
  dateDisplayEl.text(dateToday);
  console.log(dateToday);
}

displayDate();


// Moment.js to compare curent time vs schedule time => dynamically update status of task
