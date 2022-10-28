const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class BlacklistedJwt extends Model {}

BlacklistedJwt.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blacklistedJwt',
  }
);

module.exports = BlacklistedJwt;
