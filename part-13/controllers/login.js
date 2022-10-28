const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const loginRouter = require('express').Router();
const { SECRET } = require('../util/config');

const { User } = require('../models');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username,
    },
  });

  const passwordCorrect =
    !user || !password
      ? false
      : await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    res.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: '1h',
    jwtid: uuidv4(),
  });

  res.status(200).json({ token, ...userForToken });
});

module.exports = loginRouter;
