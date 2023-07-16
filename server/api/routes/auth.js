const express = require("express");
const app = express.Router();
const { User } = require("../../db");
const bcrypt = require("bcrypt");

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

app.put("/password", async (req, res, next) => {
   try {
      const user = await User.findByToken(req.headers.authorization);
      const { currentPassword, newPassword } = req.body;

      // Compare the current password with the one stored in the database
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
         return res.status(400).send({ message: "Current password is incorrect" });
      }

      // Update the user's password
      await user.update({ password: newPassword });

      res.send({ message: "Password updated successfully" });
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
