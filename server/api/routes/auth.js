const express = require("express");
const app = express.Router();
const { User } = require("../../db");
const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");
const Token = require("../../db/models/Token");

// Configure Nodemailer transporter
const transporter = nodeMailer.createTransport({
   service: "gmail",
   auth: {
      user: "chihtengma416@gmail.com",
      pass: "gjbtvgzpauifidqk"
   }
});

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

// Route to handle password reset request
app.post("/reset-password", async (req, res) => {
   const { email } = req.body;

   try {
      console.log("Email received:", email);
      // Find the user by email
      const user = await User.findOne({ where: { email } });

      if (!user) {
         return res.status(404).json({ error: "User not found" });
      }

      // Generate and store a reset token
      const token = crypto.randomBytes(32).toString("hex");
      await Token.create({ userId: user.id, token });

      // Send password link to the user
      const resetLink = `http://localhost:3000/reset-password/token=${token}&id=${user.id}`;

      const mailOptions = {
         from: "podium-sports-mgmt@gmail.com",
         to: user.email,
         subject: "Password Reset Request",
         html: `<p>Hi ${user.firstName},</p><p>You have requested to reset your password. Please click the link below to proceed:</p><a href="${resetLink}">Reset Password</a>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
            console.log("Error sending email: ", error);
            return res.status(500).json({ error: "Error sending email" });
         }
         console.log("Email sent: ", info.response);
         res.json({ message: "Password reset link sent successfully" });
      });
   } catch (error) {
      console.log("Unhandled promise rejection: ", error);
      res.status(500).json({ error: "An error occurred" });
   }
});

// Route to handle password reset
app.post("/reset-password/:token", async (req, res) => {
   const { userId, token, password } = req.body;
   console.log("User Id: ", userId);
   console.log("Token: ", token);
   console.log("Password: ", password);

   // Find the token in the database
   const tokenEntry = await Token.findOne({ where: { userId } });
   if (!tokenEntry) {
      return res.status(404).json({ error: "User not exist" });
   }

   console.log("Token in DB: ", tokenEntry.token);

   const isValid = await bcrypt.compare(token, tokenEntry.token);

   if (!isValid) {
      return res.status(404).json({ error: "Invalid token" });
   }

   // Check if the token has expired
   if (isValid.expireAt < new Date()) {
      return res.status(401).json({ error: "Token has expired" });
   }

   // Update the user's passwordz`
   const hashedPassword = await bcrypt.hash(password, 10);
   await User.update({ password: hashedPassword }, { where: { id: tokenEntry.id } });

   // Delete the used token
   await tokenEntry.destroy();

   res.json({ message: "Password reset successfully" });
});

app.post("/reset-password/:token", async (req, res) => {
   const { userId, token, password } = req.body;
   console.log("User Id: ", userId);
   console.log("Token: ", token);
   console.log("Password: ", password);

   // Find the token in the database
   const tokenEntry = await Token.findOne({ where: { userId } });
   if (!tokenEntry) {
      return res.status(404).json({ error: "Invalid token" });
   }

   // Update the user's password
   const hashedPassword = await bcrypt.hash(password, 10);
   await User.update({ password: hashedPassword }, { where: { id: userId } });

   // Delete the used token
   await tokenEntry.destroy();

   res.json({ message: "Password reset successfully" });
});
module.exports = app;
