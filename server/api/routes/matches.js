const router = require('express').Router();
const { Match } = require('../../db/models/Match');
const { User } = require('../../db/models/User');

//get all matches
router.get('/', async (req, res, next) => {
    try {
        const matches = await Match.findAll();
        res.send(matches);
    } catch (ex) {
        next(ex);
    }
})

//get match by id
router.get('/:id', async (req, res, next) => {
    try {
        const match = await Match.findByPk(req.params.id);
        res.send(match);
    } catch (ex) {
        next(ex);
    }
})

//create match
router.post('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (user) {
            const match = await Match.create(req.body)
            res.send(match)
        }
        res.status(401).send('Unauthorizated Access')
    } catch (ex) {
        next(ex);
    }
})

//delete match
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (user) {
            await Product.destroy({ where: { id: req.params.id } });
            res.sendStatus(204);
        }
        res.status(401).send('Unauthorizated Access')
    } catch (ex) {
        next(ex);
    }
})

//update match
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);

        if (user) {
            const match = await Match.findByPk(req.params.id);
            await match.update(req.body);
            res.send(match);
        }
        res.status(401).send('Unauthorizated Access')
    } catch (ex) {
        next(ex);
    }
})

module.exports = router;