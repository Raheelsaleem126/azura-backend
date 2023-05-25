const mongoose = require("mongoose");

const DiscordUser = mongoose.model(
  "User",
  new mongoose.Schema({
    discordId: {
      type: String,
      required: true,
    },
    username: { type: String, required: true },
    guilds: { type: String, required: true },

    // --- Commented for now can be refactor and used in the future
    // email: String,
    // password: String,
    // roles: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Role",
    //   },
    // ],
  })
);

module.exports = DiscordUser;
