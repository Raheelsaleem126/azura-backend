const express = require("express");
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const passport = require("passport");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/", passport.authenticate("discord"));

router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureMessage: "/forbidden",
    successRedirect: "/dashboard",
  })
);
//  Browser Cookie
// s%3AVWD-av6Xqk4EStglWTE28-3JEha2u2Dl.uwrcY%2Bn7MK%2FWYgMQ%2FJASQ0X02uW4gyASyUH6hLEH5TE
// s%3AIUDSLThpM6PhHHKADPC26uFlSv6_7MRz.v7FLgblGHiWQsXJBYfe5BWQ%2BDSJuDGwzgiv3ALzk1HM
module.exports = router;
