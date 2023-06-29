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
const Sequelize = require("sequelize");

require("./google-auth");

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

// Google Login Route
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), async (req, res) => {
   try {
      // Successful authentication, generate a token
      const token = req.user.generateToken();

      // Redirect or respond with the token
      res.send(`
            <html>
               <body>
                  <script>
                     window.localStorage.setItem('token', '${token}');
                     window.location = '/';
                  </script>
               </body>
            </html>
         `);
   } catch (err) {
      console.log("Error generating token", err);
      res.status(500).send("Internal Server Error");
   }
});

// API configured at /api
app.use("/api", routes);

module.exports = app;
