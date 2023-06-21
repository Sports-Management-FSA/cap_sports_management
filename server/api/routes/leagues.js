const router = require('express').Router();
const { League } = require('../../db/models/League.js');

router.get('/', async (req, res, next) => {
    try {
        res.send('at /api/leagues')
    } catch(ex) {
        next(ex);
    }
})

module.exports = router;