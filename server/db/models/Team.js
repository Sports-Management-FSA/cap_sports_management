const { INTEGER } = require("sequelize");
const conn = require("../conn");
const { TEXT, UUIDV4, STRING, UUID } = conn.Sequelize;

const Team = conn.define("team", {
   /*
   leaving in case we want to switch back to uuid
   id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },*/
   name: {
      type: STRING,
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
   logo: {
      type: TEXT,
      defaultValue: "/static/images/defaultteam1.png"
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
   gamesWon: {
      type: INTEGER
   },
   gamesLost: {
      type: INTEGER
   }
});

module.exports = Team;
