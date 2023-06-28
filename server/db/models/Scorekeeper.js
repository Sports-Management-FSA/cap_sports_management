const conn = require("../conn");
const { INTEGER } = conn.Sequelize;

const Scorekeeper = conn.define("scorekeeper", {
    id:{
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
});

module.exports = Scorekeeper;
