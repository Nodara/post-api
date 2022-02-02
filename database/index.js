const signale = require('signale');
const { Sequelize } = require('sequelize');

const dataBaseConfig = require('../util/database');

const Users = require('../users/user.model');
const Posts = require('../posts/post.model');

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
Posts.init(connection);

Users.hasMany(Posts, { as: 'posts', foreignKey: { allowNull: false, name: 'userId' } });
Posts.belongsTo(Users, { as: 'user', foreignKey: { allowNull: false } });

Users.sync({ force: false })
  .catch((error) => (error));

Posts.sync({ force: false })
  .catch((error) => (error));
