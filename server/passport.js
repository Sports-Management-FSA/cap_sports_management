const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("./db/models/User");
require("dotenv").config();

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: "https://podium.onrender.com/auth/google/callback",
         passReqToCallback: true
      },
      async (req, accessToken, refreshToken, profile, cb) => {
         try {
            let user = await User.findOne({ where: { email: profile.emails[0].value } });

            if (!user) {
               // If no user exists with the email, create a new account
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

               const [newUser] = await User.findOrCreate({
                  where: { googleId: profile.id },
                  defaults: defaultUser
               });

               user = newUser;
            } else {
               // Associate the Google ID with the existing account
               user.googleId = profile.id;
               await user.save();
            }

            return cb(null, user);
         } catch (err) {
            console.log("Error signing up", err);
            return cb(err, null);
         }
      }
   )
);

passport.use(
   new FacebookStrategy(
      {
         clientID: process.env.FACEBOOK_APP_ID,
         clientSecret: process.env.FACEBOOK_APP_SECRET,
         callbackURL: "/auth/facebook/callback",
         passReqToCallback: true,
         profileFields: ["id", "displayName", "photos", "email"]
      },
      async function (req, accessToken, refreshToken, profile, cb) {
         try {
            let user = await User.findOne({ where: { email: profile.emails[0].value } });

            if (!user) {
               // If no user exists with the email, create a new account
               const defaultUser = {
                  username: profile.displayName.replace(/ /g, "").toLowerCase(),
                  password: `random-${Math.random()}`,
                  firstName: profile.name.givenName || profile.displayName.split(" ")[0],
                  lastName: profile.name.familyName || profile.displayName.split(" ")[1],
                  email: profile.emails[0].value,
                  facebookId: profile.id,
                  avatar: profile.photos[0].value
               };

               const [newUser] = await User.findOrCreate({
                  where: { facebookId: profile.id },
                  defaults: defaultUser
               });

               user = newUser;
            } else {
               // Associate the Facebook ID with the existing account
               user.facebookId = profile.id;
               await user.save();
            }

            return cb(null, user);
         } catch (err) {
            console.log("Error signing up", err);
            return cb(err, null);
         }
      }
   )
);

passport.use(
   new TwitterStrategy(
      {
         consumerKey: process.env.TWITTER_CONSUMER_KEY,
         consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
         callbackURL: "/auth/twitter/callback",
         includeEmail: true
      },
      async function (token, tokenSecret, refreshToken, profile, cb) {
         try {
            console.log("Twitter Profile:", profile);
            let user = await User.findOne({ where: { email: profile.emails[0].value } });

            if (!user) {
               // If no user exists with the email, create a new account
               const defaultUser = {
                  username: profile.displayName.replace(/ /g, "").toLowerCase(),
                  password: `random-${Math.random()}`,
                  firstName: profile.displayName.split(" ")[0],
                  lastName: profile.displayName.split(" ")[1],
                  email: profile.emails[0].value,
                  twitterId: profile.id,
                  avatar: profile.photos[0].value
               };

               const [newUser] = await User.findOrCreate({
                  where: { twitterId: profile.id },
                  defaults: defaultUser
               });

               user = newUser;
            } else {
               // Associate the Twitter ID with the existing account
               user.twitterId = profile.id;
               await user.save();
            }

            return cb(null, user); // Pass the user object to serialize
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
   try {
      const user = await User.findOne({ where: { id } });
      if (user) {
         cb(null, user);
      } else {
         cb(null, false);
      }
   } catch (err) {
      cb(err, null);
   }
});
