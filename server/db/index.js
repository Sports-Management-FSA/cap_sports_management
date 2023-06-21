const conn = require('./conn');
const User = require('./models/User');
const League = require('./models/League.js');
const Match = require('./models/Match.js');
const Team = require('./models/Team.js');

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  
    await League.create({
      name:'Little League',
      season: 'Fall',
      email: 'little01@gmail.com'
    }),
    await League.create({
      name:'Big League',
      season: 'Summer',
      email: 'little01@gmail.com'
    }),
    await League.create({
      name:'Major League',
      season: 'Spring',
      email: 'little01@gmail.com'
    }),

    await Team.create({
      name: 'The Bulldogs',
      email: 'thebulldogs@gmail.com',
      leagueId: 1,
    }),
    await Team.create({
      name: 'Dirt Devils',
      email: 'dirtdevils@gmail.com',
      leagueId: 1,
    }),
    await Team.create({
      name: 'Sandlot',
      email: 'sandlot@gmail.com',
      leagueId: 1,
    }),
    await Team.create({
      name: 'Hawks',
      email: 'hawks@gmail.com',
      leagueId: 2,
    }),
    await Team.create({
      name: 'Eagles',
      email: 'eagles@gmail.com',
      leagueId: 2,
    }),
    await Team.create({
      name: 'Angels',
      email: 'angels@gmail.com',
      leagueId: 2,
    }),
    await Team.create({
      name: 'The Ravens',
      email: 'theravens@gmail.com',
      leagueId: 3,
    }),
    await Team.create({
      name: 'Pigeons',
      email: 'pigeons@gmail.com',
      leagueId: 3,
    }),
    await Team.create({
      name: 'Doves',
      email: 'doves@gmail.com',
      leagueId: 3,
    }),

    await Match.create({
      name:'Finals', 
      description: 'final round', 
      date: '011/01/2023', 
      time: '10:05', 
      location: 'Barts Stadium', 
      teamAid: 2, 
      teamBid: 3,
      leagueId: 1,
    }),
    await Match.create({
      name:'Semi Finals', 
      description: 'semi final round', 
      date: '10/02/2023', 
      time: '1:05', 
      location: 'Barts Stadium', 
      teamAid: 4, 
      teamBid: 5,
      leagueId: 2,
    }),
    await Match.create({
      name:'Beginning', 
      description: 'beginning round', 
      date: '9/01/2023', 
      time: '12:05', 
      location: 'Barts Stadium', 
      teamAid: 8, 
      teamBid: 7,
      leagueId: 3,
    }),

    await User.create({ 
      username: 'jen', 
      password: '123', 
      isManager: true, 
      teamId: 1,
      firstName: 'jen',
      lastName: 'smith',
      email: 'jen@g.com',
    }),

    await User.create({ 
      username: 'moe', 
      password: '123', 
      isManager: true, 
      teamId: 2,
      firstName: 'moe',
      lastName: 'smith',
      email: 'moe@g.com',

    }),
    await User.create({ 
      username: 'jane', 
      password: '123', 
      isManager: true, 
      teamId: 3,
      firstName: 'jane',
      lastName: 'smith',
      email: 'jane@g.com',
    }),
    await User.create({ 
      username: 'jaura', 
      password: '123', 
      isManager: true, 
      teamId: 4,
      firstName: 'jaura',
      lastName: 'smith',
      email: 'jaura@g.com',
    }),
    await User.create({ 
      username: 'jaylen', 
      password: '123', 
      isManager: true, 
      teamId: 5,
      firstName: 'jaylen',
      lastName: 'smith',
      email: 'jaylen@g.com',
    }),
    await User.create({ 
      username: 'jack', 
      password: '123', 
      isManager: true, 
      teamId: 6,
      firstName: 'jack',
      lastName: 'smith',
      email: 'jack@g.com',
    }),
    await User.create({ 
      username: 'julissa', 
      password: '123', 
      isManager: true, 
      teamId: 7,
      firstName: 'julissa',
      lastName: 'smith',
      email: 'julissa@g.com',
    }),
    await User.create({ 
      username: 'julia', 
      password: '123', 
      isManager: true, 
      teamId: 8,
      firstName: 'julia',
      lastName: 'smith',
      email: 'julia@g.com',
    }),
    await User.create({ 
      username: 'jof', 
      password: '123', 
      isManager: true, 
      teamId: 9,
      firstName: 'jof',
      lastName: 'smith',
      email: 'jof@g.com',
    }),
   
    //directors
    await User.create({ 
      username: 'larry', 
      password: '123', 
      isDirector: true, 
      leagueId: 1,
      firstName: 'larry',
      lastName: 'smith',
      email: 'larry@g.com',
    }),
    await User.create({ 
      username: 'lump', 
      password: '123', 
      isDirector: true, 
      leagueId: 2,
      firstName: 'lump',
      lastName: 'smith',
      email: 'lump@g.com',
    }),
    await User.create({ 
      username: 'lala', 
      password: '123', 
      isDirector: true, 
      leagueId: 3,
      firstName: 'lala',
      lastName: 'smith',
      email: 'lala@g.com',
    }),

    //players
    await User.create({ 
      username: 'mike', 
      password: '123', 
      isPlayer: true, 
      teamId: 1,
      firstName: 'mike',
      lastName: 'smith',
      email: 'mike@g.com',
    }),
    await User.create({ 
      username: 'tina', 
      password: '123', 
      isPlayer: true, 
      teamId: 2,
      firstName: 'tina',
      lastName: 'smith',
      email: 'tina@g.com',
    }),
    await User.create({ 
      username: 'joe', 
      password: '123', 
      isPlayer: true, 
      teamId: 3,
      firstName: 'joe',
      lastName: 'smith',
      email: 'joe@g.com',
    }),
    await User.create({ 
      username: 'lucy', 
      password: '123', 
      isPlayer: true, 
      teamId: 4,
      firstName: 'lucy',
      lastName: 'smith',
      email: 'lucy@g.com',
    }),
    await User.create({ 
      username: 'homer', 
      password: '123', 
      isPlayer: true, 
      teamId: 5,
      firstName: 'homer',
      lastName: 'smith',
      email: 'homer@g.com',
    }),
    await User.create({ 
      username: 'hen', 
      password: '123', 
      isPlayer: true, 
      teamId: 6,
      firstName: 'hen',
      lastName: 'smith',
      email: 'hen@g.com',
    }),
    await User.create({ 
      username: 'han', 
      password: '123', 
      isPlayer: true, 
      teamId: 7,
      firstName: 'han',
      lastName: 'smith',
      email: 'han@g.com',
    }),
    await User.create({ 
      username: 'hunt', 
      password: '123', 
      isPlayer: true, 
      teamId: 8,
      firstName: 'hunt',
      lastName: 'smith',
      email: 'hunt@g.com',
    }),
    await User.create({ 
      username: 'har', 
      password: '123', 
      isPlayer: true, 
      teamId: 9,
      firstName: 'har',
      lastName: 'smith',
      email: 'har@g.com',
    });
    conn.close();
    console.log('\n\nSeeding Successful!\n\n')
};

module.exports = {
  syncAndSeed,
};
