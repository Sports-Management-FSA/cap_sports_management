const conn = require('./conn');
const User = require('./models/User');
const League = require('./models/League');
const Match = require('./models/Match');
const Team = require('./models/Team');
const TeamRoles = require('./models/TeamRoles');
const Scorekeeper = require('./models/Scorekeeper');
const LeagueRoles = require('./models/LeagueRoles');
const Actions = require('./models/Actions');
const Category = require('./models/Category');
const User_LeagueRoles = require('./models/User_LeagueRoles');
const User_TeamRoles = require('./models/User_TeamRoles');
const Team_Matches = require('./models/Team_Matches');

Team.belongsTo(League);
League.hasMany(Team);
League.hasMany(Match);
Match.belongsTo(League);
Category.hasMany(League);
League.belongsTo(Category);

User.belongsToMany(LeagueRoles, {through: {model: User_LeagueRoles, unique: false}});
LeagueRoles.belongsToMany(User, {through: {model: User_LeagueRoles, unique: false}});
League.belongsToMany(LeagueRoles, {through: {model: User_LeagueRoles, unique: false}});
LeagueRoles.belongsToMany(League, {through: {model: User_LeagueRoles, unique: false}});
User.belongsToMany(League, {through: {model: User_LeagueRoles, unique:false}});
League.belongsToMany(User, {through: {model: User_LeagueRoles, unique: false}});

User.belongsToMany(TeamRoles, {through: {model: User_TeamRoles, unique: false}});
TeamRoles.belongsToMany(User, {through: {model: User_TeamRoles, unique: false}});
Team.belongsToMany(TeamRoles, {through: {model: User_TeamRoles, unique: false}});
TeamRoles.belongsToMany(Team, {through: {model: User_TeamRoles, unique: false}});
User.belongsToMany(Team, {through: {model: User_TeamRoles, unique:false}});
Team.belongsToMany(User, {through: {model: User_TeamRoles, unique: false}});

//kind of working??
/*User_TeamRoles.belongsTo(Team);
Team.hasMany(User_TeamRoles);
User_TeamRoles.belongsTo(User);
User.hasMany(User_TeamRoles)
TeamRoles.hasMany(User_TeamRoles);
User_TeamRoles.belongsTo(TeamRoles)*/

/*Scorekeeper.belongsTo(Match);
Match.hasMany(Scorekeeper);
Scorekeeper.belongsTo(Actions);
Actions.hasMany(Scorekeeper);
Scorekeeper.belongsTo(User);
User.hasMany(Scorekeeper);*/

User.belongsToMany(Actions, {through: {model: Scorekeeper, unique: false}});
Actions.belongsToMany(User, {through: {model: Scorekeeper, unique: false}});
Match.belongsToMany(Actions, {through: {model: Scorekeeper, unique: false}});
Actions.belongsToMany(Match, {through: {model: Scorekeeper, unique: false}});
User.belongsToMany(Match, {through: {model: Scorekeeper, unique:false}});
Match.belongsToMany(User, {through: {model: Scorekeeper, unique:false}});
Team.belongsToMany(Actions, {through: {model: Scorekeeper, unique:false}});
Actions.belongsToMany(Team, {through: {model: Scorekeeper, unique:false}});

Match.belongsToMany(Team, {through: Team_Matches});
Team.belongsToMany(Match, {through: Team_Matches});

Actions.belongsTo(Category);
Category.hasMany(Actions);


