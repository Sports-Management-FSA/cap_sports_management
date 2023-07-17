const conn = require("../conn");
const { STRING, UUID, UUIDV4, BOOLEAN, DATEONLY, TEXT } = conn.Sequelize;

const League = conn.define("league", {
   /* id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },*/
   name: {
      type: STRING,
      defaultValue: true,
      allowNull: false
   },
   logo: {
      type: TEXT,
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
   public: {
      type: BOOLEAN,
      defaultValue: true,
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
   startDate: {
      type: DATEONLY,
      allowNull: true
   },
   endDate: {
      type: DATEONLY,
      allowNull: true
   },
   description: {
      type: STRING,
      allowNull: true
   }
});

module.exports = League;
