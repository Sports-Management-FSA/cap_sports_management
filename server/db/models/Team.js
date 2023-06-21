const conn = require("../conn");
const { TEXT, UUIDV4, STRING, UUID } = conn.Sequelize;

const Team = conn.define("team", {
   id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4
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
   }
});

module.exports = Team;
