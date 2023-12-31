const router = require("express").Router();
const {
  User,
  Team,
  Match,
  League,
  LeagueRoles,
  TeamRoles,
  Post,
  Comment,
  Actions,
  Scorekeeper,
  User_TeamRoles,
  User_LeagueRoles,
  Requests,
} = require("../../db");

// Get All Team
router.get("/", async (req, res, next) => {
  try {
    const teams = await Team.findAll({
      include: [ Requests,
         { model: User_TeamRoles, include: [
            TeamRoles,
            { model: User, attributes: ['firstName', 'lastName'], include:[
               Match,
               {model: Scorekeeper, include:[Actions]}
            ]} 
         ]},
         { model: Match, include: [
            Team,
            { model: Scorekeeper, include: [ 
               Actions,
               {model: User, attributes: ['firstName', 'lastName']} 
            ]}
         ]},
         { model: Post, include: [Comment] },
      ],
    });
    res.send(teams);
  } catch (ex) {
    next(ex);
  }
});

// Get One Team
router.get("/:id", async (req, res, next) => {
   try {
      const team = await Team.findByPk(req.params.id, {
         include: [
            { model: User_TeamRoles, include: [
               TeamRoles,
               { model: User, attributes: ['firstName', 'lastName']} 
            ]},
            { model: Match, include: [
               { model: Scorekeeper, include: [ 
                  Actions, 
                  {model: User, attributes: ['firstName', 'lastName']} 
               ]}
            ]},
            { model: Post, include: [Comment] },
         ],
       });
      res.send(team);
   } catch (ex) {
      next(ex);
   }
});

// Create A Team
router.post("/", async (req, res, next) => {
   try {
      const user = await User.findByToken(req.headers.authorization, {
         include: [LeagueRoles]
      });
      
      if (!user) {
         return res.status(401).send("Unauthorized to create team");
      }
      console.log(req.body)
      const director = user.leagueRoles.find((role) => role.name == "director");
      
      // if (!director || director.user_leagueRoles.leagueId !== req.body.leagueId) {
      //    return res.status(401).send("Unauthorized to create team");
      // }
    console.log("FROM TEAM API", req.body);
    const team = await Team.create(req.body);
    res.send(team);
  } catch (ex) {
    next(ex);
  }
});

// Delete A Team
router.delete("/:id", async (req, res, next) => {
   try {
      const user = await User.findByToken(req.headers.authorization, {
         include: [LeagueRoles]
      });
      if (!user) {
         return res.status(401).send("Unauthorized to delete team");
      }
      const director = user.leagueRoles.find((role) => role.name == "director");
      const team = await Team.findByPk(req.params.id);
      if (!director || director.user_leagueRoles.leagueId != team.leagueId) {
         return res.status(401).send("Unauthorized to delete team");
      }
      await team.destroy();
      res.send("Team deleted successfully");
   } catch (ex) {
      next(ex);
   }
});

// Update Team based on ID
router.put("/:id", async (req, res, next) => {
   try {
      const user = await User.findByToken(req.headers.authorization, {
         include: { model: User_LeagueRoles, include: [League]},
      });

      if (!user) {
         return res.status(401).send("Unauthorized to update team, not a user");
      }
  
      const team = await Team.findByPk(req.params.id);
   
      const director = user.user_leagueRoles.find((role) => role.leagueRole.name == "director" && role.leagueId == req.body.leagueId);
   
      if (!director) {
         return res.status(401).send("Unauthorized to update team, not a director for the league");
      }
     
      await team.update(req.body);
      return team;
   } catch (ex) {
      next(ex);
   }
});

module.exports = router;
