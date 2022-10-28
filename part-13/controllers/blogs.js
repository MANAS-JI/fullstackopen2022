const blogsRouter = require('express').Router();
const { Op } = require('sequelize');
const { tokenExtractor } = require('../util/middleware');

const { Blog, User } = require('../models');

blogsRouter.get('/', async (req, res) => {
  const where = {};

  if (req.query.search) {
    const queryTerm = `%${req.query.search}%`;

    where[Op.or] = [
      { title: { [Op.iLike]: queryTerm } },
      { author: { [Op.iLike]: queryTerm } },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'name', 'username'],
    },
    order: [['likes', 'DESC']],
    where,
  });
  res.json(blogs);
});

blogsRouter.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.json(blog);
});

blogsRouter.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);

  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    res.status(404).end();
  } else if (!user || user.id !== blog.userId) {
    res.status(401).json({ error: 'user not authorized to delete this blog' });
  } else {
    blog.destroy();
    res.status(204).end();
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (!blog) {
    res.status(404).end();
  } else {
    const updatedBlog = await blog.update({ likes: req.body.likes });
    res.json(updatedBlog);
  }
});

module.exports = blogsRouter;
