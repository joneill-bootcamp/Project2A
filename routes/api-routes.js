// Requiring our models
var db = require("../models");
const axios = require('axios');
const moment = require('moment');

// Functions 
// Call Covid API taking user Input
function callAPI(query_region) {

  // Set up localvars
  var returnData = {};
  const todayDate = new Date();

  var year = '' + todayDate.getFullYear();
  var month = '' + (todayDate.getMonth() + 1);
  var day = '' + (todayDate.getDate() - 1);

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  let date = `${year}-${month}-${day}`;

  console.log(`Using Date of ${date}`);

  var queryPart1 = "https://covid-api.com/api/reports?";
  var queryPart2 = "date=" + date;
  var queryPart3 = "&q=" + query_region;

  var queryURL = queryPart1 + queryPart2 + queryPart3;

  console.log(queryURL);

  var totalDeaths = 0;
  var totalRecovered = 0;

  axios.get(queryURL)
    .then(response => {
      console.log(response.data);
      response.data.data.forEach(element => {
        totalDeaths += element.deaths;
        totalRecovered += element.recovered;
      });
      console.log(`As of ${todayDate.toLocaleDateString()} there are Deaths:  ${totalDeaths}  Recovered: ${totalRecovered}`);
    })
}

// Routes
module.exports = function (app) {

  // GET route XXXXXXXX
  app.get("/api/covid", function (req, res) {
    var query = {};

    db.User.findAll({
      where: query
    }).then(function (dbGet) {
      res.json(dbGet);
    });
  });

  // GET route data for a week
  app.post("/api/getdata", function (req, res) {
    console.log('####' + req.body)

    res.json({
      data: true // todo: replace with the data that we need for the ui
    })
  });

};