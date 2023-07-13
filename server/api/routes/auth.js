const express = require("express");
const app = express.Router();
const { User } = require("../../db");

/* Google login routes */

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
      await user.update({
         username: req.body.username,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         avatar: req.body.avatar
      });

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

module.exports = app;
