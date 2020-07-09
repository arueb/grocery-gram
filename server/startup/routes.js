const express = require("express");
const users = require("../routes/users");
const recipes = require("../routes/recipes");
const auth = require("../routes/auth");
const headers = require("../middleware/headers");

module.exports = (app) => {
  app.use(headers);
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/recipes", recipes);
  app.use("/api/auth", auth);
};
