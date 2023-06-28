const express = require("express");
const app = express.Router();
const { User } = require("../../db");

module.exports = app;

app.post("/", async (req, res, next) => {
   try {
      res.send(await User.authenticate(req.body));
   } catch (ex) {
      next(ex);
   }
});

app.get("/", async (req, res, next) => {
   try {
      res.send(await User.findByToken(req.headers.authorization));
   } catch (ex) {
      next(ex);
   }
});

app.put("/", async (req, res, next) => {
   try {
      const user = await User.findByToken(req.headers.authorization);
      await user.update({ avatar: req.body.avatar });
      res.send(user);
   } catch (ex) {
      next(ex);
   }
});

app.post("/register", async (req, res, next) => {
   try {
      res.send(await User.create(req.body));
   } catch (ex) {
      next(ex);
   }
});

app.put("/", async (req, res, next) => {
   try {
      const { username, password, email } = req.body;
      const user = await User.findByToken(req.headers.authorization);

      if (!user) {
         return res.status(401).json({ error: "User not found" });
      }

      if (username) {
         user.username = username;
      }
      if (password) {
         user.password = password;
      }
      if (email) {
         user.email = email;
      }

      await user.save();

      res.send(user);
   } catch (ex) {
      next(ex);
   }
});
