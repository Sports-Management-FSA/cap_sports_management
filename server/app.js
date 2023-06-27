const express = require("express");
const app = express();
const path = require("path");
const routes = require("./api");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const { access } = require("fs");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./db/models/User");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../static/index.html")));

app.use(
   cors({
      origin: "https://localhost:3000",
      credentials: true,
      allowedHeaders: ["set-cookie", "Content-type", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"]
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
         callbackURL: "http://localhost:3000/auth/google/callback",
         passReqToCallback: true
      },
      async (req, accessToken, refreshToken, profile, cb) => {
         const defaultUser = {
            username: `${profile.name.givenName.toLowerCase()}${profile.name.familyName.toLowerCase()}`,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id
         };

         const user = await User.findOrCreate({
            where: { googleId: profile.id },
            defaults: defaultUser
         }).catch((err) => {
            console.log("Error signing up", err);
            cb(err, null);
         });

         if (user && user[0]) return cb(null, user && user[0]);
      }
   )
);

passport.serializeUser((user, cb) => {
   console.log("Serializing user:", user);
   cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
   const user = await User.findOne({ where: { id } }).catch((err) => {
      console.log("Error deserializing", err);
      cb(err, null);
   });

   console.log("DeSerialized user", user);

   if (user) cb(null, user);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
   // Successful authentication, redirect home
   res.redirect("/");
});

// API configured at /api
app.use("/api", routes);

module.exports = app;
