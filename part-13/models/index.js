const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./reading_list');
const BlacklistedJwt = require('./blacklisted_jwt');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList, as: 'readingUsers' });
User.hasMany(ReadingList);
ReadingList.belongsTo(User);
Blog.hasMany(ReadingList);
ReadingList.belongsTo(Blog);

module.exports = {
  Blog,
  User,
  ReadingList,
  BlacklistedJwt,
};
