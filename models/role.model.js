const mongoose = require("mongoose");

// const Role = mongoose.model(
//   "Role",
//   new mongoose.Schema({
//     name: String,
//   })
// );

const Role = new mongoose.Schema({
  name: String,
});
const RoleModel = mongoose.model("Role", Role);
module.exports = RoleModel;
