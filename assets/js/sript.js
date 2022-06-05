// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

var today = moment().format("dddd, MMMM do");
var currentTime = parseInt(moment().format("k"));


setInterval(currentTime, 60000);
setInterval(today,3600000);

$(document).ready(function() {
  $("#currentDay").text(today)

  $(".saveBtn").on("click",function() {
    var planLog = $(this).siblings(".description").val();
    var timeBlock = $(this).closest(".row").attr("id");

    localStorage.setItem(timeBlock, planLog);
  })

  $(".row").each(function() {
    var hour = $(this).attr("id");
    var planInput = localStorage.getItem(hour);

    if(!planInput) {
      return;
    } else {
      $(this > ".description").val(planInput);
    };
  })

  function timeTracker() {
    $(".time-block").each(function() {
      var hour = parseInt($(this).closest(".row").attr("id"));
      console.log(hour);
      console.log(currentTime);
      if (hour > currentTime) {
        $(this).addClass("future");
      } else if (hour === currentTime) {
        $(this).addClass("present");
      } else {
        $(this).addClass("past");
      }
    })
  };
  timeTracker();
})