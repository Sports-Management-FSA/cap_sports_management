const router = require('express').Router();
const { User, Team, Actions, Scorekeeper, Match} = require('../../db');

//get all scorekeepers
router.get('/', async (req, res, next) => {
    try {
        const scorekeeper = await Scorekeeper.findAll(
            { model: Scorekeeper, attributes: ['id'],include: [
                { model: Actions, attributes: ['id', 'name', 'value'] }, 
                { model: User, attributes: ['id', 'firstName', 'lastName'] }, 
                { model: Team, attributes: ['id', 'name'] },
                Match
        ]});
        res.send(scorekeeper);
    } catch (ex) {
        next(ex);
    }
})

//get scorekeepers by match
router.get('/:id', async (req, res, next) => {
    try {
        const scorekeeper = await Scorekeeper.findByPk(req.params.id,  
            { model: Scorekeeper, attributes: ['id'],include: [
                { model: Actions, attributes: ['id', 'name', 'value'] }, 
                { model: User, attributes: ['id', 'firstName', 'lastName'] }, 
                { model: Team, attributes: ['id', 'name'] }
            ]});
        res.send(scorekeeper);
    } catch (ex) {
        next(ex);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (user) {
            //req.body should include: matchId, userId, actionId, teamId
            const scorekeeper = await Scorekeeper.create(req.body)
            res.send(scorekeeper)
        }
        res.status(401).send('Unauthorizated Access')
    } catch (ex) {
        next(ex);
    }
})

//delete scorekeeper
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (user) {
            await Scorekeeper.destroy({ where: { id: req.params.id } });
            res.sendStatus(204);
        }
        res.status(401).send('Unauthorizated Access')
    } catch (ex) {
        next(ex);
    }
})

//update scorekeeper
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);

        if (user) {
            const scorekeeper = await Scorekeeper.findByPk(req.params.id);
            await scorekeeper.update(req.body);
            res.send(scorekeeper);
        }
        res.status(401).send('Unauthorizated Access')
    } catch (ex) {
        next(ex);
    }
})

module.exports = router;

