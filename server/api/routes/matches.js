const router = require("express").Router();
const { Match, Team, Scorekeeper } = require("../../db");
const { User } = require("../../db");
const Actions = require("../../db/models/Actions");

//get all matches
router.get("/", async (req, res, next) => {
  try {
    const matches = await Match.findAll({
        include: [
          { model: Team, attributes: ['id', 'name'], include: [
              {model: User, attributes: ['id', 'firstName', 'lastName']}
          ]}, 
          { model: Scorekeeper, attributes: ['id'],include: [
              {model: Actions, attributes: ['id', 'name', 'value']}, 
              {model: User, attributes: ['id', 'firstName', 'lastName']}, 
              {model: Team, attributes: ['id', 'name']}
          ]}],
      });
    res.send(matches);
  } catch (ex) {
    next(ex);
  }
});

//get match by id
router.get("/:id", async (req, res, next) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: [
        { model: Team, attributes: ['id', 'name'], include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']}
        ]}, 
        { model: Scorekeeper, attributes: ['id'],include: [
            {model: Actions, attributes: ['id', 'name', 'value']}, 
            {model: User, attributes: ['id', 'firstName', 'lastName']}, 
            {model: Team, attributes: ['id', 'name']}
        ]}],
    });
    res.send(match);
  } catch (ex) {
    next(ex);
  }
});

//create match
router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user) {
      const match = await Match.create(req.body.match);
      const team1 = await Team.findByPk(req.body.team1.id);
      const team2 = await Team.findByPk(req.body.team2.id);
      match.addTeam([team1, team2]);
      res.send(match);
    } else {
      res.status(401).send("Unauthorized Access");
    }
  } catch (ex) {
    next(ex);
  }
});

//delete match
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user) {
      await Match.destroy({ where: { id: req.params.id } });
      res.sendStatus(204);
    }
    res.status(401).send("Unauthorized Access");
  } catch (ex) {
    next(ex);
  }
});

//update match
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    if (user) {
      const match = await Match.findByPk(req.params.id);
      await match.update(req.body);
      res.send(match);
    }
    res.status(401).send("Unauthorized Access");
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
