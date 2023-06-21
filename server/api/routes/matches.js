const router = require('express').Router();
const { Match } = require('../../db/models/Match');
const { User } = require('../../db/models/User');

router.get('/', async (req, res, next) => {
    try {
        const matches = await Match.findAll();
        res.send(matches);
    } catch(ex) {
        next(ex);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const match = await Match.findByPk(req.params.id);
        res.send(match);
    } catch(ex) {
        next(ex);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        
    } catch(ex) {
        next(ex);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Product.destroy({where:{id: req.params.id}});
        res.sendStatus(204);
    } catch(ex) {
        next(ex);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const match = await Match.findByPk(req.params.id);
        await match.update(req.body);
        res.send(match);
    } catch(ex) {
        next(ex);
    }
})

module.exports = router;