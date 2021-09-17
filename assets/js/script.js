// Bootstrap to update main layout of the page 

// Moment.js to display current date and time
// format is Thursday, September 15th
var dateDisplayEl = $("#currentDay");

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
