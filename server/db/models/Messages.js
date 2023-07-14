const conn = require("../conn");
const { TEXT, STRING, INTEGER, BOOLEAN } = conn.Sequelize;

const Messages = conn.define("messages", {
   name: {
      type: STRING,
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
   subjectLine: {
      type: TEXT
   },
   description: {
      type: TEXT
   },
   teamName: {
      type: TEXT,
      allowNull: true
   },
   teamEmail: {
      type: STRING,
      allowNull: true
   },
   playerEmail: {
      type: STRING,
      allowNull: true
   },
   desiredTeam: {
      type: STRING,
      allowNull: true
   },
   userId: {
      type: INTEGER,
      allowNull: false,
   },
   isActive: {
      type: BOOLEAN,
      defaultValue: true,
   }
});

module.exports = Messages;
