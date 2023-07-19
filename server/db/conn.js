const Sequelize = require('sequelize');
const config = {
  database: 'cap_db',
  dialect: 'postgres',
  logging: false,
  password: 'password',
  username: 'postgres',
};

if (process.env.QUIET) {
  config.logging = false;
}
// const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/cap_db', {
//   logging: false,
// });

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/cap_db', config);

module.exports = conn;
