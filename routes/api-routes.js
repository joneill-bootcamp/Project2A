// Requiring our models
const db = require("../models");
const passport = require("../config/passport");
const buildObject = require("../utils/buildObject");

// Return date string in mm/dd/y format
function formatAUDate(d) {
  function z(n) {
    return (n < 10 ? "0" : "") + +n;
  }
  //return z(d.getMonth() + 1) + '/' + z(d.getDate()) + '/' + d.getFullYear();
  return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate());
}

function last7Days(d) {
  (d = +(d || new Date())), (days = []), (i = 7);
  while (i--) {
    days.push(formatAUDate(new Date((d -= 8.64e7))));
  }
  return days;
}

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
  app.post("/api/signup", async function (req, res) {
    db.User.create({
        username: req.body.username,
        password: req.body.password,
      })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        if (err.parent.errno === 1062) {
          res.status(401).send("Signup failed, Username in use");
        } else {
          res.status(401).send("Signup Failed please try again");
        }
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

  // GET route data for a week
  app.post("/api/getdata", async function (req, res) {
    const responseObject = await buildObject(
      req.body.country,
      req.body.dataChoice
    );
    res.json(responseObject);
  });

  //PUT route for user
  app.put("/api/user/:userid", async function (req, res) {
    db.User.update({
      country: req.body.country,
      dataChoice: req.body.dataChoice,
      graphChoice: req.body.graphChoice
    }, {
      where: {
        id: req.params.userid
      }
    }).then(function (rowsUpdated) {
      console.log(rowsUpdated);
      res.json(rowsUpdated)

    }).catch(function (error) {
      console.log(error);
    });
  });
};