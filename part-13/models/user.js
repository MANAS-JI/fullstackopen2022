const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        is: /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/i,
      },
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'user',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  }
);

module.exports = User;
