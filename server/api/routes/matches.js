const router = require('express').Router();
const { Match } = require('../../db/models/Match.js');

router.get('/', async (req, res, next) => {
    try {
        res.send('at /api/matches')
    } catch(ex) {
        next(ex);
    }
})

module.exports = router;