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
         try {
            const defaultUser = {
               username:
                  `${profile.name.givenName.toLowerCase()}${profile.name.familyName.toLowerCase()}` || profile.email,
               password: `random-${Math.random()}`,
               firstName: profile.name.givenName || "",
               lastName: profile.name.familyName || "",
               email: profile.emails[0].value,
               googleId: profile.id,
               avatar: profile.pictures
            };
            console.log(profile);
            const [user, created] = await User.findOrCreate({
               where: { googleId: profile.id },
               defaults: defaultUser
            });
            if (created || user) {
               return cb(null, user);
            } else {
               return cb(null, false);
            }
         } catch (err) {
            console.log("Error signing up", err);
            return cb(err, null);
         }
      }
   )
);

passport.serializeUser((user, cb) => {
   cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
   const user = await User.findOne({ where: { id } }).catch((err) => {
      cb(err, null);
   });

   if (user) cb(null, user);
});

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
