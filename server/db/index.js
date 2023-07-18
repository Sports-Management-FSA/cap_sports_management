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
const Requests = require("./models/Requests");
const User_Requests = require("./models/User_Requests");
const Token = require("./models/Token");

Team.belongsTo(League);
League.hasMany(Team);
League.hasMany(Match);
Match.belongsTo(League);
Category.hasMany(League);
League.belongsTo(Category);

// Password Reset Relationship
User.hasMany(Token, { foreignKey: "userId", as: "tokens" });
Token.belongsTo(User, { foreignKey: "userId" });

//super many to many
User.belongsToMany(LeagueRoles, { through: { model: User_LeagueRoles, unique: false } });
LeagueRoles.belongsToMany(User, { through: { model: User_LeagueRoles, unique: false } });
League.belongsToMany(LeagueRoles, { through: { model: User_LeagueRoles, unique: false } });
LeagueRoles.belongsToMany(League, { through: { model: User_LeagueRoles, unique: false } });
User.belongsToMany(League, { through: { model: User_LeagueRoles, unique: false } });
League.belongsToMany(User, { through: { model: User_LeagueRoles, unique: false } });
League.hasMany(User_LeagueRoles);
User.hasMany(User_LeagueRoles);
LeagueRoles.hasMany(User_LeagueRoles);
User_LeagueRoles.belongsTo(User);
User_LeagueRoles.belongsTo(League);
User_LeagueRoles.belongsTo(LeagueRoles);

//super many to many
User.belongsToMany(TeamRoles, { through: { model: User_TeamRoles, unique: false } });
TeamRoles.belongsToMany(User, { through: { model: User_TeamRoles, unique: false } });
Team.belongsToMany(TeamRoles, { through: { model: User_TeamRoles, unique: false } });
TeamRoles.belongsToMany(Team, { through: { model: User_TeamRoles, unique: false } });
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
User.belongsToMany(Match, { through: { model: Scorekeeper, unique: false } });
Match.belongsToMany(User, { through: { model: Scorekeeper, unique: false } });
Match.belongsToMany(Actions, { through: { model: Scorekeeper, unique: false } });
Actions.belongsToMany(Match, { through: { model: Scorekeeper, unique: false } });
Team.belongsToMany(Actions, { through: { model: Scorekeeper, unique: false } });
Actions.belongsToMany(Team, { through: { model: Scorekeeper, unique: false } });
Scorekeeper.belongsTo(Match);
Match.hasMany(Scorekeeper);
Scorekeeper.belongsTo(Team);
Team.hasMany(Scorekeeper);
Scorekeeper.belongsTo(Actions);
Scorekeeper.belongsTo(User);
User.hasMany(Scorekeeper);

//super many to many
//User.belongsToMany(Requests, {as: 'sender', foreignKey: 'senderId', through: { model: User_Requests, unique: false },});
//User.belongsToMany(Requests, {as: 'receiver', foreignKey: 'receiverId', through: { model: User_Requests, unique: false },});
//Requests.belongsToMany(User, {as: 'sender', foreignKey: 'senderId', through: { model: User_Requests, unique: false },});
//Requests.belongsToMany(User, {as: 'receiver', foreignKey: 'receiverId',through: { model: User_Requests, unique: false },});
User.hasMany(Requests, { foreignKey: "senderId", as: "sentRequests" });
User.hasMany(Requests, { foreignKey: "receiverId", as: "receivedRequests" });
//User.hasMany(User_Requests);
Requests.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Requests.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });
//User_Requests.belongsTo(User);

//super many to many
Team.belongsToMany(Requests, { through: { model: User_Requests, unique: false } });
Requests.belongsToMany(Team, { through: { model: User_Requests, unique: false } });
User_Requests.belongsTo(Team);
Team.hasMany(User_Requests);

