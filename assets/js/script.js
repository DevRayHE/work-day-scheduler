// Bootstrap to update main layout of the page 

var timeTableDisplayEl = $("#timeTableDisplay");
var dateDisplayEl = $("#currentDay");


// For loop generate table row x 8, assgin relevant class and IDs to each.
// Jquery to dynamically update html and css
for (i = 9; i < 18; i++ ) {
  // if (i<3) {
  //   var hour = (i + 9) + "AM";
  // } else if (i === 3) {
  //   var hour = (i + 9) + "PM";
  // } else {
  //   var hour = (i -3) + "PM";
  // }

  var hour = moment(i,"H").format("hA");
  console.log(hour);

  // Check and make all hour same length format, such as convert 9AM to 09AM.
  // if (hour.length !== 4) {
  //   hour = "0" + hour;
  // }
  
  var formRowEl = $("<form>");

  var timeTableRowEl = $("<tr>").addClass("row");

  var hourEl = $("<td>")
    .addClass("col-2 hour")
    .text(hour);
  
  var inputRowEl = $("<td>")
    .addClass("col-8");

  inputRowEl.append(formRowEl);

  // Assign each btn a unique ID for event listening
  var saveBtnEl = $("<td>")
    .addClass("col-2");

  $("<input>").attr({
    type:"button",
    id: hour+"Btn",
    form: hour + "Input"})
  .addClass("saveBtn")
  .text("saveButton")
  .appendTo(saveBtnEl);
 
  // Assign each input field a unique ID
  $("<input>").attr({ 
    type:"text", 
    id: hour + "Input",
    placeholder:"Available", 
    class:"time-block"})
    .appendTo(formRowEl);

  timeTableRowEl.append(
    hourEl,
    inputRowEl,
    saveBtnEl
  );

  // timeTableRowEl.append(formRowEl);
  timeTableDisplayEl.append(timeTableRowEl);
}


// Add event listener to the timeblocks, based on target update relevant row only.
$(":button").click(function (event) {
  console.log("clicked!");

  event.preventDefault();
  
  var matchedStr = event.target.id.substring(0,3);
  // console.log(matchedStr);
  var matchedEl = $(":input").find(matchedStr);
  // console.log(matchedEl);

  // console.log($(event.target).prev().prev());
  var theParentOfParent = $(event.target).parent();
  var second = theParentOfParent.siblings().eq(1).children();
  console.log(second);
  var userInput = document.getElementById("9AMInput").value;
  console.log(userInput);
  // $(theParentOfParent:nth-child(2))
  // var tar = event.target;
  // console.log($(tar).prev().id);
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
  console.log(moment().format("HHA"));
  console.log(moment("9","H").format("HHA"));
}

displayDate();

// Moment.js to compare curent time vs schedule time => dynamically update status of task
