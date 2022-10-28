const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('blacklisted_jwts', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blacklisted_jwts');
  },
};
