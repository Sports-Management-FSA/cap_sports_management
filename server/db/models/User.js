const conn = require("../conn");
const { TEXT, STRING, UUID, UUIDV4, BOOLEAN, INTEGER } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("./Post");
const Comment = require("./Comment");
const Match = require("./Match");
const Actions = require("./Actions");
const Team = require("./Team");
const User_TeamRoles = require("./User_TeamRoles");
const LeagueRoles = require("./LeagueRoles");
const League = require("./League");
const User_LeagueRoles = require("./User_LeagueRoles");
const Scorekeeper = require("./Scorekeeper");
const TeamRoles = require("./TeamRoles");
const JWT = process.env.JWT;

const User = conn.define("user", {
   // id: {
   //   type: UUID,
   //   primaryKey: true,
   //   defaultValue: UUIDV4
   // },
   username: {
      type: STRING,
      // allowNull: false,
      // validate: {
      //   notEmpty: true
      // },
      unique: true
   },
   password: {
      type: STRING,
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
   firstName: {
      type: STRING,
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
   lastName: {
      type: STRING,
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
   email: {
      type: STRING,
      allowNull: false,
      validate: {
         notEmpty: true,
         isEmail: true
      },
      unique: true
   },
   avatar: {
      type: TEXT
   },
   googleId: {
      type: STRING
   },
   facebookId: {
      type: STRING
   },
   twitterId: {
      type: STRING
   }
});

//pass string option of filtering, pass parameter
User.prototype.getUserActions = async function (option, ref) {
   let actions = [];

   switch (option) {
      case "match":
         actions = await conn.models.scorekeeper.findAll({
            where: {
               userId: this.id,
               matchId: ref.id
            },
            include: [
               {
                  model: conn.models.actions
               }
            ]
         });
         break;
      case "league":
         //grab all matches from leagues check scorekeeper for matches
         actions = await conn.models.scorekeeper.findAll({
            where: {
               userId: this.id,
               matchId: ref.id
            },
            include: [
               {
                  model: conn.models.actions
               }
            ]
         });
         break;
      case "team":
         //grab team matches and check scorekeeper for matches
         actions = await conn.models.scorekeeper.findAll({
            where: {
               userId: this.id,
               matchId: ref.id
            },
            include: [
               {
                  model: conn.models.actions
               }
            ]
         });
         break;
      default:
         actions = await conn.models.scorekeeper.findAll({
            where: {
               userId: this.id
            },
            include: [
               {
                  model: conn.models.actions
               }
            ]
         });
   }
   return actions;
};

User.prototype.getRoles = async function () {
   const teamRoles = await conn.models.user_teamRoles.findAll({
      where: {
         userId: this.id
      },
      include: [
         {
            model: conn.models.teamRoles
         },
         {
            model: conn.models.team
         }
      ]
   });

   const leagueRoles = await conn.models.user_leagueRoles.findAll({
      where: {
         userId: this.id
      },
      include: [
         {
            model: conn.models.leagueRoles
         },
         {
            model: conn.models.league
         }
      ]
   });

   const roles = [teamRoles, leagueRoles];
   return roles;
};

const hashPassword = async (password) => {
   return await bcrypt.hash(password, 10);
};

User.addHook("beforeSave", async (user) => {
   if (user.changed("password")) {
      user.password = await hashPassword(user.password);
   }
});

User.findByToken = async function (token) {
   try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.findByPk(id, {
         include: [
            conn.models.teamRoles,
            conn.models.team,
            conn.models.leagueRoles,
            conn.models.league,
            { model: User_LeagueRoles, include: [League, LeagueRoles] },
            { model: User_TeamRoles, include: [Team, TeamRoles] },
            { model: Scorekeeper, include: [Actions, Team, Match] },
            { model: Post, include: [Comment] }
         ]
      });
      if (user) {
         return user;
      }
      throw new Error("User not found");
   } catch (ex) {
      const error = new Error("bad credentials");
      error.status = 401;
      throw error;
   }
};

User.prototype.generateToken = function () {
   return jwt.sign({ id: this.id }, process.env.JWT_SECRET);
};

User.authenticate = async function (credentials) {
   const { username, password } = credentials;
   const user = await this.findOne({
      where: {
         username
      }
   });
   if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = Error("bad credentials");
      error.status = 401;
      throw error;
   }
   return user.generateToken();
};

module.exports = User;
