const express = require("express");
const app = express();
const path = require("path");
const routes = require("./api");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

// Middleware
app.use(express.json());
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../static/index.html")));

app.use(
   cors({
      origin: "https://localhost:3000",
      credentials: true
   })
);

app.use(
   session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true
   })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: "http://www.example.com/auth/google/callback"
      },
      function (accessToken, refreshToken, profile, cb) {
         // Called On Sucessful Authentication
         // Insert Into Database
         console.log(profile);
         cb(null, profile);
      }
   )
);

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
   // Successful authentication, redirect home
   res.redirect("/");
});

// API configured at /api
app.use("/api", routes);

module.exports = app;
