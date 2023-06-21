const conn = require('../conn');
const {TEXT, STRING, INTEGER, UUID, DATEONLY, TIME, BOOLEAN} = conn.Sequelize;

const Match = conn.define('match', {
    /*id: {
        type: UUID,
        primaryKey: true,
    },*/
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
    date: {
        type: DATEONLY,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    time: {
        type: TIME,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    location:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    teamAid:{
        type: INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    teamBid:{
        type: INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    teamAscore:{    
        type: INTEGER,
    },
    teamBscore:{
        type: INTEGER,
    },
    completion:{
        type: BOOLEAN,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
        defaultValue: false,
    },
})

module.exports = Match;