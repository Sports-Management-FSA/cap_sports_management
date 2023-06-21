const express = require('express');
const router = express.Router();
const authRouter = require('./routes/auth.js');
const leaguesRouter = require('./routes/leagues.js');
const playersRouter = require('./routes/players.js');
const teamsRouter = require('./routes/teams.js');


// Setting endpoints AFTER /api/
router.use('/auth', authRouter);
router.use('/leagues', leaguesRouter);
router.use('/players', playersRouter);
router.use('/teams', teamsRouter);

router.get('/', (req, res, next) => {
    res.send('at /api');
})

module.exports = router;