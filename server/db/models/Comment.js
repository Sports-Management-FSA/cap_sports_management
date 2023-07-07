const conn = require("../conn");
const { STRING, INTEGER } = conn.Sequelize;

const Comment = conn.define("comment", {
    message: {
        type: STRING,
        allowNull: false
    },
    likes: {
        type: INTEGER,
        defaultValue: 0
    }
})

module.exports = Comment;