//super many to many
League.belongsToMany(Requests, { through: { model: User_Requests, unique: false } });
Requests.belongsToMany(League, { through: { model: User_Requests, unique: false } });
User_Requests.belongsTo(League);
League.hasMany(User_Requests);

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
      avatar: "/static/images/football.png"
   });
   await Category.create({
      name: "Hockey",
      avatar: "/static/images/hockey.png"
   });
   await Category.create({
      name: "Basketball",
      avatar: "/static/images/basketball.png"
   });
   await Category.create({
      name: "Baseball",
      avatar: "/static/images/baseball.png"
   });
   await Category.create({
      name: "Esports",
      avatar: "/static/images/esports.png"
   });
   await Category.create({
      name: "Soccer",
      avatar: "/static/images/soccer.png"
   });

   const touchdown = await Actions.create({
      name: "Touchdown",
      value: 5,
      categoryId: 1
   });
   const fieldGoal = await Actions.create({
      name: "Field Goal",
      value: 1,
      categoryId: 1
   });
   const homerun = await Actions.create({
      name: "Homerun",
      value: 5,
      categoryId: 4
   });
   const goal = await Actions.create({
      name: "Goal",
      value: 5,
      categoryId: 3
   });
   const score = await Actions.create({
      name: "Score",
      value: 1
   });

   const player = await TeamRoles.create({ name: "player" });
   const leagueDirector = await LeagueRoles.create({ name: "director" });
   const teamManager = await TeamRoles.create({ name: "manager" });

   // Baseball
   await League.create({
      name: "OC Baseball Club",
      season: "Fall",
      email: "little01@gmail.com",
      logo: "/static/images/baseball2.png",
      categoryId: 4
   });
   await League.create({
      name: "Oakland League",
      season: "Summer",
      email: "oakleague@gmail.com",
      logo: "/static/images/baseball3.png",
      categoryId: 4
   });
   await League.create({
      name: "Just for Fun",
      season: "Summer",
      email: "funn@gmail.com",
      logo: "/static/images/baseball4.png",
      categoryId: 4,
      description:
         "Welcome to our casual adult baseball league! We're a group of baseball enthusiasts who prioritize fun and a relaxed atmosphere. Our league is all about getting together at random times to enjoy the game without the pressure of intense competition."
   });
   await League.create({
      name: "Beer League Baseball",
      season: "Summer",
      email: "funn@gmail.com",
      logo: "/static/images/baseball5.png",
      categoryId: 4
   });
   await League.create({
      name: "Hockey League",
      season: "Winter",
      email: "hockey01@gmail.com",
      logo: "/static/images/nhl.png",
      categoryId: 2
   }),
      // ESPORTS
      await League.create({
         name: "CSGO Wild",
         season: "Summer",
         email: "little05@gmail.com",
         logo: "/static/images/csgoskins.png",
         categoryId: 5
      }),
      await League.create({
         name: "I love gaming",
         season: "Spring",
         email: "little06@gmail.com",
         logo: "/static/images/esports3.png",
         categoryId: 5
      }),
      await League.create({
         name: "Esports League",
         season: "All Year",
         email: "esports01@gmail.com",
         logo: "/static/images/esports.jpeg",
         categoryId: 5
      }),
      await League.create({
         name: "LoL US West",
         season: "Fall",
         email: "little06@gmail.com",
         logo: "/static/images/lolwest1.png",
         categoryId: 5
      }),
      await League.create({
         name: "ValoRATS",
         season: "Fall",
         email: "little07@gmail.com",
         logo: "/static/images/valorant1.png",
         categoryId: 5
      }),
      await League.create({
         name: "DOTA2 Friendz",
         season: "Fall",
         email: "dota2@gmail.com",
         logo: "/static/images/dota21.png",
         categoryId: 5
      }),
      await League.create({
         name: "BF4 Throwback",
         season: "Fall",
         email: "bf41@gmail.com",
         logo: "/static/images/bf41.png",
         categoryId: 5
      }),
      // FOOTBALL
      await League.create({
         name: "Flag Football NY",
         season: "Summer",
         email: "little08@gmail.com",
         logo: "/static/images/flagfootball1.png",
         categoryId: 1
      }),
      await League.create({
         name: "Rec Football Fans",
         season: "Spring",
         email: "little02@gmail.com",
         logo: "/static/images/football1.png",
         categoryId: 1
      });
   await League.create({
      name: "2-hand touch LA",
      season: "Spring",
      email: "2handtouch1@gmail.com",
      logo: "/static/images/football2.png",
      categoryId: 1
   });
   await League.create({
      name: "Beach ball",
      season: "Spring",
      email: "2handtouch1@gmail.com",
      logo: "/static/images/football3.png",
      categoryId: 1
   });
   await League.create({
      name: "Beginner Friendly",
      season: "Spring",
      email: "2handtouch1@gmail.com",
      logo: "/static/images/football4.png",
      categoryId: 1
   });
   await League.create({
      name: "Just for fun",
      season: "Fall",
      email: "little04@gmail.com",
      logo: "/static/images/esports.jpeg",
      categoryId: 3
   }),
      await League.create({
         name: "Soccer Fans",
         season: "Spring",
         email: "little09@gmail.com",
         logo: "/static/images/nhl.png",
         categoryId: 6
      }),
      await Team.create({
         name: "Regular Team",
         season: "Spring",
         email: "regular01@gmail.com",
         logo: "/static/images/mlb.png",
         leagueId: 3,
         description:
            "We're a fun-loving group that enjoys playing the game and creating memorable experiences. Our team values camaraderie, good sportsmanship, and having a great time together. Please reach out to our manager Jof Smith if you're interested in joining us on Thursday nights."
      });

   await Team.create({
      name: "1 Team",
      season: "Spring",
      email: "regular02@gmail.com",
      logo: "/static/images/mlb.png",
      leagueId: 1
   });

   await Team.create({
      name: "Team No League",
      season: "Spring",
      email: "regular022@gmail.com",
      logo: "/static/images/mlb.png"
   });

   await Team.create({
      name: "2 Team",
      season: "Spring",
      email: "regular03@gmail.com",
      logo: "/static/images/mlb.png",
      leagueId: 2
   });
   await Team.create({
      name: "3 Team",
      season: "Spring",
      email: "regular04@gmail.com",
      logo: "/static/images/mlb.png",
      leagueId: 4
   });

   const team1 = await Team.create({
      name: "The Ravens",
      email: "theravens@gmail.com",
      leagueId: 1,
      logo: "/static/images/team1.png"
   });

   const team2 = await Team.create({
      name: "The Bulldogs",
      email: "thebulldogs@gmail.com",
      leagueId: 1,
      logo: "/static/images/team2.png"
   });
   const team3 = await Team.create({
      name: "Dirt Devils",
      email: "dirtdevils@gmail.com",
      leagueId: 1,
      logo: "/static/images/team3.png"
   });
   const team4 = await Team.create({
      name: "Sandlot",
      email: "sandlot@gmail.com",
      leagueId: 2,
      logo: "/static/images/team1.png"
   });
   const team5 = await Team.create({
      name: "Hawks",
      email: "hawks@gmail.com",
      leagueId: 2,
      logo: "/static/images/team2.png"
   });
   const team6 = await Team.create({
      name: "Eagles",
      email: "eagles@gmail.com",
      leagueId: 2,
      logo: "/static/images/team3.png"
   });
   const team7 = await Team.create({
      name: "Angels",
      email: "angels@gmail.com",
      leagueId: 2,
      logo: "/static/images/team1.png"
   });

   const team8 = await Team.create({
      name: "Pigeons",
      email: "pigeons@gmail.com",
      leagueId: 3,
      logo: "/static/images/team1.png"
   });
   const team9 = await Team.create({
      name: "Doves",
      email: "doves@gmail.com",
      leagueId: 3,
      logo: "/static/images/team2.png"
   });

   const match1 = await Match.create({
      name: "Finals",
      description: "final round",
      date: "2023-11-11",
      time: "10:05",
      location: "Barts Stadium",
      leagueId: 1
   });

   const match2 = await Match.create({
      name: "Semi Finals",
      description: "semi final round",
      date: "2023-8-10",
      time: "1:05",
      location: "Barts Stadium",
      leagueId: 2
   });

   const match3 = await Match.create({
      name: "Beginning",
      description: "beginning round",
      date: "2023-10-9",
      time: "12:05",
      location: "Barts Stadium",
      leagueId: 2
   });

   const match4 = await Match.create({
      name: "Wildcard",
      description: "wildcard round",
      date: "2023-06-01",
      time: "12:15",
      location: "Mission Stadium",
      leagueId: 3
   });
   //team managers
   const jack = await User.create({
      username: "jack",
      password: "123",
      firstName: "jack",
      lastName: "smith",
      email: "jack@g.com",
      avatar: "/static/images/avatars/jacksmith1.png"
   });

   const julissa = await User.create({
      username: "juls27",
      password: "123",
      firstName: "Julissa",
      lastName: "Mendoza",
      email: "julissaM@g.com",
      avatar: "/static/images/avatars/julissa1.png"
   });

   const julia = await User.create({
      username: "julia",
      password: "123",
      firstName: "julia",
      lastName: "smith",
      email: "julia@g.com"
   });

   const jof = await User.create({
      username: "jof",
      password: "123",
      firstName: "jof",
      lastName: "smith",
      email: "jof@g.com"
   });

   //directors
   const larry = await User.create({
      username: "larry",
      password: "123",
      firstName: "larry",
      lastName: "smith",
      email: "larry@g.com"
   });

   const lump = await User.create({
      username: "lump",
      password: "123",
      firstName: "lumpy73",
      lastName: "Smith",
      email: "lump@g.com",
      avatar: "/static/images/avatars/lump1.png"
   });

   const lala = await User.create({
      username: "lala",
      password: "123",
      firstName: "lala",
      lastName: "smith",
      email: "lala@g.com"
   });

   //players
   const jen = await User.create({
      username: "jen",
      password: "123",
      firstName: "jen",
      lastName: "smith",
      email: "jen@g.com"
   });

   const moe = await User.create({
      username: "moe",
      password: "123",
      firstName: "moe",
      lastName: "smith",
      email: "moe@g.com"
   });

   const jane = await User.create({
      username: "jane",
      password: "123",
      firstName: "jane",
      lastName: "smith",
      email: "jane@g.com"
   });

   const jaura = await User.create({
      username: "jaura",
      password: "123",
      firstName: "jaura",
      lastName: "smith",
      email: "jaura@g.com"
   });

   const jaylen = await User.create({
      username: "jaylen",
      password: "123",
      firstName: "jaylen",
      lastName: "smith",
      email: "jaylen@g.com"
   });

   const mike = await User.create({
      username: "mike",
      password: "123",
      firstName: "mike",
      lastName: "smith",
      email: "mike@g.com"
   });

   const tina = await User.create({
      username: "tina",
      password: "123",
      firstName: "tina",
      lastName: "smith",
      email: "tina@g.com"
   });

   const joe = await User.create({
      username: "joe",
      password: "123",
      firstName: "joe",
      lastName: "smith",
      email: "joe@g.com"
   });

   const lucy = await User.create({
      username: "lucy",
      password: "123",
      firstName: "lucy",
      lastName: "smith",
      email: "lucy@g.com"
   });

   const homer = await User.create({
      username: "homer",
      password: "123",
      firstName: "homer",
      lastName: "smith",
      email: "homer@g.com"
   });

   const hen = await User.create({
      username: "hen",
      password: "123",
      isPlayer: true,
      firstName: "hen",
      lastName: "smith",
      email: "hen@g.com"
   });

   const han = await User.create({
      username: "han",
      password: "123",
      isPlayer: true,
      firstName: "han",
      lastName: "smith",
      email: "han@g.com"
   });

   const hunt = await User.create({
      username: "hunt",
      password: "123",
      isPlayer: true,
      firstName: "hunt",
      lastName: "smith",
      email: "hunt@g.com"
   });

   const har = await User.create({
      username: "har",
      password: "123",
      isPlayer: true,
      firstName: "har",
      lastName: "smith",
      email: "har@g.com"
   });

   //add director roles to users
   await larry.addLeagueRole(leagueDirector, { through: { leagueId: 1 } });
   await User_LeagueRoles.create({ userId: 5, leagueId: 1, leagueRoleId: 1 });
   await User_LeagueRoles.create({ userId: 5, leagueId: 2, leagueRoleId: 1 });
   await User_LeagueRoles.create({ userId: 5, leagueId: 3, leagueRoleId: 1 });
   await User_LeagueRoles.create({ userId: 5, leagueId: 5, leagueRoleId: 1 });

   //add team manager roles to users
   await jof.addTeamRole(teamManager, { through: { teamId: 1 } });
   await jof.addTeamRole(player, { through: { teamId: 1 } });
   await julia.addTeamRole(teamManager, { through: { teamId: 2 } });
   await julissa.addTeamRole(teamManager, { through: { teamId: 2 } });
   await jack.addTeamRole(teamManager, { through: { teamId: 3 } });

   //add team player role to users
   await mike.addTeamRole(player, { through: { teamId: 1 } });
   await jen.addTeamRole(player, { through: { teamId: 1 } });
   await tina.addTeamRole(player, { through: { teamId: 2 } });
   await moe.addTeamRole(player, { through: { teamId: 2 } });
   await joe.addTeamRole(player, { through: { teamId: 3 } });
   await jane.addTeamRole(player, { through: { teamId: 3 } });
   await lucy.addTeamRole(player, { through: { teamId: 4 } });
   await jaura.addTeamRole(player, { through: { teamId: 4 } });
   await homer.addTeamRole(player, { through: { teamId: 5 } });
   await jaylen.addTeamRole(player, { through: { teamId: 5 } });
   await hen.addTeamRole(player, { through: { teamId: 6 } });
   await han.addTeamRole(player, { through: { teamId: 7 } });
   await hunt.addTeamRole(player, { through: { teamId: 8 } });
   await har.addTeamRole(player, { through: { teamId: 9 } });
   await User_TeamRoles.create({ userId: 1, teamRoleId: 1, teamId: 7 });
   await User_TeamRoles.create({ userId: 1, teamRoleId: 1, teamId: 4 });
   await User_TeamRoles.create({ userId: 1, teamRoleId: 1, teamId: 3 });

   //add teams to matches
   await match1.addTeam([team1, team2]); //league 1
   await match2.addTeam([team4, team5]); //league 2
   await match3.addTeam([team6, team7]); //league 2
   await match4.addTeam([team8, team9]); //league 3

   //add actions to scorekeeper
   await Scorekeeper.create({ matchId: 1, userId: 12, actionId: 1, teamId: 5 });
   await Scorekeeper.create({ matchId: 1, userId: 18, actionId: 1, teamId: 6 });
   await Scorekeeper.create({ matchId: 2, userId: 11, actionId: 1, teamId: 4 });
   await Scorekeeper.create({ matchId: 2, userId: 11, actionId: 1, teamId: 4 });
   await Scorekeeper.create({ matchId: 2, userId: 12, actionId: 1, teamId: 5 });
   await Scorekeeper.create({ matchId: 3, userId: 18, actionId: 2, teamId: 6 });
   await Scorekeeper.create({ matchId: 3, userId: 18, actionId: 2, teamId: 6 });
   await Scorekeeper.create({ matchId: 3, userId: 18, actionId: 2, teamId: 6 });
   await Scorekeeper.create({ matchId: 3, userId: 18, actionId: 2, teamId: 6 });
   await Scorekeeper.create({ matchId: 3, userId: 18, actionId: 2, teamId: 6 });

   //Added Random Post To Teams
   await Post.create({ message: "WE WON!!", likes: 6, userId: 1, teamId: 1 });
   await Post.create({ message: "Can someone cover for me this week?", likes: 6, userId: 2, teamId: 1 });
   await Post.create({ message: "Finally got a hatrick!", likes: 6, userId: 6, teamId: 1 });
   await Post.create({ message: "Playoffs begin next week!!", likes: 6, userId: 3, teamId: 2 });
   await Post.create({ message: "WE ARE THE BEST!", likes: 6, userId: 4, teamId: 2 });
   await Post.create({ message: "Looking for additional teams for next season.", likes: 6, userId: 5, teamId: 3 });

   //Added Random Post To Leagues
   await Post.create({ message: "WE WON!!", likes: 6, userId: 7, leagueId: 1 });
   await Post.create({ message: "WE LOST....", likes: 6, userId: 8, leagueId: 1 });
   await Post.create({ message: "WE WON!!", likes: 6, userId: 9, leagueId: 2 });
   await Post.create({ message: "WE ARE THE BEST!", likes: 10, userId: 4, leagueId: 2 });
   await Post.create({ message: "WE WON!!", likes: 6, userId: 11, leagueId: 3 });
   await Post.create({ message: "WE WON!!", likes: 6, userId: 12, leagueId: 1 });

   //Addes Comments to Post
   await Comment.create({ message: "YEAH!!!", likes: 4, userId: 13, postId: 1 });
   await Comment.create({ message: "YEAH!!!", likes: 4, userId: 14, postId: 1 });
   await Comment.create({ message: "YEAH!!!", likes: 4, userId: 15, postId: 2 });
   await Comment.create({ message: "YEAH!!!", likes: 4, userId: 15, postId: 3 });
   await Comment.create({ message: "YEAH!!!", likes: 4, userId: 16, postId: 8 });

   //add announcements to leagues
   await Announcements.create({ name: "Sean", description: "Testing!", leagueId: 1 });
   await Announcements.create({ name: "Kim", description: "Testing!", leagueId: 2 });
   await Announcements.create({ name: "Olive", description: "Testing!", leagueId: 3 });

   //add messages to leagues
   // await Messages.create({name: "Sean" , subjectLine: "Join league", description: "Hey can I join your league?", leagueId: 5, teamEmail: "sean1322@yahoo.com", teamName: "The Seans", userId: 19});
   // await Messages.create({name: "Bob" , subjectLine: "Interested in your league", description: "Hi! Whats the requirements", leagueId: 5, teamEmail: "bob4523@yahoo.com", teamName: "The Winner", userId: 18});
   // await Messages.create({name: "Miguel" , subjectLine: "Hola", description: "Hola, como estas", leagueId: 5, teamEmail: "Miguelito3234@yahoo.com", teamName: "Mayhem", userId: 3});
   // await Messages.create({name: "Sherry" , subjectLine: "Hello, interested", description: "Hi, may I please join?", leagueId: 5, teamEmail: "Teddy5983@yahoo.com", teamName: "Team Sparta", userId: 4});
   // await Messages.create({name: "Ted" , subjectLine: "Free Agent", description: "Hi, may I please join a team?", leagueId: 5, userId: 7});
   // await Messages.create({name: "Ashley" , subjectLine: "Need a team", description: "Can I join?", leagueId: 5, userId: 9});

   //add requests from team to leagues (1-4)
   // from player to league (5-8)
   // from player to team (9-12)
   // from team to player (13-16)
   await Requests.bulkCreate([
      { senderId: 1, subjectLine: "1team to league", description: "Please let me join1", from: "team", to: "league" }, //1
      { senderId: 1, subjectLine: "2team to league", description: "Please let me join2", from: "team", to: "league" }, //2
      { senderId: 2, subjectLine: "3team to league", description: "Please let me join3", from: "team", to: "league" }, //3
      { senderId: 2, subjectLine: "4team to league", description: "Please let me join4", from: "team", to: "league" }, //4
      {
         senderId: 3,
         subjectLine: "1player to league",
         description: "Please let me join5",
         from: "player",
         to: "league"
      }, //5
      {
         senderId: 4,
         subjectLine: "2player to league",
         description: "Please let me join6",
         from: "player",
         to: "league"
      }, //6
      {
         senderId: 5,
         subjectLine: "3player to league",
         description: "Please let me join7",
         from: "player",
         to: "league"
      }, //7
      {
         senderId: 6,
         subjectLine: "4player to league",
         description: "Please let me join8",
         from: "player",
         to: "league"
      }, //8
      { senderId: 21, subjectLine: "1player to team", description: "Please let me join9", from: "player", to: "team" }, //9
      { senderId: 21, subjectLine: "2player to team", description: "Please let me join10", from: "player", to: "team" }, //10
      { senderId: 21, subjectLine: "3player to team", description: "Please let me join11", from: "player", to: "team" }, //11
      { senderId: 21, subjectLine: "4player to team", description: "Please let me join12", from: "player", to: "team" }, //12
      {
         senderId: 1,
         receiverId: 5,
         subjectLine: "1team to player",
         description: "Please let me join13",
         from: "team",
         to: "player"
      }, //13
      {
         senderId: 1,
         receiverId: 5,
         subjectLine: "2team to player",
         description: "Please let me join14",
         from: "team",
         to: "player"
      }, //14
      {
         senderId: 2,
         receiverId: 5,
         subjectLine: "3team to player",
         description: "Please let me join15",
         from: "team",
         to: "player"
      }, //15
      {
         senderId: 2,
         receiverId: 5,
         subjectLine: "4team to player",
         description: "Please let me join16",
         from: "team",
         to: "player"
      } //16
   ]);

   await Team.bulkCreate([
      { name: "1 Free Agent Team", season: "Spring", email: "freeagent01@gmail.com", logo: "/static/images/mlb.png" }, //15
      { name: "2 Free Agent Team", season: "Spring", email: "freeagent02@gmail.com", logo: "/static/images/mlb.png" }, //16
      { name: "3 Free Agent Team", season: "Spring", email: "freeagent03@gmail.com", logo: "/static/images/mlb.png" }, //17
      { name: "4 Free Agent Team", season: "Spring", email: "freeagent04@gmail.com", logo: "/static/images/mlb.png" } //18
   ]);

   User_TeamRoles.bulkCreate([
      { userId: 1, teamRoleId: 2, teamId: 15 },
      { userId: 1, teamRoleId: 2, teamId: 16 },
      { userId: 2, teamRoleId: 2, teamId: 17 },
      { userId: 2, teamRoleId: 2, teamId: 18 }
   ]);

   User_LeagueRoles.bulkCreate([{ userId: 5, leagueRoleId: 1, leagueId: 7 }]);

   await User_Requests.bulkCreate([
      { senderId: 1, leagueId: 2, requestId: 1, teamId: 6 },
      { senderId: 1, leagueId: 1, requestId: 2, teamId: 2 },
      { senderId: 1, leagueId: 6, requestId: 3, teamId: 4 },
      { senderId: 1, leagueId: 7, requestId: 4, teamId: 15 }, //team to league works
      { senderId: 3, leagueId: 7, requestId: 5, teamId: 15 }, //player to league
      { senderId: 4, leagueId: 7, requestId: 6, teamId: 16 },
      { senderId: 5, leagueId: 7, requestId: 7 }, //no desired team
      { senderId: 6, leagueId: 7, requestId: 8 }, //no desired team
      { senderId: 21, requestId: 9, teamId: 15 }, //player to team
      { senderId: 21, requestId: 10, teamId: 16 },
      { senderId: 21, requestId: 11, teamId: 17 },
      { senderId: 21, requestId: 12, teamId: 18 },
      { senderId: 1, receiverId: 5, requestId: 13, teamId: 15 }, //team to player
      { senderId: 1, receiverId: 5, requestId: 14, teamId: 16 },
      { senderId: 2, receiverId: 5, requestId: 15, teamId: 17 },
      { senderId: 2, receiverId: 5, requestId: 16, teamId: 18 }
   ]);

   console.log("\n\nSeeding Successful!\n\n");
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
   Requests,
   User_Requests
};
