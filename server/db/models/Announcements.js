const conn = require('../conn');
const {TEXT, STRING} = conn.Sequelize;

const Announcements = conn.define('announcements', {

    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
        }
    },
    description: {
        type: TEXT,
    },
})

module.exports = Announcements;