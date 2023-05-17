const express = require("express");
const cors = require("cors");
const db = require("./models");
const { PORT } = require("./config/db.config");
const app = express();
const Role = db.role;

db.mongoose
  .connect(`mongodb+srv://root:admin@cluster0.zkcbtdo.mongodb.net/`, {
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
app.listen(PORT, () => {
  console.log(`The server is running on the https://localhost:${PORT}`);
});
