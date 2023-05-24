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

router.get(
  "/",passport.authenticate("discord")
);

router.get(
  "/redirect",passport.authenticate("discord",{
    failureMessage:"/forbidden"
  }),controller.authenticate
);


module.exports = router;
