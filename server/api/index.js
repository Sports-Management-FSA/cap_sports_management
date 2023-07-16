const express = require("express");
const router = express.Router();
const authRouter = require("./routes/auth.js");
const leaguesRouter = require("./routes/leagues.js");
const usersRouter = require("./routes/users.js");
const teamsRouter = require("./routes/teams.js");
const matchesRouter = require("./routes/matches.js");
const categoryRouter = require("./routes/category.js");
const postRouter = require("./routes/post.js");
const announcementsRouter = require("./routes/announcements");
const messagesRouter = require("./routes/messages");
const actionRouter = require("./routes/action.js");
const scorekeepeRouter = require('./routes/scorekeeper.js');
const requestsRouter = require('./routes/requests.js');

// Setting endpoints AFTER /api/
router.use("/auth", authRouter);
router.use("/leagues", leaguesRouter);
router.use("/users", usersRouter);
router.use("/teams", teamsRouter);
router.use("/matches", matchesRouter);
router.use("/categories", categoryRouter);
router.use("/posts", postRouter);
router.use("/announcements", announcementsRouter);
router.use("/messages", messagesRouter);
router.use("/actions", actionRouter);
router.use('/scorekeepers', scorekeepeRouter);
router.use('/requests', requestsRouter);

router.get("/", (req, res, next) => {
   res.send("at /api");
});

module.exports = router;
