const router = require('express').Router();
const { Player } = require('../../db/models/Player.js');

router.get('/', async (req, res, next) => {
    try {
        const players = await Player.findAll()
        res.send(players)
    } catch(ex) {
        next(ex);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const player = await Player.findByPk(req.params.id)
        res.send(player);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const player = await Player.create(req.body)
        res.send(player);
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const player = await Player.findByPk(req.params.id);
        player.destroy();
        res.send(player);
    } catch (err) {
        next();
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const player = await Player.findByPk(req.params.id)
        player.update(req.body)
        res.send(player);
    } catch (err) {
        next(err);
    }
})

module.exports = router;