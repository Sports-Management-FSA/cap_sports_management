const conn = require("./conn");
const User = require("./models/User");
const League = require("./models/League");
const Match = require("./models/Match");
const Team = require("./models/Team");
const TeamRoles = require("./models/TeamRoles");
const Scorekeeper = require("./models/Scorekeeper");
const LeagueRoles = require("./models/LeagueRoles");
const Actions = require("./models/Actions");
const Category = require("./models/Category");
const User_LeagueRoles = require("./models/User_LeagueRoles");
const User_TeamRoles = require("./models/User_TeamRoles");
const Team_Matches = require("./models/Team_Matches");
const Announcements = require("./models/Announcements");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Messages = require("./models/Messages");

Team.belongsTo(League);
League.hasMany(Team);
League.hasMany(Match);
Match.belongsTo(League);
Category.hasMany(League);
League.belongsTo(Category);

//super many to many
User.belongsToMany(LeagueRoles, {through: { model: User_LeagueRoles, unique: false },});
LeagueRoles.belongsToMany(User, {through: { model: User_LeagueRoles, unique: false },});
League.belongsToMany(LeagueRoles, {through: { model: User_LeagueRoles, unique: false },});
LeagueRoles.belongsToMany(League, {through: { model: User_LeagueRoles, unique: false },});
User.belongsToMany(League, {through: { model: User_LeagueRoles, unique: false },});
League.belongsToMany(User, {through: { model: User_LeagueRoles, unique: false },});
League.hasMany(User_LeagueRoles);
User.hasMany(User_LeagueRoles);
LeagueRoles.hasMany(User_LeagueRoles);
User_LeagueRoles.belongsTo(User);
User_LeagueRoles.belongsTo(League);
User_LeagueRoles.belongsTo(LeagueRoles);

//super many to many
User.belongsToMany(TeamRoles, {through: { model: User_TeamRoles, unique: false },});
TeamRoles.belongsToMany(User, {through: { model: User_TeamRoles, unique: false },});
Team.belongsToMany(TeamRoles, {through: { model: User_TeamRoles, unique: false },});
TeamRoles.belongsToMany(Team, {through: { model: User_TeamRoles, unique: false },});
User.belongsToMany(Team, { through: { model: User_TeamRoles, unique: false } });
Team.belongsToMany(User, { through: { model: User_TeamRoles, unique: false } });
Team.hasMany(User_TeamRoles);
User.hasMany(User_TeamRoles);
TeamRoles.hasMany(User_TeamRoles);
User_TeamRoles.belongsTo(User);
User_TeamRoles.belongsTo(Team);
User_TeamRoles.belongsTo(TeamRoles);

//super many to many
User.belongsToMany(Actions, { through: { model: Scorekeeper, unique: false } });
Actions.belongsToMany(User, { through: { model: Scorekeeper, unique: false } });
Match.belongsToMany(Actions, {through: { model: Scorekeeper, unique: false },});
Actions.belongsToMany(Match, {through: { model: Scorekeeper, unique: false },});
User.belongsToMany(Match, { through: { model: Scorekeeper, unique: false } });
Match.belongsToMany(User, { through: { model: Scorekeeper, unique: false } });
Team.belongsToMany(Actions, { through: { model: Scorekeeper, unique: false } });
Actions.belongsToMany(Team, { through: { model: Scorekeeper, unique: false } });
Match.hasMany(Scorekeeper);
Team.hasMany(Scorekeeper);
User.hasMany(Scorekeeper);
Scorekeeper.belongsTo(Actions);
Scorekeeper.belongsTo(User);
Scorekeeper.belongsTo(Team);
Scorekeeper.belongsTo(Match);

Match.belongsToMany(Team, { through: Team_Matches });
Team.belongsToMany(Match, { through: Team_Matches });

Actions.belongsTo(Category);
Category.hasMany(Actions);

Announcements.belongsTo(League);
League.hasMany(Announcements);

Post.belongsTo(User);
Post.belongsTo(League);
Post.belongsTo(Team);
User.hasMany(Post);
Team.hasMany(Post);
League.hasMany(Post);

User.hasMany(Comment);
Post.hasMany(Comment);
Comment.belongsTo(Post);
Comment.belongsTo(User);

