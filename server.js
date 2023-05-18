const express = require("express");
const cors = require("cors");
const db = require("./models");
const { PORT } = require("./config/db.config");
const app = express();
const Role = require("./models/role.model");
const authRoute = require("./routes/auth.routes");
const { default: mongoose } = require("mongoose");
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// allow the headers
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use(authRoute);

// db.mongoose
//   .connect(`mongodb+srv://root:admin@cluster0.iqjcz.mongodb.net/`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//   })
//   .catch((err) => {
//     console.error("Connection error", err);
//     process.exit();
//   });

const connects = mongoose
  .connect("mongodb+srv://root:admin@cluster0.iqjcz.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Successfully connect to MongoDB.", res);
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
console.log(connects);

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

app.get("/", (req, res) => {
  res.send("hellowod");
});
// require("./routes/auth.routes")(app);
// require("./routes/user.routes")(app);
app.listen(PORT, () => {
  console.log(`The server is running on the http://localhost:${PORT}`);
});
