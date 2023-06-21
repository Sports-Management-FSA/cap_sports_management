const router = require('express').Router();
// const { Team } = require('../../db/models/Team.js');

router.get('/', async (req, res, next) => {
    try {
        res.send('at /api/teams')
    } catch(ex) {
        next(ex);
    }
})

module.exports = router;