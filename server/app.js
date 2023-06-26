const express = require("express");
const app = express();
const path = require("path");
const routes = require("./api");
// const session = require("express-session");
// const cors = require("cors");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// require("dotenv").config();

// Middleware
app.use(express.json());
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../static/index.html")));


// API configured at /api
app.use("/api", routes);

module.exports = app;
