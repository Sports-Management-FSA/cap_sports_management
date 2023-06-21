const conn = require('../conn');
const {STRING, INTEGER, UUID, UUIDV4} = conn.Sequelize;

const Player = conn.define('player', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    username: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        unique: true
    },
    password: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    firstName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        },
        unique: true
    },
    avatar: {
        type: STRING,
        default: ''
    },
    adminstrator: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: 0 
    },
    teamId: {
        type: UUID,
        allowNull: false
    }
})

module.exports = Player;