// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var sequelize = require('sequelize');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", function(req, res) {
    console.log(`/api/login post request working in api-routes`);
    console.log(`req.body: ${JSON.stringify(req.body)}`);
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(result) {
      console.log(`result in then promise: ${JSON.stringify(result)}`)
      if (result === null || req.body.password !== result.password) {
        console.log('no match');
        res.json("noMatch");
      }
      else {
        console.log('match');
        res.json(result);
      }
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log("api/signup post function is working in api-routes");
    console.log(req.body);
    db.User.create(req.body).then(function(User) {
      res.json(User);
    }).catch(function(err) {
      res.json(err);
    });
  });

  //route for creating new inventory area
  app.post("/api/area", function(req, res) {
    console.log("api/area post route is working in api-routes");
    console.log(req.body);
    db.Area.create(req.body).then(function(Area) {
      res.json(Area);
    }).catch(function(err) {
      res.json(err);
    });
  });

  //route for retrieving inventory areas per company
  app.get("/api/area/:companyName", function(req, res) {
    console.log("api/area/:companyName get route is working in api-routes");
    console.log(req.params.companyName);
    db.Area.findAll({
      where: {companyName: req.params.companyName}}).then(function(Area) {
      res.json(Area);
    }).catch(function(err) {
      res.json(err);
    });
  });

    //route for retrieving inventory area colors per company
  app.get("/api/areaColor/:companyName/:area", function(req, res) {
    console.log("api/areaColor/:companyName/:area get route is working in api-routes");
    console.log(`api/areaColor req.params.area: ${JSON.stringify(req.params.area)}`);
    db.Area.findAll({
      where: {
         companyName: req.params.companyName,
         area: req.params.area               
         }}).then(function(Area) {
      console.log(`api/areaColor/:companyName/:area: ${JSON.stringify(Area)}`);
          var color = Area[0].color;
          res.json(color);
    }).catch(function(err) {
      res.json(err);
    });
  });

  //route for retrieving inventory per date per company
  app.get("/api/table/:companyName/:date", function(req, res) {
    console.log("api/table/:companyName/:date get route is working in api-routes");
    console.log(`api/table/:companyName/:date: ${JSON.stringify(req.params.date)}`);
    db.Inventory.findAll({
      where: {
         companyName: req.params.companyName,
         date: req.params.date               
        },
       order: [[sequelize.col('item'), 'ASC']]
      }).then(function(Inventory) {
      console.log(`api/table/:companyName/:date: ${JSON.stringify(Inventory)}`);
          res.json(Inventory);
    }).catch(function(err) {
      res.json(err);
    });
  });




  //route for creating new item
  app.post("/api/item", function(req, res) {
    console.log("api/item post route is working in api-routes");
    console.log(req.body);
    db.Item.create(req.body).then(function(Item) {
      res.json(Item);
    }).catch(function(err) {
      res.json(err);
    });
  });

  //route for retrieving items areas per company
  app.get("/api/items/:companyName", function(req, res) {
    console.log("api/items/:companyName get route is working in api-routes");
    console.log(req.params.companyName);
    db.Item.findAll({
      where: {companyName: req.params.companyName},
      order: [[sequelize.col('item'), 'ASC']]
    }).then(function(Item) {
      res.json(Item);
    }).catch(function(err) {
      res.json(err);
    });
  });

  //route for creating inventory
  app.post("/api/inventory", function(req, res) {
    console.log("api/inventory post route is working in api-routes");
    console.log(req.body);
    db.Inventory.create(req.body).then(function(Inventory) {
      res.json(Inventory);
    }).catch(function(err) {
      res.json(err);
    });
  });

  //route for deleting an item
  app.delete(`/api/items/:companyName/:itemId`, function(req, res) {
    console.log("/api/items/:companyName/itemId delete route is working in api-routes");
    console.log(req.params.companyName);
    db.Item.destroy({
      where: {
        companyName: req.params.companyName,
        id: req.params.itemId
      }      
    }).then(function(Item) {
      res.json(Item);
    }).catch(function(err) {
      res.json(err);
    });
  });

  app.delete(`/api/deleteArea/:companyName/:id`, function(req, res) {
    console.log("/api/deleteArea/:id delete route is working in api-routes");
    console.log(req.params.id);
    db.Area.destroy({
      where: {
        companyName: req.params.companyName,
        id: req.params.id
      }      
    }).then(function(Area) {
      res.json(Area);
    }).catch(function(err) {
      res.json(err);
    });
  });


  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

/*
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });  */

};
