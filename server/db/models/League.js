const conn = require('./conn');
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const League = conn.define('league', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        defaultValue: true,
        allowNull: false
    },
    logo: {
        type: STRING,
        allowNull: true
    },
    season: {
        type: STRING,
        allowNull: false

    },
    email: {
        type: STRING,
        allowNull: true
    },

})

module.exports = League;