const syncAndSeed = async()=> {
  await conn.sync({ force: true });

    await Category.create({name: 'Football'})
    await Category.create({name: 'Hockey'})
    await Category.create({name: 'Basketball'})

    const touchdown = await Actions.create({name: 'Touchdown', value: 5, categoryId: 1})
    const homerun = await Actions.create({name: 'Homerun', value: 5, categoryId: 2})
    const fieldGoal = await Actions.create({name: 'Field Goal', value: 5, categoryId: 3})

    const player = await TeamRoles.create({name: 'player'})
    const leagueDirector = await LeagueRoles.create({name: 'director'})
    const teamManager = await TeamRoles.create({name: 'manager'})

    await League.create({
      name:'Little League',
      season: 'Fall',
      email: 'little01@gmail.com',
      logo: '/static/images/nfl.png',
      categoryId: 1,
    }),
    await League.create({
      name:'Big League',
      season: 'Summer',
      email: 'little01@gmail.com',
      logo: '/static/images/league2.png',
      categoryId: 2,
    }),
    await League.create({
      name:'Major League',
      season: 'Spring',
      email: 'little01@gmail.com',
      logo: '/static/images/league3.png',
      categoryId: 3,
    })
    await League.create({
      name:'Hockey League',
      season: 'Winter',
      email: 'hockey01@gmail.com',
      logo: '/static/images/nhl.png',
      categoryId: 1,
    }),
    await League.create({
      name:'Esports League',
      season: 'All Year',
      email: 'esports01@gmail.com',
      logo: '/static/images/esports.jpeg',
      categoryId: 2,
    }),
    await League.create({
      name:'Just for fun',
      season: 'Fall',
      email: 'little01@gmail.com'
    }),
    await League.create({
      name:'CSGO Wild',
      season: 'Summer',
      email: 'little01@gmail.com'
    }),
    await League.create({
      name:'I love gaming',
      season: 'Spring',
      email: 'little01@gmail.com'
    }),
    await League.create({
      name:'asket Weaving',
      season: 'Fall',
      email: 'little01@gmail.com'
    }),
    await League.create({
      name:'American Football',
      season: 'Summer',
      email: 'little01@gmail.com'
    }),
    await League.create({
      name:'Soccer Fans',
      season: 'Spring',
      email: 'little01@gmail.com'
    }),
    await Team.create({
      name:'Regular League',
      season: 'Spring',
      email: 'regular01@gmail.com',
      logo: '/static/images/mlb.png',
      categoryId: 3,
    })

    const team1 = await Team.create({
      name: 'The Ravens',
      email: 'theravens@gmail.com',
      leagueId: 1,
      logo: '/static/images/team1.png'
    })

    const team2 = await Team.create({
      name: 'The Bulldogs',
      email: 'thebulldogs@gmail.com',
      leagueId: 1,
      logo: '/static/images/team2.png'
    })
    const team3 = await Team.create({
      name: 'Dirt Devils',
      email: 'dirtdevils@gmail.com',
      leagueId: 1,
      logo: '/static/images/team3.png'
    })
    const team4 = await Team.create({
      name: 'Sandlot',
      email: 'sandlot@gmail.com',
      leagueId: 2,
      logo: '/static/images/team1.png'
    })
    const team5 = await Team.create({
      name: 'Hawks',
      email: 'hawks@gmail.com',
      leagueId: 2,
      logo: '/static/images/team2.png'
    })
    const team6 = await Team.create({
      name: 'Eagles',
      email: 'eagles@gmail.com',
      leagueId: 2,
      logo: '/static/images/team3.png'
    })
    const team7 = await Team.create({
      name: 'Angels',
      email: 'angels@gmail.com',
      leagueId: 2,
      logo: '/static/images/team1.png'
    })
  
    const team8 = await Team.create({
      name: 'Pigeons',
      email: 'pigeons@gmail.com',
      leagueId: 3,
      logo: '/static/images/team1.png'
    })
    const team9 = await Team.create({
      name: 'Doves',
      email: 'doves@gmail.com',
      leagueId: 3,
      logo: '/static/images/team2.png'
    })
  
    const match1 = await Match.create({
      name:'Finals', 
      description: 'final round', 
      date: "2023-11-11", 
      time: '10:05', 
      location: 'Barts Stadium', 
      leagueId: 1,
    })
    
    const match2 = await Match.create({
      name:'Semi Finals', 
      description: 'semi final round',
      date: "2023-8-10", 
      time: '1:05', 
      location: 'Barts Stadium', 
      leagueId: 2,
    })

    const match3 = await Match.create({
      name:'Beginning',  
      description: 'beginning round', 
      date: "2023-10-9", 
      time: '12:05', 
      location: 'Barts Stadium',
      leagueId: 2,
    })

    const match4 = await Match.create({
      name:'Wildcard', 
      description: 'wildcard round', 
      date: "2023-06-01", 
      time: '12:15', 
      location: 'Mission Stadium', 
      leagueId: 3,
    })

   //team managers
    const jack = await User.create({ 
      username: 'jack', 
      password: '123', 
      firstName: 'jack',
      lastName: 'smith',
      email: 'jack@g.com',
    })

    const julissa = await User.create({ 
      username: 'julissa', 
      password: '123', 
      firstName: 'julissa',
      lastName: 'smith',
      email: 'julissa@g.com',
    })

    const julia = await User.create({ 
      username: 'julia', 
      password: '123', 
      firstName: 'julia',
      lastName: 'smith',
      email: 'julia@g.com',
    })

    const jof = await User.create({ 
      username: 'jof', 
      password: '123', 
      firstName: 'jof',
      lastName: 'smith',
      email: 'jof@g.com',
    })
   
    //directors
    const larry = await User.create({ 
      username: 'larry', 
      password: '123', 
      firstName: 'larry',
      lastName: 'smith',
      email: 'larry@g.com',
    })

    const lump = await User.create({ 
      username: 'lump', 
      password: '123', 
      firstName: 'lump',
      lastName: 'smith',
      email: 'lump@g.com',
    })

    const lala = await User.create({ 
      username: 'lala', 
      password: '123', 
      firstName: 'lala',
      lastName: 'smith',
      email: 'lala@g.com',
    })

    //players
    const jen = await User.create({ 
      username: 'jen', 
      password: '123', 
      firstName: 'jen',
      lastName: 'smith',
      email: 'jen@g.com',
    })

    const moe = await User.create({ 
      username: 'moe', 
      password: '123', 
      firstName: 'moe',
      lastName: 'smith',
      email: 'moe@g.com',

    })

    const jane = await User.create({ 
      username: 'jane', 
      password: '123', 
      firstName: 'jane',
      lastName: 'smith',
      email: 'jane@g.com',
    })

    const jaura = await User.create({ 
      username: 'jaura', 
      password: '123', 
      firstName: 'jaura',
      lastName: 'smith',
      email: 'jaura@g.com',
    })

    const jaylen = await User.create({ 
      username: 'jaylen', 
      password: '123', 
      firstName: 'jaylen',
      lastName: 'smith',
      email: 'jaylen@g.com',
    })

    const mike = await User.create({ 
      username: 'mike', 
      password: '123', 
      firstName: 'mike',
      lastName: 'smith',
      email: 'mike@g.com',
    })

    const tina = await User.create({ 
      username: 'tina', 
      password: '123', 
      firstName: 'tina',
      lastName: 'smith',
      email: 'tina@g.com',
    })

    const joe = await User.create({ 
      username: 'joe', 
      password: '123', 
      firstName: 'joe',
      lastName: 'smith',
      email: 'joe@g.com',
    })

    const lucy = await User.create({ 
      username: 'lucy', 
      password: '123', 
      firstName: 'lucy',
      lastName: 'smith',
      email: 'lucy@g.com',
    })

    const homer = await User.create({ 
      username: 'homer', 
      password: '123', 
      firstName: 'homer',
      lastName: 'smith',
      email: 'homer@g.com',
    })

    const hen = await User.create({ 
      username: 'hen', 
      password: '123', 
      isPlayer: true, 
      firstName: 'hen',
      lastName: 'smith',
      email: 'hen@g.com',
    })

    const han = await User.create({ 
      username: 'han', 
      password: '123', 
      isPlayer: true, 
      firstName: 'han',
      lastName: 'smith',
      email: 'han@g.com',
    })

    const hunt = await User.create({ 
      username: 'hunt', 
      password: '123', 
      isPlayer: true, 
      firstName: 'hunt',
      lastName: 'smith',
      email: 'hunt@g.com',
    })

    const har = await User.create({ 
      username: 'har', 
      password: '123', 
      isPlayer: true, 
      firstName: 'har',
      lastName: 'smith',
      email: 'har@g.com',
    });
    
    //add director roles to users
    await larry.addLeagueRole(leagueDirector, {through: {leagueId: 1}})
    await lump.addLeagueRole(leagueDirector, {through: {leagueId: 2}})
    await lala.addLeagueRole(leagueDirector, {through: {leagueId: 3}})

    //add team manager roles to users
    await jof.addTeamRole(teamManager, {through: {teamId: 1}})
    await jof.addTeamRole(player, {through: {teamId: 1}});
    await julia.addTeamRole(teamManager, {through: {teamId: 2}})
    await julissa.addTeamRole(teamManager, {through: {teamId: 2}})
    await jack.addTeamRole(teamManager, {through: {teamId: 3}})

    //add team player role to users
    await mike.addTeamRole(player, {through: {teamId: 1}})
    await jen.addTeamRole(player, {through: {teamId: 1}})
    await tina.addTeamRole(player, {through: {teamId: 2}})
    await moe.addTeamRole(player, {through: {teamId: 2}})
    await joe.addTeamRole(player, {through: {teamId: 3}})
    await jane.addTeamRole(player, {through: {teamId: 3}})
    await lucy.addTeamRole(player, {through: {teamId: 4}})
    await jaura.addTeamRole(player, {through: {teamId: 4}})
    await homer.addTeamRole(player, {through: {teamId: 5}})
    await jaylen.addTeamRole(player, {through: {teamId: 5}})
    await hen.addTeamRole(player, {through: {teamId: 6}})
    await han.addTeamRole(player, {through: {teamId: 7}})
    await hunt.addTeamRole(player, {through: {teamId: 8}})
    await har.addTeamRole(player, {through: {teamId: 9}})
    
    //add teams to matches
    await match1.addTeam([team1, team2]); //league 1
    await match2.addTeam([team4, team5]); //league 2
    await match3.addTeam([team6, team7]); //league 2
    await match4.addTeam([team8, team9]); //league 3

    //add actions to scorekeeper
    await Scorekeeper.create({matchId: 1, userId: 13, actionId: 1, teamId: 1});
    await Scorekeeper.create({matchId: 1, userId: 9, actionId: 1, teamId: 2});
    await Scorekeeper.create({matchId: 2, userId: 11, actionId: 1, teamId: 4});
    await Scorekeeper.create({matchId: 2, userId: 11, actionId: 1, teamId: 4});
    await Scorekeeper.create({matchId: 2, userId: 12, actionId: 1, teamId: 5});
    await Scorekeeper.create({matchId: 3, userId: 18, actionId: 2, teamId: 6});
    await Scorekeeper.create({matchId: 3, userId: 18, actionId: 2, teamId: 6});
    await team8.addActions(fieldGoal, {through: {userId: 20, matchId:4}})
    await team9.addActions(fieldGoal, {through: {userId: 21, matchId:4}})

    console.log('\n\nSeeding Successful!\n\n')
};

module.exports = {
  syncAndSeed,
  User,
  Match,
  Team,
  League,
};
