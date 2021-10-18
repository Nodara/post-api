const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');

class Users extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: connection,
        tableName: 'users',
        hooks: {
          beforeCreate: (user) => bcrypt.hash(user.password, 10).then((hash) => {
            // eslint-disable-next-line no-param-reassign
            user.password = hash;
          }),
        },
      },
    );
  }
}

Users.prototype.isValidPassword = function compare(password) {
  return bcrypt.compare(password, this.password);
};
module.exports = Users;
