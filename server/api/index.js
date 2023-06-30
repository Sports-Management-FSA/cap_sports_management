const express = require("express");
const router = express.Router();
const authRouter = require("./routes/auth.js");
const leaguesRouter = require("./routes/leagues.js");
const usersRouter = require("./routes/users.js");
const teamsRouter = require("./routes/teams.js");
const matchesRouter = require("./routes/matches.js");
const categoryRouter = require("./routes/category.js");

// Setting endpoints AFTER /api/
router.use("/auth", authRouter);
router.use("/leagues", leaguesRouter);
router.use("/users", usersRouter);
router.use("/teams", teamsRouter);
router.use("/matches", matchesRouter);
router.use("/categories", categoryRouter);

router.get("/", (req, res, next) => {
   res.send("at /api");
});

module.exports = router;
