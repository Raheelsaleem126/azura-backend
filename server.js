require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.route");
const session = require("express-session");
const passport = require("passport");
const discordStrategy = require("./middlewares/discordStrategy");
const path = require("path");
// const { PORT } = require("./config/db.config");
let PORT = process.env.PORT || 3002;
const app = express();
const Role = db.role;

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "sugar and spice",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    name: "discord.oauth2",
  })
);

app.set("view engine", "ejs");

// Setup of view folder
app.set("views", path.join(__dirname, "views"));

// Setup of public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());

db.mongoose
  .connect(`mongodb+srv://root:admin@cluster0.iqjcz.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
function initial() {
  return Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        return Promise.all([
          new Role({ name: "user" }).save(),
          new Role({ name: "moderator" }).save(),
          new Role({ name: "admin" }).save(),
        ]);
      }
    })
    .catch((error) => {
      throw error;
    });
}

initial()
  .then((savedRoles) => {
    if (savedRoles) {
      savedRoles.forEach((savedRole) => {
        console.log(`Added '${savedRole.name}' to roles collection`);
      });
    }
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Middleware  Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

// Home Route
app.get("/", isAuthenticated, (req, res) => {
  res.render("home", {
    users: [
      { name: "Muhammad Maaz Nizam", email: "maaznizam290@gmail.com" },
      { name: "Raheel Saleem", email: "raheelsaleem32@gmail.com" },
      { name: "Husnain Tahir", email: "husnaintahir129@gmail.com" },
      { name: "Shayan Satti", email: "shayan.satti3@gmail.com" },
      { name: "Muzammil zaidi", email: "muzammilhassan93@gmail.com" },
      { name: "Waqar zaka", email: "waqarzaka45@gmail.com" },
      { name: "Kamran Akmal", email: "kami.ash@gmail.com" },
    ],
  });
});

function isAuthenticated(req, res, next) {
  if (req.user) {
    console.log("User is logged in");
    res.render("/dashboard");
    next();
  } else {
    console.log("User is not logged in");
    next();
  }
}

// App  Listener
app.listen(PORT, () => {
  console.log(`The server is running on the http://localhost:${PORT}`);
});
