$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $("#user-name").text(data.username);
    $("#user-name").attr("userid", data.id);
    if (data.country !== null) {
      $("#country").val(data.country);
      $("#data-choice").val(data.dataChoice);
      $("#graph-choice").val(data.graphChoice);
    }
  });
});
