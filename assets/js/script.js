
var timeTableDisplayEl = $("#timeTableDisplay");
var dateDisplayEl = $("#currentDay");

function init() {

  // Generate table row x 8, assgin relevant class and IDs to each.
  createTimeBlocks();
  displayDate();

  // Calling these 3 functions after all page elements created to display todays date, update Schedule on the hour and set the time block color update on a 3 seconds timer.
  clickEventListener();
  updateSchedule();
  updateTimer();
}

// Generate table row x 8, assgin relevant class and IDs to each.
function createTimeBlocks() {

  for (i = 9; i < 18; i++ ) {
    var hour = moment(i,"H").format("hA");
    var timeTableRowEl = $("<tr>").addClass("row");
    var formRowEl = $("<form>");

    var hourEl = $("<td>")
      .addClass("col-2 hour")
      .attr("id",hour)
      .text(hour);
    
    var inputRowEl = $("<td>")
      .addClass("col-8");

    // Assign each btn a unique ID for event listening
    var saveBtnEl = $("<td>")
      .addClass("col-2");

    // Assign each input field a unique ID
    $("<textarea>").attr({ 
      type:"text", 
      id: hour + "Input",
      rows: "3",
      placeholder:"Available", 
      class:"time-block"})
      .appendTo(formRowEl);
        
    // Assign each input button a unique ID
    $("<input>").attr({
      type:"button",
      id: hour + "Btn"})
      .addClass("saveBtn")
      .text("saveButton")
      .appendTo(saveBtnEl);
          
    inputRowEl.append(formRowEl);

    timeTableRowEl.append(
      hourEl,
      inputRowEl,
      saveBtnEl
    );

    timeTableDisplayEl.append(timeTableRowEl);
  }
}

// Moment.js to display current date and time
// handle displaying the date
function displayDate() {
  var dateToday = moment().format("dddd, MMMM Do");
  dateDisplayEl.text(dateToday);
}

// Add event listener to button and timeblocks data
function clickEventListener() {
   // Add event listener to the timeblocks, based on target update relevant row only.
   $(":button").click(function (event) {

    // Dom traverse to select the textarea of the save button
    let targetInput = $(event.target).parent().prev().children().children()[0];
    let targetInputId = targetInput.id;

    var userInput = {
      id: targetInputId,
      content: targetInput.value.trim(),
      lineThrough: Boolean
    };

    if ($(targetInput).hasClass("line-through")) {
      userInput.lineThrough = true;
    } else {
      userInput.lineThrough = false;
    }

    localStorage.setItem(targetInputId, JSON.stringify(userInput));

    // Notification on successfully saved event only
    if (JPLSGI(targetInputId).content === userInput.content) {
      let notify = targetInputId.substring(0, targetInputId.length -5) + " event saved☑️";
      $(".notification").text(notify)
      $(".notification").css("visibility", "visible");
      setTimeout(function(){ $(".notification").css("visibility", "hidden"); } ,1000)
    }
  
  });

  // Add event listener to the timeblocks, double click to place line through text to indicate it's done.
  $(".time-block").dblclick(function (event) {
    let targetEl = event.target;

    // line through only applicable on time block which has data on it.
    if (JPLSGI(targetEl.id).content) {
      $(targetEl).toggleClass("line-through");
    }
  })
}

// Update schedule by getting data from local storage
function updateSchedule() {

  // Select all the textarea
  var textareaEl = $("textarea");

  // Loop through textarea elements and get data from local storage 
  for (let i=0; i<textareaEl.length; i++) {
    // Only updates event if stored data is on storage
    if (localStorage.getItem(textareaEl[i].id)) {
      let textareaData = {};
      textareaData = JPLSGI(textareaEl[i].id);

      if (textareaData) {
        $("#" + textareaData.id).text(textareaData.content);
        // Only toggle the line-through style if current displayed style does not match local storage data
        if($(textareaEl[i]).hasClass("line-through") !== textareaData.lineThrough) {
          $(textareaEl[i]).toggleClass("line-through");
        }
      }
    }
  }
}

// Timer function to update time block color every 3 seconds
function updateTimer() {
  
  updateTimeblockColor();

  timer = setInterval(function() {
    updateTimeblockColor();
  }, 3000);
}

// With Moment.js .diff() method, compare timeblock vs current time, update attributes accordingly.
// Moment.js to compare curent time vs schedule time => dynamically update status of task
function updateTimeblockColor() {

  var allHourEl = $(".hour");

  for (let i = 0; i < allHourEl.length; i++) {

    let hourRowId = (allHourEl[i].id);
    // Gets current hour in "hA" format and convert to moment object
    let hourNow = moment(moment().format("hA"), "hA");
    // convert hourRowId to moment object
    let hourRowIdMoment = moment(hourRowId, "hA");

    // Pass
    if ((moment(hourRowIdMoment).diff(hourNow) < 0)) {
      console.log("past" + hourRowId);
      $("#" + allHourEl[i].id ).next().toggleClass("past", true);
      $("#" + allHourEl[i].id ).next().toggleClass("present", false);
      $("#" + allHourEl[i].id ).next().toggleClass("future", false);
    } // Present
    else if ((moment(hourRowIdMoment).diff(hourNow)) === 0){
      console.log("present" + hourRowId);
      $("#" + allHourEl[i].id ).next().toggleClass("past", false);
      $("#" + allHourEl[i].id ).next().toggleClass("present", true);
      $("#" + allHourEl[i].id ).next().toggleClass("future", false);
    } // Future
    else {
      console.log("future" + hourRowId);
      $("#" + allHourEl[i].id ).next().toggleClass("past", false);
      $("#" + allHourEl[i].id ).next().toggleClass("present", false);
      $("#" + allHourEl[i].id ).next().toggleClass("future", true);
    }
  }
}

// Define a function to perform JSON.parse(localStorage.getItem()) and return the value.
function JPLSGI (para) {
  return JSON.parse(localStorage.getItem(para));
}

init();