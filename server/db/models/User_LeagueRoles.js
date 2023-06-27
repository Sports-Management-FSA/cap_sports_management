const conn = require("../conn");
const { INTEGER } = conn.Sequelize;

const User_LeagueRoles = conn.define("user_leagueRoles", {
   id:{
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
  },
});

module.exports = User_LeagueRoles;