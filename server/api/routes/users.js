const router = require("express").Router();
const { User, Match, Team, Actions, Post, Comment } = require("../../db");
const LeagueRoles = require("../../db/models/LeagueRoles");
const TeamRoles = require("../../db/models/TeamRoles");

router.get("/", async (req, res, next) => {
   try {
      const user = await User.findAll({
         include: [LeagueRoles, TeamRoles, Actions, { model: Post, include: [Comment] }]
      });
      res.send(user);
   } catch (ex) {
      next(ex);
   }
});

router.get("/:id", async (req, res, next) => {
   try {
      const user = await User.findByPk(req.params.id, {
         include: [LeagueRoles, TeamRoles, { model: Post, include: [Comment] }]
      });
      res.send(user);
   } catch (err) {
      next(err);
   }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const player = await TeamRoles.create({name: 'player'});
    user.addTeamRole(player, {through: {teamId: 1}});
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
   try {
      const user = await User.findByPk(req.params.id);
      user.destroy();
      res.send(user);
   } catch (err) {
      next();
   }
});

router.put("/:id", async (req, res, next) => {
   try {
      const user = await User.findByPk(req.params.id);
      user.update(req.body);
      res.send(user);
   } catch (err) {
      next(err);
   }
});

module.exports = router;
