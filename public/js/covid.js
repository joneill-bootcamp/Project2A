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

    function afunction() {

    }

    // Iniital Run logic
    main();
});