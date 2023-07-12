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
const Messages = require("./models/Mesages");

Team.belongsTo(League);
League.hasMany(Team);
League.hasMany(Match);
Match.belongsTo(League);
Category.hasMany(League);
League.belongsTo(Category);

User.belongsToMany(LeagueRoles, {through: { model: User_LeagueRoles, unique: false },});
LeagueRoles.belongsToMany(User, {through: { model: User_LeagueRoles, unique: false },});
League.belongsToMany(LeagueRoles, {through: { model: User_LeagueRoles, unique: false },});
LeagueRoles.belongsToMany(League, {through: { model: User_LeagueRoles, unique: false },});
User.belongsToMany(League, {through: { model: User_LeagueRoles, unique: false },});
League.belongsToMany(User, {through: { model: User_LeagueRoles, unique: false },});

User.belongsToMany(TeamRoles, {through: { model: User_TeamRoles, unique: false },});
TeamRoles.belongsToMany(User, {through: { model: User_TeamRoles, unique: false },});
Team.belongsToMany(TeamRoles, {through: { model: User_TeamRoles, unique: false },});
TeamRoles.belongsToMany(Team, {through: { model: User_TeamRoles, unique: false },});
User.belongsToMany(Team, { through: { model: User_TeamRoles, unique: false } });
Team.belongsToMany(User, { through: { model: User_TeamRoles, unique: false } });

User.belongsToMany(Actions, { through: { model: Scorekeeper, unique: false } });
Actions.belongsToMany(User, { through: { model: Scorekeeper, unique: false } });
Match.belongsToMany(Actions, {through: { model: Scorekeeper, unique: false },});
Actions.belongsToMany(Match, {through: { model: Scorekeeper, unique: false },});
User.belongsToMany(Match, { through: { model: Scorekeeper, unique: false } });
Match.belongsToMany(User, { through: { model: Scorekeeper, unique: false } });
Team.belongsToMany(Actions, { through: { model: Scorekeeper, unique: false } });
Actions.belongsToMany(Team, { through: { model: Scorekeeper, unique: false } });

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
  const homerun = await Actions.create({
    name: "Homerun",
    value: 5,
    categoryId: 2,
  });
  const fieldGoal = await Actions.create({
    name: "Field Goal",
    value: 5,
    categoryId: 3,
  });
  const scorePoint = await Actions.create({
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
    
    //add director roles to users
    await larry.addLeagueRole(leagueDirector, {through: {leagueId: 1}});
    await User_LeagueRoles.create({userId: 5, leagueId: 1, leagueRoleId: 1});
    await User_LeagueRoles.create({userId: 5, leagueId: 2, leagueRoleId: 1});
    await User_LeagueRoles.create({userId: 5, leagueId: 3, leagueRoleId: 1});
    await User_LeagueRoles.create({userId: 5, leagueId: 5, leagueRoleId: 1});
    
    // await User_LeagueRoles.create({userId: 5, leagueId: 3, leagueRoleId: 3});
    // await User_LeagueRoles.create({userId: 5, leagueId: 4, leagueRoleId: 4});
    //await larry.addLeagueRole(leagueDirector, {through: {leagueId: 5}})
    // await lump.addLeagueRole(leagueDirector, {through: {leagueId: 2}})
    // await lala.addLeagueRole(leagueDirector, {through: {leagueId: 3}})

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
    await larry.addTeamRole(player, {throught: {teamId: 7}})
    await larry.addTeamRole(player, {throught: {teamId: 4}})
    await larry.addTeamRole(player, {throught: {teamId: 3}})
    await larry.addTeamRole(player, {throught: {teamId: 39}})
    
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
    
    //Added Random Post To Teams
    await Post.create({message:"WE WON!!", likes: 6, userId: 1, teamId: 1});
    await Post.create({message:"WE LOST....", likes: 6, userId: 2, teamId: 1});
    await Post.create({message:"WE WON!!", likes: 6, userId: 3, teamId: 2});
    await Post.create({message:"WE ARE THE BEST!", likes: 6, userId: 4, teamId: 2});
    await Post.create({message:"WE WON!!", likes: 6, userId: 5, teamId: 3});
    await Post.create({message:"WE WON!!", likes: 6, userId: 6, teamId: 1});

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
    await Messages.create({name: "Sean" , subjectLine: "Join league", description: "Hey can I join your league?", leagueId: 5, teamEmail: "sean@y.com", teamName: "The Seans"});
    await Messages.create({name: "Bob" , subjectLine: "Interested in your league", description: "Hi! Whats the requirements", leagueId: 5, teamEmail: "sean@y.com", teamName: "The Winner"});
    await Messages.create({name: "Miguel" , subjectLine: "Hola", description: "Hola, como estas", leagueId: 5, teamEmail: "sean@y.com", teamName: "Mayhem"});
    await Messages.create({name: "Sherry" , subjectLine: "Hello, interested", description: "Hi, may I please join?", leagueId: 5, teamEmail: "sean@y.com", teamName: "Team Sparta"});
    

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
