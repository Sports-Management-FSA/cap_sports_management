const router = require('express').Router();
const { Player } = require('../../db/models/Player.js');

router.get('/', async (req, res, next) => {
    try {
        res.send('at /api/players')
    } catch(ex) {
        next(ex);
    }
})

module.exports = router;