const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isValidBlogYear(year) {
          const date = new Date();
          if (year < 1991 || year > date.getFullYear()) {
            throw new Error(
              `year must be between 1991 and ${date.getFullYear()}`
            );
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'blog',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  }
);

module.exports = Blog;
