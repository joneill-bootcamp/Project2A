// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting Burgers
  app.get("/api/covid", function (req, res) {
    var query = {};

    db.User.findAll({
      where: query
    }).then(function (dbGet) {
      res.json(dbGet);
    });
  });

};