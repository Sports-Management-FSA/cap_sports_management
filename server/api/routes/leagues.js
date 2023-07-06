const router = require('express').Router();
const { User, Team, Match } = require('../../db');
const { League } = require('../../db');
const LeagueRoles = require('../../db/models/LeagueRoles');
const TeamRoles = require('../../db/models/TeamRoles');


// GET ALL LEAGUES
router.get('/', async (req, res, next) => {
    try {
        const league = await League.findAll({include:[Team, {model:Match, include:[Team]}, {model:User, include:[LeagueRoles]}]});
        res.send(league);
    } catch(ex) {
        res.send('no data yet, next(ex) prompted')
        next(ex);
    }
})

// GET LEAGUES BY ID
router.get('/:id', async (req, res, next) => {
    try {
        const league = await League.findByPk(req.params.id, {include:[Team, {model:Match, include:[Team]}, {model:User, include:[LeagueRoles]}]});
        res.send(league);
    } catch(ex) {
        next(ex);
    }
})

// POST ALL LEAGUES
router.post('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization, {include:[LeagueRoles]});
        if (!user){
            return res.status(401).send('Login or Register');
        } 
        const director = user.leagueRoles.find(role=>role.name == 'director');
        const league = await League.create(req.body);
        if(!director){
            const leagueDirector = LeagueRoles.findOne({where: {name: 'director'}});
            await user.addLeagueRole(leagueDirector, {through: {leagueId: league.id}})
        }
        res.send(league);
    } catch(ex) {
        next(ex);
    }
})

// UPDATE LEAGUE BASED ON ID
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization, {include:[LeagueRoles]});
        
        if (!user){
            return res.status(401).send('Unauthorized to update league');
        } 
        const director = user.leagueRoles.find(role=>role.name == 'director');

        if( !director || director.user_leagueRoles.leagueId != req.params.id){
            return res.status(401).send('Unauthorized to update league');
        }
        const league = await League.findByPk(req.params.id);
        await league.update(req.body);
    } catch(ex) {
        next(ex)
    }
})

// DELETE LEAGUE ON ID
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization, {include:[LeagueRoles]});
        
        if (!user){
            return res.status(401).send('Unauthorized to delete league');
        }
        const director = user.leagueRoles.find(role=>role.name == 'director');

        if( !director || director.user_leagueRoles.leagueId != req.params.id){
            return res.status(401).send('Unauthorized to delete league');
        }
        await League.destroy({where: { id: req.params.id}});
        res.sendStatus(204);
    } catch(ex){
        next(ex);
    }
})

// GET TEAMS BY LEAGUE ID
router.get('/:id/teams', async (req, res, next) => {
    try {
        const leagueId = req.params.id;
        const teams = await Team.findAll({where: {leagueId}})
        res.send(teams);
    } catch(ex) {
        next(ex);
    }
})


module.exports = router;