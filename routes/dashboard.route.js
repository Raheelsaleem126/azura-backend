const express = require("express");
const dashboardRouter = express.Router();

function isAuthenticated(req, res, next) {
  if (req.user) {
    console.log("User is logged in");
    console.log(req.user);
    next();
  } else {
    console.log("User is not logged in");
    res.redirect("/");
  }
}

dashboardRouter.get("/", isAuthenticated, (req, res) => {
  res.send(200);
});

dashboardRouter.get("/settings", isAuthenticated, (req, res) => {
  res.send(200);
});

module.exports = dashboardRouter;
