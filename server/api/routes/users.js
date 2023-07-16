const router = require("express").Router();
const { User, Match, Team, Actions, Post, 
        Comment, User_TeamRoles, LeagueRoles, 
        League, User_LeagueRoles, Scorekeeper, 
        TeamRoles, Requests } = require("../../db");

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findAll({
      include: [ 
        {model: Requests, as: 'receivedRequests'},
        {model: User_LeagueRoles, include: [League, LeagueRoles]},
        {model: User_TeamRoles, include: [Team, TeamRoles]},
        {model: Scorekeeper, include: [Actions, Team, Match]},
        { model: Post, include: [Comment] },
      ],
    });
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [ 
        {model: Requests, as: 'receivedRequests'},
        {model: User_LeagueRoles, include: [League, LeagueRoles]},
        {model: User_TeamRoles, include: [Team, TeamRoles]},
        {model: Scorekeeper, include: [Actions, Team, Match]},
        { model: Post, include: [Comment] },
      ],
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
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
  console.log("FROM API", req.body)
  try {
    const user = await User.findByPk(req.params.id);
    if(req.body.role){
      const {role} = req.body;
      if(role.teamRoleId){
        User_TeamRoles.create({userId: user.id, teamId: role.teamId, teamRoleId: role.roleId});
      } else {
        User_LeagueRoles.create({userId: user.id, teamId: role.teamId, teamRoleId: role.roleId})
      }
    } else {
      user.update(req.body);
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
