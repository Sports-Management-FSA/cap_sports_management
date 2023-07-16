
const router = require('express').Router();
const { User, Team, Match, Post, Comment, User_TeamRoles, User_LeagueRoles } = require('../../db');
const { League, Announcements, Messages, Requests } = require('../../db');
const LeagueRoles = require('../../db/models/LeagueRoles');
const TeamRoles = require('../../db/models/TeamRoles');

// GET ALL LEAGUES
router.get("/", async (req, res, next) => {
  try {
    const league = await League.findAll({
      include: [
        Announcements, Messages, Requests,
        { model: Team, include: [
          {model: User_TeamRoles, include: [
            {model: User, attributes: ['firstName', 'lastName']}, 
            {model: TeamRoles, attributes: ['name']}
          ]}
        ]}, 
        { model: Post, include: [Comment] },
        { model: Match, include: [Team] },
        { model: User_LeagueRoles, include: [
            {model: User, attributes: ['firstName', 'lastName']}, 
            {model: LeagueRoles, attributes: ['name']}
          ]}
        ]},
    );
    res.send(league);
  } catch (ex) {
    res.send("no data yet, next(ex) prompted");
    next(ex);
  }
});


// GET LEAGUES BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const league = await League.findByPk(req.params.id, {
      include: [
        Announcements, Messages, Requests,
        { model: Team, include: [
          {model: User_TeamRoles, include: [
            {model: User, attributes: ['firstName', 'lastName']}, 
            {model: TeamRoles, attributes: ['name']}
          ]}
        ]}, 
        { model: Post, include: [Comment] },
        { model: Match, include: [Team] },
        { model: User_LeagueRoles, include: [
            {model: User, attributes: ['firstName', 'lastName']}, 
            {model: LeagueRoles, attributes: ['name']}
          ]}
        ]},
    );
    res.send(league);
  } catch (ex) {
    next(ex);
  }
});

// POST ALL LEAGUES
router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization, {
      include: [LeagueRoles],
    });
    if (!user) {
      return res.status(401).send("Login or Register");
    }
    const director = user.leagueRoles.find((role) => role.name == "director");
    const league = await League.create(req.body);
    if (!director) {
      const leagueDirector = LeagueRoles.findOne({
        where: { name: "director" },
      });
      await user.addLeagueRole(leagueDirector, {
        through: { leagueId: league.id },
      });
    }
    res.send(league);
  } catch (ex) {
    next(ex);
  }
});

// UPDATE LEAGUE BASED ON ID
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization, {
      include: { model: User_LeagueRoles, include: [League]},
   });

    if (!user) {
      return res.status(401).send("Unauthorized to update league, not a user");
    }

    const director = user.user_leagueRoles.find((role) => role.leagueRole.name == "director" && role.leagueId == req.params.id);
    if (!director) {
      return res.status(401).send("Unauthorized to update league, not a director for league");
    }
    const league = await League.findByPk(req.params.id);
    await league.update(req.body);
  } catch (ex) {
    next(ex);
  }
});

// DELETE LEAGUE ON ID
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization, {
      include: [LeagueRoles],
    });

    if (!user) {
      return res.status(401).send("Unauthorized to delete league");
    }
    const director = user.leagueRoles.find((role) => role.name == "director");

    if (!director || director.user_leagueRoles.leagueId != req.params.id) {
      return res.status(401).send("Unauthorized to delete league");
    }
    await League.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

// GET TEAMS BY LEAGUE ID
router.get("/:id/teams", async (req, res, next) => {
  try {
    const leagueId = req.params.id;
    const teams = await Team.findAll({ where: { leagueId } });
    res.send(teams);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
