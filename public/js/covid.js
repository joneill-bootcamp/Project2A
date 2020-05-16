$(document).ready(function () {
  var users = [];

  //Event Handlers
  $(document).on("click", "button.something", afunction);

  function main() {
    $.get("/api/user", function (data) {
      users = data;

      console.log(" User Data", users);
    });
  }

  function queryGet(get) {
    $.ajax({
      method: "GET",
      url: "/api/get",
      data: get,
    }).then(function () {
      console.log(get);
    });
  }

  function afunction() {}

  // Iniital Run logic
  main();
});
