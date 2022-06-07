// Option to instead make textarea editable span with button nested within.
// Small styling changes would be needed.
// Doing this would allow for a "blur" event to clear text if save is not clicked.

$(document).ready(function() {
  $("#currentDay").text(today)

  var today = moment().format("dddd, MMMM do");
  var currentTime = parseInt(moment().format("k"));


  setInterval(currentTime, 60000);
  setInterval(today,3600000);

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