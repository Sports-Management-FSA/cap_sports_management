const router = require('express').Router();
const { User, Messages } = require('../../db');
const { League } = require('../../db');

//get all messages
router.get('/', async (req, res, next) => {
    try {
        const messages = await Messages.findAll({include:[League]});
        res.send(messages);
    } catch (ex) {
        next(ex);
    }
})

//get messages by id
router.get('/:id', async (req, res, next) => {
    try {
        const message = await Messages.findByPk(req.params.id, {include:[League]});
        res.send(message);
    } catch (ex) {
        next(ex);
    }
})

//create message
router.post('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (user) {
            const message = await Messages.create(req.body)
            res.send(message)
        }
        res.status(401).send('Unauthorizated Access')
    } catch (ex) {
        next(ex);
    }
})

//delete messages
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

//update messages
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);

        if (user) {
            const message = await Messages.findByPk(req.params.id);
            await message.update(req.body);
            res.send(message);
        }
        res.status(401).send('Unauthorizated Access')
    } catch (ex) {
        next(ex);
    }
})

module.exports = router;
