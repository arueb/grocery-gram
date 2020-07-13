const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

require("./startup/db")();
require("./startup/routes")(app);

app.use(express.static('./public'))

const port = process.env.PORT || 3001;
const server = app.listen(port, function () {
  console.log("GroceryGram API listening on port 3001!");
});

module.exports = server;
