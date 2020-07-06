const express = require("express");
const app = express();

require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 3001;
const server = app.listen(port, function () {
  console.log("GroceryGram API listening on port 3001!");
});

module.exports = server;
