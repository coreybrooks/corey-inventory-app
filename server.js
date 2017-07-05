const express = require('express');
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require('mongoose')
const app = express();
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var db = require("./models");

//const posts = require('./routes/api-routes');

const PORT = process.env.PORT || 3000;

//use morgan and body-parser with our app
app.use(logger("dev"));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Creating express app and configuring middleware needed for authentication
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

//app.use('/posts', posts);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});



