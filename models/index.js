const mongoose = require("mongoose");
const user = require("../models/user.model");
const role = require("../models/role.model");

mongoose.Promise = global.Promise;

const db = {
  mongoose,
  user,
  role,
  ROLES: ["user", "admin", "moderator"],
};

module.export = db;
