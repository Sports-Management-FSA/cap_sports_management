const express = require("express");
const app = express();
const path = require("path");
const routes = require("./api");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");

require("./passport");

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
      resave: false,
      saveUninitialized: false
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

// Facebook Login Route
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));

app.get(
   "/auth/facebook/callback",
   passport.authenticate("facebook", { failureRedirect: "/login" }),
   async (req, res) => {
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
   }
);

// Twitter Login Route
app.get("/auth/twitter", passport.authenticate("twitter"));

app.get("/auth/twitter/callback", passport.authenticate("twitter", { failureRedirect: "/login" }), async (req, res) => {
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

// Error Handling
app.use((err, req, res, next) => {
   console.log(err);

   res.status(err.status || 500).send({ error: err, message: err.message });
});

// API configured at /api
app.use("/api", routes);

module.exports = app;
