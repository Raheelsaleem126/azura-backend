const DiscordStrategy = require('passport-discord').Strategy;

const passport =require("passport")

passport.use(new DiscordStrategy({
    clientID:process.env.APP_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:process.env.APP_REDIRECT,
    scope:["identify","guilds"]
},(accessToken,refreshToken,profile,done)=>{
console.log(accessToken,refreshToken,profile,"DATA")
}))