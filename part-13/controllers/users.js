const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const { User, Blog, ReadingList } = require('../models');

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'username'],
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      },
    ],
  });

  res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const where = {
    id,
    '$readings.readingLists.user_id$': id,
  };

  if (req.query.read === 'true') {
    where['$readings.readingLists.read$'] = true;
  } else if (req.query.read === 'false') {
    where['$readings.readingLists.read$'] = false;
  }

  const user = await User.findOne({
    attributes: ['name', 'username'],
    where,
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        through: {
          attributes: [],
        },
        include: [
          {
            model: ReadingList,
            attributes: ['read', 'id'],
          },
        ],
      },
    ],
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body;

  if (!password || password.length < 8) {
    res.status(400).json({ error: 'password must be at least 8 characters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    username,
    passwordHash,
  });

  res.json(user);
});

usersRouter.put('/:username', async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (user) {
    const updatedUser = await user.update({ username: req.body.username });
    res.json(updatedUser);
  } else {
    res.status(404).end();
  }
});

module.exports = usersRouter;
