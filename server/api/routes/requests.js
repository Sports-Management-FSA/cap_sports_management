const router = require('express').Router();
const { User, Requests, User_Requests, Team, League } = require('../../db');

//get all requests
router.get('/', async (req, res, next) => {
    try {
        const requests = await Requests.findAll({include:[Team, League,
        {model: User, as: "sender", attributes: ['firstName', 'lastName']},
        {model: User, as: "receiver", attributes: ['firstName', 'lastName']},
        ]});
        res.send(requests);
    } catch (ex) {
        next(ex);
    }
})

//get requests by id
router.get('/:id', async (req, res, next) => {
    try {
        const request = await Requests.findByPk(req.params.id, {include:[Team, League,
        {model: User, as: "sender", attributes: ['firstName', 'lastName']},
        {model: User, as: "receiver", attributes: ['firstName', 'lastName']},
        ]});
        res.send(request);
    } catch (ex) {
        next(ex);
    }
})

//create request
router.post('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (user) {
            const request = await Requests.create(req.body)
            res.send(request)
        }
    } catch (ex) {
        res.status(401).send('Unauthorizated Access')
        next(ex);
    }
})

//delete requests
router.delete('/:id', async (req, res, next) => {
    console.log("FROM API", req.params.id);
    try {
        await Requests.destroy({ where: { id: req.params.id } });
        res.sendStatus(204);
    } catch (ex) {
        res.status(401).send('Unauthorizated Access')
        next(ex);
    }
})

//update requests
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (user) {
            const request = await Requests.findByPk(req.params.id);
            await request.update(req.body);
            res.send(request);
        } else {
            res.status(401).send('Unauthorizated Access')
        }
    } catch (ex) {
        next(ex);
    }
})

module.exports = router;