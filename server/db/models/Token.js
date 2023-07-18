const conn = require("../conn");
const { literal, STRING, UUID, UUIDV4, DATE, INTEGER } = conn.Sequelize;

const Token = conn.define(
   "Token",
   {
    //   userId: {
    //      type: INTEGER,
    //      allowNull: false,
    //      references: {
    //         model: "User",
    //         key: "id"
    //      }
    //   },
      token: {
         type: STRING,
         allowNull: false
      },
      createdAt: {
         type: DATE,
         defaultValue: literal("CURRENT_TIMESTAMP")
      },
      expireAt: {
         type: DATE,
         defaultValue: literal("CURRENT_TIMESTAMP + INTERVAL '1 hour'")
      }
   },
   {
      tableName: "tokens",
      timestamps: false // No timestamps columns (createdAt, updatedAt)
   }
);

module.exports = Token;
