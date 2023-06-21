const router = require('express').Router();
const { User } = require('../../db/index.js');
const { League } = require('../../db/models/League.js');


// GET ALL LEAGUES
router.get('/', async (req, res, next) => {
    try {
        const league = await League.findAll();
        res.send(league);
    } catch(ex) {
        res.send('no data yet, next(ex) prompted')
        next(ex);
    }
})

// GET LEAGUES BY ID
router.get('/:id', async (req, res, next) => {

    try {
        const league = await League.findByPk(req.params.id);
        res.send(league);
    } catch(ex) {
        next(ex);
    }
})

// POST ALL LEAGUES
router.post('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (!user){
            return res.status(401).send('Unauthorized to add league');
        }
        const league = await League.create(req.body);
        res.status(201)
    } catch(ex) {
        next(ex);
    }
})

// UPDATE LEAGUE BASED ON ID
router.put('/:id', async (req, res, next) => {
    try {
        const league = await League.findByPk(req.params.id);
        await league.update(req.body);
    } catch(ex) {
        next(ex)
    }
})

// DELETE LEAGUE ON ID
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (!user) {
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
        const team = await League.findByPk(req.params.id);
        res.send(team);
    } catch(ex) {
        next(ex);
    }
})

module.exports = router;