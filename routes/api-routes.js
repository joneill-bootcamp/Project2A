// Requiring our models
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");
const moment = require("moment");


// Routes
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's username and id
      res.json({
        username: req.user.username,
        id: req.user.id,
      });
    }
  });

  // GET route XXXXXXXX
  app.get("/api/covid", function (req, res) {
    var query = {};

    db.User.findAll({
      where: query,
    }).then(function (dbGet) {
      res.json(dbGet);
    });
  });

  // GET route data for a week
  app.get("/api/getdata", function (req, res) {
    var responseData = {};

    // User queries
    var userChoices = req.query.desired_attributes;

    // Call callAPI for 7 days of data
    responseData = callAPI(
      req.query.query_region,
      req.query.desired_attributes
    );


    res.json({
      data: true // todo: replace with the data that we need for the ui
    })
  });

  // Call Covid API taking user Input
  function callAPI(query_region, desired_attributes) {
    // Set up localvars
    var returnData = {};
    const todayDate = new Date();

    var year = "" + todayDate.getFullYear();
    var month = "" + (todayDate.getMonth() + 1);
    var day = "" + (todayDate.getDate() - 1);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    let date = `${year}-${month}-${day}`;

    console.log(`Using Date of ${date}`);

    var queryPart1 = "https://covid-api.com/api/reports?";
    var queryPart2 = "date=" + date;
    var queryPart3 = "&q=Australia";

    var queryURL = queryPart1 + queryPart2 + queryPart3;

    console.log(queryURL);

    var totalDeaths = 0;
    var totalRecovered = 0;

    axios
      .get(queryURL)
      .then((response) => {
        console.log(response.data);
        response.data.data.forEach((element) => {
          totalDeaths += element.deaths;
          totalRecovered += element.recovered;
        });
        console.log(
          `As of ${todayDate.toLocaleDateString()} there are Deaths:  ${totalDeaths}  Recovered: ${totalRecovered}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

