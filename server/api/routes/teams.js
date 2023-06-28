const router = require("express").Router();
const { Team, Match } = require("../../db");
const { User } = require("../../db");
const TeamRoles = require("../../db/models/TeamRoles");

// Get All Team
router.get("/", async (req, res, next) => {
   try {
      const teams = await Team.findAll({include:[{model:User, include:[TeamRoles]}, Match]});
      res.send(teams);
   } catch (ex) {
      next(ex);
   }
});

// Get One Team
router.get("/:id", async (req, res, next) => {
   try {
      const team = await Team.findByPk(req.params.id,{include:[{model:User, include:[TeamRoles]}, Match]});
      res.send(team);
   } catch (ex) {
      next(ex);
   }
});

// Create A Team
router.post("/", async (req, res, next) => {
   console.log(req.body)
   try {
      const user = await User.findByToken(req.headers.authorization);
      if (!user || !user.isDirector){
            return res.status(401).send('Unauthorized to add team');
        } 
      const team = await Team.create(req.body);
      res.send(team);
   } catch (ex) {
      next(ex);
   }
});

// Delete A Team
router.delete("/:id", async (req, res, next) => {
   try {
      const user = await User.findByToken(req.headers.authorization);
      if (!user || !user.isDirector){
            return res.status(401).send('Unauthorized to delete team');
        } 
      const team = await Team.findOne({
         where: {
            id: req.params.id,
            userId: user.id
         }
      });
      if (!team) {
         return res.status(404).send("Team not found");
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
      const user = await User.findByToken(req.headers.authorization);
      if (!user || !user.isDirector){
            return res.status(401).send('Unauthorized to update team');
        } 
      const team = await Team.findByPk(req.params.id);
      await team.update(req.body);
      return(team);
   } catch (ex) {
      next(ex);
   }
});

module.exports = router;
