// Bootstrap to update main layout of the page 

var timeTableDisplayEl = $("#timeTableDisplay");
var dateDisplayEl = $("#currentDay");


// For loop generate table row x 8, assgin relevant class and IDs to each.
// Jquery to dynamically update html and css
for (i = 9; i < 18; i++ ) {

  var hour = moment(i,"H").format("hA");
  console.log(hour);

  // Check and make all hour same length format, such as convert 9AM to 09AM.
  // if (hour.length !== 4) {
  //   hour = "0" + hour;
  // }
  
  var timeTableRowEl = $("<tr>").addClass("row");
  var formRowEl = $("<form>");

  var hourEl = $("<td>")
    .addClass("col-2 hour")
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
      
  $("<input>").attr({
    type:"button",
    id: hour+"Btn"})
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


// Add event listener to the timeblocks, based on target update relevant row only.
$(":button").click(function (event) {
  console.log("clicked!");

  // event.preventDefault();

  let targetInput = $(event.target).parent().prev().children().children()[0];
  let userInput = targetInput.value.trim();

  localStorage.setItem(targetInput.id,userInput);

  console.log("getITEM: " + localStorage.getItem(targetInput.id));

  console.log("userInput is: " + userInput);
  console.log("targetInputID: " + targetInput.id);

  updateSchedule();

  // var matchedStr = event.target.id.substring(0,3);
  // console.log(matchedStr);
  // var matchedEl = $(":input").find(matchedStr);
  // console.log(matchedEl);

  // console.log($(event.target).prev().prev());
  // var theParent= $(event.target).parent();
  // var second = theParent.siblings().eq(1).children();
  // console.log(second);
  // console.log($(event.target).parent().prev().children()[0].value);
  // var userInputD = document.getElementById("9AMInput");
  // var userInputJ = $("#9AMInput")[0];
  // console.log(userInputD);
  // console.log(userInputJ);
  // $(theParentOfParent:nth-child(2))
  // var tar = event.target;
  // console.log($(tar).prev().id);
});


// Save schedule for each hour of the day - local storage
// Update schedule
function saveInput() {
  console.log("content saved!");
}

function updateSchedule() {
  // var textareaElGE = document.querySelectorAll("textarea");
  // console.log(typeof(textareaEl));
  // console.log(textareaEl[0].id);
  // console.log(typeof(textareaEl[0]));
  // console.log(textareaEl.length);

  // let textareaElIds = textareaEl.map(function (a) {
  //   return a.id;
  // });

  // textareaEl0 = textareaEl[0];

  // var c = function (d) {
  //   return d.id;
  // }

  // let testIds = c (textareaEl0);
  // console.log(testIds);

  // console.log(textareaElIds);
  // console.log(typeof textareaElIds);
  // console.log(textareaElIds.length);
  // console.log(textareaElIds[0]);

  // textareaElArray = Object.entries(textareaEl);
  // console.log(typeof textareaElArray);
  // console.log(typeof textareaElArray[0]);
  // console.log(textareaElArray)

  // textareaEl.map(item => {});

  // console.log(textareaEl);
  // console.log(textareaElGE);

  // for (obj in textareaElGE) {
  //   console.log(obj.id);
  // }

  // for (let i=0; i<textareaElGE.length; i++) {
  //   console.log(textareaElGE[i].id);
  // }

  // grab all the textarea
  var textareaEl = $("textarea");
  let textareaData = [];

  // Loop through textarea elements and assign ids.
  for (let i=0; i<textareaEl.length; i++) {
    textareaData[i] = {id:"", content:""};
    textareaData[i].id = textareaEl[i].id;

    // Get data from localStorage
    textareaData[i].content = localStorage.getItem(textareaData[i].id);
  }

  console.log(textareaData);

  for (let j=0; j<textareaData.length; j++) {
    if (textareaData[j].content) {
      console.log(textareaData[j].id + " this IDs has conetent:  " + textareaData[j].content);
      $("#" + textareaData[j].id).text(textareaData[j].content);
      console.log(textareaData[j].id);
    }
  }
}

updateSchedule();
// With Moment.js .diff() method, compare timeblock vs current time, update attributes accordingly.



// Moment.js to display current date and time
// handle displaying the date
function displayDate() {
  var dateToday = moment().format("dddd, MMMM Do");
  dateDisplayEl.text(dateToday);
  // console.log(dateToday);
  // console.log(moment().format("HHA"));
  // console.log(moment("9","H").format("HHA"));
}

displayDate();

// Moment.js to compare curent time vs schedule time => dynamically update status of task
