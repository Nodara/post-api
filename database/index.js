const signale = require('signale');
const { Sequelize } = require('sequelize');
const dataBaseConfig = require('../util/database');
const Users = require('../users/users.model');

const connection = new Sequelize(dataBaseConfig);

connection
  .authenticate()
  .then(() => {
    signale.success('Database to connect Successfully');
  })
  .catch((error) => {
    signale.error('Unable to connect to the database:', error);
  });

Users.init(connection);
Users.sync({ force: false })
  .catch((error) => (error));
