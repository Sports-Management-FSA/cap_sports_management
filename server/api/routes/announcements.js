const router = require('express').Router();
const { User, Team, Match, Announcements } = require('../../db');
const { League } = require('../../db');
const LeagueRoles = require('../../db/models/LeagueRoles');
const TeamRoles = require('../../db/models/TeamRoles');

//get all announcements
router.get('/', async (req, res, next) => {
    try {
        const announcements = await Announcements.findAll({include:[League]});
        res.send(announcements);
    } catch (ex) {
        next(ex);
    }
})

//get announcment by id
router.get('/:id', async (req, res, next) => {
    try {
        const announcement = await Announcements.findByPk(req.params.id, {include:[League]});
        res.send(announcement);
    } catch (ex) {
        next(ex);
    }
})

//create announcement
router.post('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (user) {
            const announcement = await Announcements.create(req.body)
            res.send(announcement)
        }
        res.status(401).send('Unauthorizated Access')
    } catch (ex) {
        next(ex);
    }
})

//delete announcement
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

//update announcement
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);

        if (user) {
            const announcement = await Announcements.findByPk(req.params.id);
            await announcement.update(req.body);
            res.send(announcement);
        }
        res.status(401).send('Unauthorizated Access')
    } catch (ex) {
        next(ex);
    }
})

module.exports = router;


// // GET ALL ANNOUNCEMENTS
// router.get('/', async (req, res, next) => {
//     try {
//         const announcements = await Announcements.findAll({include:[League]});
//         res.send(announcements);
//     } catch(ex) {
//         res.send('no data yet, next(ex) prompted')
//         next(ex);
//     }
// })

// // GET ANNOUNCEMENTS BY ID
// router.get('/:id', async (req, res, next) => {
//     try {
//         const announcements = await Announcements.findByPk(req.params.id, {include:[League]});
//         res.send(announcements);
//     } catch(ex) {
//         next(ex);
//     }
// })

// // CREATE ANNOUNCEMENT
// router.post('/', async (req, res, next) => {
//     try {
//         const user = await Announcements.findByToken(req.headers.authorization, {include:[League]});
//         if (!user){
//             return res.status(401).send('Login or Register');
//         } 
//         const director = user.leagueRoles.find(role=>role.name == 'director');
//         const announcements = await Announcements.create(req.body);
//         if(!director){
//             const leagueDirector = LeagueRoles.findOne({where: {name: 'director'}});

//             // VVV  ????
//             await user.addLeagueRole(leagueDirector, {through: {leagueId: announcements.leagueId}})
//         }
//         res.send(announcements);
//     } catch(ex) {
//         next(ex);
//     }
// })

// // UPDATE ANNOUNCEMENTS BASED ON ID
// router.put('/:id', async (req, res, next) => {
//     try {
//         const user = await User.findByToken(req.headers.authorization, {include:[LeagueRoles]});
        
//         if (!user){
//             return res.status(401).send('Unauthorized to update Announcements');
//         } 
//         const director = user.leagueRoles.find(role=>role.name == 'director');

//         if( !director || director.user_leagueRoles.leagueId != req.params.id){
//             return res.status(401).send('Unauthorized to update Announcements');
//         }
//         const announcements = await Announcements.findByPk(req.params.id);
//         await announcements.update(req.body);
//     } catch(ex) {
//         next(ex)
//     }
// })

// // DELETE ANNOUNCEMENTS ON ID
// router.delete('/:id', async (req, res, next) => {
//     try {
//         const user = await User.findByToken(req.headers.authorization, {include:[LeagueRoles]});
        
//         if (!user){
//             return res.status(401).send('Unauthorized to delete Announcements');
//         }
//         const director = user.leagueRoles.find(role=>role.name == 'director');

//         if( !director || director.user_leagueRoles.leagueId != req.params.id){
//             return res.status(401).send('Unauthorized to delete Announcements');
//         }
//         await Announcements.destroy({where: { id: req.params.id}});
//         res.sendStatus(204);
//     } catch(ex){
//         next(ex);
//     }
// })


module.exports = router;