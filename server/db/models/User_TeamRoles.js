const conn = require("../conn");
const { INTEGER } = conn.Sequelize;

const User_TeamRoles = conn.define("user_teamRoles", {
    id:{
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
});

module.exports = User_TeamRoles;