Messages.belongsTo(League);
League.hasMany(Messages);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  await Category.create({
    name: "Football",
    avatar: "/static/images/football.png",
  });
  await Category.create({
    name: "Hockey",
    avatar: "/static/images/hockey.png",
  });
  await Category.create({
    name: "Basketball",
    avatar: "/static/images/basketball.png",
  });
  await Category.create({
    name: "Baseball",
    avatar: "/static/images/baseball.png",
  });
  await Category.create({
    name: "Esports",
    avatar: "/static/images/esports.png",
  });
  await Category.create({
    name: "Soccer",
    avatar: "/static/images/soccer.png",
  });
  
  const touchdown = await Actions.create({
    name: "Touchdown",
    value: 5,
    categoryId: 1,
  });
  const fieldGoal = await Actions.create({
    name: "Field Goal",
    value: 1,
    categoryId: 1,
  });
  const homerun = await Actions.create({
    name: "Homerun",
    value: 5,
    categoryId: 4,
  });
  const goal = await Actions.create({
    name: "Goal",
    value: 5,
    categoryId: 3,
  });
  const score = await Actions.create({
    name: "Score",
    value: 1,
  });

  const player = await TeamRoles.create({ name: "player" });
  const leagueDirector = await LeagueRoles.create({ name: "director" });
  const teamManager = await TeamRoles.create({ name: "manager" });

  const league1 = await League.create({
    name: "Little League",
    season: "Fall",
    email: "little01@gmail.com",
    logo: "/static/images/nfl.png",
    categoryId: 4,
  });
  const league2 = await League.create({
    name: "Big League",
    season: "Summer",
    email: "little02@gmail.com",
    logo: "/static/images/league2.png",
    categoryId: 4,
  });
  const league3 = await League.create({
    name: "Major League",
    season: "Spring",
    email: "little03@gmail.com",
    logo: "/static/images/league3.png",
    categoryId: 1,
  });
  await League.create({
    name: "Hockey League",
    season: "Winter",
    email: "hockey01@gmail.com",
    logo: "/static/images/nhl.png",
    categoryId: 2,
  }),
    await League.create({
      name: "Esports League",
      season: "All Year",
      email: "esports01@gmail.com",
      logo: "/static/images/esports.jpeg",
      categoryId: 5,
    }),
    await League.create({
      name: "Just for fun",
      season: "Fall",
      email: "little04@gmail.com",
      logo: "/static/images/esports.jpeg",
      categoryId: 3,
    }),
    await League.create({
      name: "CSGO Wild",
      season: "Summer",
      email: "little05@gmail.com",
      logo: "/static/images/nhl.png",
      categoryId: 3,
    }),
    await League.create({
      name: "I love gaming",
      season: "Spring",
      email: "little06@gmail.com",
      logo: "/static/images/esports.jpeg",
      categoryId: 5,
    }),
    await League.create({
      name: "Basket Weaving",
      season: "Fall",
      email: "little07@gmail.com",
      logo: "/static/images/nhl.png",
      categoryId: 5,
    }),
    await League.create({
      name: "Basket Weaving",
      season: "Fall",
      email: "little07@gmail.com",
      logo: "/static/images/nhl.png",
      categoryId: 5,
    }),
    await League.create({
      name: "Basket Weaving",
      season: "Fall",
      email: "little07@gmail.com",
      logo: "/static/images/nhl.png",
      categoryId: 5,
    }),
    await League.create({
      name: "Basket Weaving",
      season: "Fall",
      email: "little07@gmail.com",
      logo: "/static/images/nhl.png",
      categoryId: 5,
    }),
    await League.create({
      name: "Basket Weaving",
      season: "Fall",
      email: "little07@gmail.com",
      logo: "/static/images/nhl.png",
      categoryId: 5,
    }),
    await League.create({
      name: "American Football",
      season: "Summer",
      email: "little08@gmail.com",
      logo: "/static/images/nhl.png",
      categoryId: 1,
    }),
    await League.create({
      name: "Soccer Fans",
      season: "Spring",
      email: "little09@gmail.com",
      logo: "/static/images/nhl.png",
      categoryId: 6,
    }),
    await Team.create({
      name: "Regular Team",
      season: "Spring",
      email: "regular01@gmail.com",
      logo: "/static/images/mlb.png",
      leagueId: 3,
    });

    await Team.create({
      name:'1 Team',
      season: 'Spring',
      email: 'regular02@gmail.com',
      logo: '/static/images/mlb.png',
      leagueId: 1,
    })

    await Team.create({
      name:'Team No League',
      season: 'Spring',
      email: 'regular022@gmail.com',
      logo: '/static/images/mlb.png',
    })

    await Team.create({
      name:'2 Team',
      season: 'Spring',
      email: 'regular03@gmail.com',
      logo: '/static/images/mlb.png',
      leagueId: 2,
    })
    await Team.create({
      name:'3 Team',
      season: 'Spring',
      email: 'regular04@gmail.com',
      logo: '/static/images/mlb.png',
      leagueId: 4,
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
    await larry.addLeagueRole(leagueDirector, {through: {leagueId: 1}});
    await User_LeagueRoles.create({userId: 5, leagueId: 1, leagueRoleId: 1});
    await User_LeagueRoles.create({userId: 5, leagueId: 2, leagueRoleId: 1});
    await User_LeagueRoles.create({userId: 5, leagueId: 3, leagueRoleId: 1});
    await User_LeagueRoles.create({userId: 5, leagueId: 5, leagueRoleId: 1});

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
    await User_TeamRoles.create({userId: 1, teamRoleId: 1, teamId: 7});
    await User_TeamRoles.create({userId: 1, teamRoleId: 1, teamId: 4});
    await User_TeamRoles.create({userId: 1, teamRoleId: 1, teamId: 3});
    
    //add teams to matches
    await match1.addTeam([team1, team2]); //league 1
    await match2.addTeam([team4, team5]); //league 2
    await match3.addTeam([team6, team7]); //league 2
    await match4.addTeam([team8, team9]); //league 3

    //add actions to scorekeeper
    await Scorekeeper.create({matchId: 1, userId: 12, actionId: 1, teamId: 5});
    await Scorekeeper.create({matchId: 1, userId: 18, actionId: 1, teamId: 6});
    await Scorekeeper.create({matchId: 2, userId: 11, actionId: 1, teamId: 4});
    await Scorekeeper.create({matchId: 2, userId: 11, actionId: 1, teamId: 4});
    await Scorekeeper.create({matchId: 2, userId: 12, actionId: 1, teamId: 5});
    await Scorekeeper.create({matchId: 3, userId: 18, actionId: 2, teamId: 6});
    await Scorekeeper.create({matchId: 3, userId: 18, actionId: 2, teamId: 6});
    await Scorekeeper.create({matchId: 3, userId: 18, actionId: 2, teamId: 6});
    await Scorekeeper.create({matchId: 3, userId: 18, actionId: 2, teamId: 6});
    await Scorekeeper.create({matchId: 3, userId: 18, actionId: 2, teamId: 6});
    
    //Added Random Post To Teams
    await Post.create({message:"WE WON!!", likes: 6, userId: 1, teamId: 1});
    await Post.create({message:"Can someone cover for me this week?", likes: 6, userId: 2, teamId: 1});
    await Post.create({message:"Finally got a hatrick!", likes: 6, userId: 6, teamId: 1});
    await Post.create({message:"Playoffs begin next week!!", likes: 6, userId: 3, teamId: 2});
    await Post.create({message:"WE ARE THE BEST!", likes: 6, userId: 4, teamId: 2});
    await Post.create({message:"Looking for additional teams for next season.", likes: 6, userId: 5, teamId: 3});

    //Added Random Post To Leagues
    await Post.create({message:"WE WON!!", likes: 6, userId: 7, leagueId: 1});
    await Post.create({message:"WE LOST....", likes: 6, userId: 8, leagueId: 1});
    await Post.create({message:"WE WON!!", likes: 6, userId: 9, leagueId: 2});
    await Post.create({message:"WE ARE THE BEST!", likes: 10, userId: 4, leagueId: 2});
    await Post.create({message:"WE WON!!", likes: 6, userId: 11, leagueId: 3});
    await Post.create({message:"WE WON!!", likes: 6, userId: 12, leagueId: 1});

    //Addes Comments to Post
    await Comment.create({message:"YEAH!!!", likes: 4, userId:13, postId: 1});
    await Comment.create({message:"YEAH!!!", likes: 4, userId:14, postId: 1});
    await Comment.create({message:"YEAH!!!", likes: 4, userId:15, postId: 2});
    await Comment.create({message:"YEAH!!!", likes: 4, userId:15, postId: 3});
    await Comment.create({message:"YEAH!!!", likes: 4, userId:16, postId: 8});

    //add announcements to leagues
    await Announcements.create({name: "Sean" , description: "Testing!", leagueId: 1});
    await Announcements.create({name: "Kim" , description: "Testing!", leagueId: 2});
    await Announcements.create({name: "Olive" , description: "Testing!", leagueId: 3});

    //add messages to leagues
    await Messages.create({name: "Sean" , subjectLine: "Join league", description: "Hey can I join your league?", leagueId: 5, teamEmail: "sean1322@yahoo.com", teamName: "The Seans", userId: 19});
    await Messages.create({name: "Bob" , subjectLine: "Interested in your league", description: "Hi! Whats the requirements", leagueId: 5, teamEmail: "bob4523@yahoo.com", teamName: "The Winner", userId: 18});
    await Messages.create({name: "Miguel" , subjectLine: "Hola", description: "Hola, como estas", leagueId: 5, teamEmail: "Miguelito3234@yahoo.com", teamName: "Mayhem", userId: 3});
    await Messages.create({name: "Sherry" , subjectLine: "Hello, interested", description: "Hi, may I please join?", leagueId: 5, teamEmail: "Teddy5983@yahoo.com", teamName: "Team Sparta", userId: 4});
    await Messages.create({name: "Ted" , subjectLine: "Free Agent", description: "Hi, may I please join a team?", leagueId: 5, userId: 7});
    await Messages.create({name: "Ashley" , subjectLine: "Need a team", description: "Can I join?", leagueId: 5, userId: 9});
    

    console.log('\n\nSeeding Successful!\n\n')
};

module.exports = {
  syncAndSeed,
  User,
  Match,
  Team,
  League,
  TeamRoles,
  Scorekeeper,
  LeagueRoles,
  Announcements,
  Actions,
  Category,
  User_LeagueRoles,
  User_TeamRoles,
  Team_Matches,
  Post,
  Comment,
  Messages,
};
