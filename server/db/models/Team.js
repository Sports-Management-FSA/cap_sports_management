const { INTEGER } = require("sequelize");
const conn = require("../conn");
const { TEXT, UUIDV4, STRING, UUID } = conn.Sequelize;

const Team = conn.define("team", {
   id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
   name: {
      type: STRING,
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
   logo: {
      type: STRING,
      defaultValue: ""
   },
   description: {
      type: TEXT
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
   leagueId: {
      type: UUID,
      allowNull: false
   },
   gamesWon: {
      type: INTEGER
   },
   gamesLost: {
      type: INTEGER
   }
});

module.exports = Team;
