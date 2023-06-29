const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./db/models/User");

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
