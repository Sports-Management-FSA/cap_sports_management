const conn = require("../conn");
const { STRING, INTEGER, BOOLEAN } = conn.Sequelize;

const Actions = conn.define("actions", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  value: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  countPoint: {
    type: BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: true,
  },
});

module.exports = Actions;
