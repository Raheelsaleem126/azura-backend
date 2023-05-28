const DiscordStrategy = require("passport-discord").Strategy;

const passport = require("passport");
const DiscordUser = require("../models/user.model");

passport.serializeUser((user, done) => {
  console.log("Serialize");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserialize");
  const user = await DiscordUser.findById(id);
  if (user) {
    done(null, user);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.APP_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.APP_REDIRECT,
      scope: ["identify", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existing_user = await DiscordUser.findOne({
          discordId: profile.id,
        });
        if (existing_user) {
          done(null, existing_user);
          console.log("This is the existing user", "==>", existing_user);
        } else {
          console.log("This the new user");
          const newUser = await DiscordUser.create({
            discordId: profile.id,
            username: profile.username,
            guilds: profile.guilds,
          });
          const savedUser = await newUser.save();
          done(null, savedUser);
          console.log(newUser);
        }
      } catch (error) {
        res.status(422).send({ msg: "There is an error", error });
        done(error, null);
      }
    }
  )
);
