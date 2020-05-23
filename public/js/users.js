$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $("#user-name").text(data.username);
    $("#user-name").attr('userid', data.id);

    $("#data-choice").val(data.datachoice);
    $("#data-choice option[value=data.datachoice]").attr('selected', 'selected');
    $("#graph-choice").val(data.graphchoice);
  });
});