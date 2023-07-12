const conn = require("../conn");
const { STRING, INTEGER } = conn.Sequelize;

const Actions = conn.define("actions", {
   name: {
      type: STRING,
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
   value: {
    type: INTEGER,
    allowNull: false,
    validate: {
       notEmpty: true
    }
 },
});

module.exports = Actions;
