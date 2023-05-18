const mongoose = require("mongoose");

// const User = mongoose.model(
//   "User",
//   new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//     roles: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Role",
//       },
//     ],
//   })
// );

// module.exports = User;

const User = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model("User", User);
module.exports = userModel;
