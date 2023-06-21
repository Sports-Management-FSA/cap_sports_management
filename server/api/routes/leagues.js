const router = require('express').Router();
const { League } = require('../../db/models/League.js');


// GET ALL LEAGUES
router.get('/', async (req, res, next) => {
    try {
        const league = await League.findAll();
        res.send(league);
    } catch(ex) {
        res.send('no data yet, next(ex) prompted')
        // next(ex);
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

// GET PLAYERS/USERS BY LEAGUE ID
router.get('/:id/players', async (req, res, next) => {
    try {
        const players = await League.findByPk(req.params.id);
        res.send(players);
    } catch(ex) {
        next(ex);
    }
})

// POST TO ALL LEAGUES
router.post('/', async (req, res, next) => {
    try {
        res.status(201).send(await League.create(req.body));
    } catch(ex) {
        next(ex);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const league = await League.findByPk(req.params.id);
        await league.update(req.body);
    } catch(ex) {
        next(ex)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await League.destroy({where: { id: req.params.id}});
        res.sendStatus(204);
    } catch(ex){
        next(ex);
    }
})

module.exports = router;