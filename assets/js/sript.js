// Set global variables
var today = moment().format("dddd, MMMM do");
var currentTime = parseInt(moment().format("k"));


// On document ready, all should load
$(document).ready(function() {
  $("#currentDay").text(today)

  // These should update periodically (in case a page is not refreshed)
  setInterval(currentTime, 60000);
  setInterval(today,3600000);

  // On save, set description text and time in localStorage
  $(".saveBtn").on("click",function() {
    var planLog = $(this).siblings(".description").val();
    var timeBlock = $(this).closest(".row").attr("id");

    localStorage.setItem(timeBlock, planLog);
  })

  // Pull from localStorage for each respective row
  $(".row").each(function() {
    var hour = $(this).attr("id");
    var planInput = localStorage.getItem(hour);

    if(!planInput) {
      return;
    } else {
      $(this).children(".description").val(planInput);
    };
  })

  // Automatically shade time-blocks based on current time.
  function timeTracker() {
    $(".time-block").each(function() {
      var hour = parseInt($(this).closest(".row").attr("id"));
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