const conn = require("../conn");
const { STRING, INTEGER } = conn.Sequelize;

const Post = conn.define("post", {
    message: {
        type: STRING,
        allowNull: false
    },
    likes: {
        type: INTEGER,
        defaultValue: 0
    }
})

module.exports = Post;