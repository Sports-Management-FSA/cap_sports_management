const conn = require("../conn");
const { INTEGER } = conn.Sequelize;

const User_Requests = conn.define("user_requests", {
    id:{
       type: INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
   },
 });

module.exports = User_Requests;