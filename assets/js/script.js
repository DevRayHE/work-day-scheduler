
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
    let hour = moment(i,"H").format("hA");
    let timeTableRowEl = $("<tr>").addClass("row");
    let formRowEl = $("<form>");

    let hourEl = $("<td>")
      .addClass("col-2 hour")
      .attr("id",hour)
      .text(hour);
    
    let inputRowEl = $("<td>")
      .addClass("col-8");

    // Assign each btn a unique ID for event listening
    let saveBtnEl = $("<td>")
      .addClass("col-2 saveBtn");

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
  // Add event listener to the timeblocks, double click to place line through text to indicate it's done.
  $(".time-block").dblclick(function (event) {
    let targetEl = event.target;

    // line through only applicable on time block which has data on it.
    if (JPLSGI(targetEl.id).content) {
      $(targetEl).toggleClass("line-through");
    }
  })

  // Add event listener to the timeblocks, based on target update relevant row only.
  $(":button").click(function (event) {

    // Dom traverse to select the textarea of the save button
    let targetInput = $(event.target).parent().prev().children().children()[0];
    let targetInputId = targetInput.id;
    let targetTime = targetInputId.substring(0, targetInputId.length -5);

    var userInput = {
      id: targetInputId,
      content: targetInput.value.trim(),
      lineThrough: Boolean
    };

    let inputContent = userInput.content;
    // Prevent line through presist if content is cleared
    if (!inputContent) {
      userInput.lineThrough = false;
    } else if ($(targetInput).hasClass("line-through")) {
      userInput.lineThrough = true
    } else {
      userInput.lineThrough = false
    }

    // create empty local storage if it does not exist
    if (!JPLSGI(targetInputId)) {
      localStorage.setItem(targetInputId, JSON.stringify({
        id:targetInputId,
        content:"",
        lineThrough:userInput.lineThrough
      }));
    }
    
    // Get content from local storage if storage has data only.
    let storageContent = JPLSGI(targetInputId).content;
    let storageContentLineStatus = JPLSGI(targetInputId).lineThrough;
    
    // Based on scneario, store event and display notification.
    // Local sotrage content and user input both empty
    if (!storageContent && !inputContent) {
      displayNotification(targetTime + " event is empty❗");
    } 
    // Local sotrage has data but user input is empty
    else if (storageContent && !inputContent) {
      // Trying to fix the bug where line through presist when event is cleared
      // userInput.lineThrough = false
      localStorage.setItem(targetInputId, JSON.stringify(userInput));
      displayNotification(targetTime + " event cleared! ☑️");

      // Edge case bug fix - so that line-through does not show on place holder text
      if (storageContentLineStatus) {
        $(targetInput).toggleClass("line-through");
      }
    } // Update event
    else if (storageContent && inputContent) {
      localStorage.setItem(targetInputId, JSON.stringify(userInput));
      displayNotification(targetTime + " event updated ✅");
    } // New event
    else if (!storageContent && inputContent) {
      localStorage.setItem(targetInputId, JSON.stringify(userInput));
      displayNotification(targetTime + " event saved ✔");
    }
  });
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

// Display notification 
function displayNotification(displayContent) {
  $(".notification").text(displayContent)
  $(".notification").css("visibility", "visible");
  setTimeout(function(){ $(".notification").css("visibility", "hidden"); } ,1000)
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
      $("#" + allHourEl[i].id ).next().toggleClass("past", true);
      $("#" + allHourEl[i].id ).next().toggleClass("present", false);
      $("#" + allHourEl[i].id ).next().toggleClass("future", false);
    } // Present
    else if ((moment(hourRowIdMoment).diff(hourNow)) === 0){
      $("#" + allHourEl[i].id ).next().toggleClass("past", false);
      $("#" + allHourEl[i].id ).next().toggleClass("present", true);
      $("#" + allHourEl[i].id ).next().toggleClass("future", false);
    } // Future
    else {
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