const conn = require("../conn");
const { STRING } = conn.Sequelize;

const LeagueRoles = conn.define("leagueRoles", {
   name: {
      type: STRING,
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
});

module.exports = LeagueRoles;
