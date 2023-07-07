const conn = require('../conn');
const { TEXT, STRING } = conn.Sequelize;

const Messages = conn.define('messages', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
        }
    },
    subjectLine: {
        type: TEXT,
    },
    description: {
        type: TEXT,
    },
    
   
  
})

module.exports = Messages;