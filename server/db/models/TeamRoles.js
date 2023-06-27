const conn = require("../conn");
const { STRING } = conn.Sequelize;

const TeamRoles = conn.define("teamRoles", {
   name: {
      type: STRING,
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
});

module.exports = TeamRoles;
