const conn = require("../conn");
const { TEXT, STRING, BOOLEAN } = conn.Sequelize;

const Requests = conn.define("requests", {
   subjectLine: {
      type: STRING
   },
   description: {
      type: TEXT
   },
   isActive: {
      type: BOOLEAN,
      defaultValue: true,
   },
   from: {
      type: STRING,
   },
   to: {
      type: STRING,
   },
   desiredTeam: {
      type: STRING,
   }
});

module.exports = Requests;