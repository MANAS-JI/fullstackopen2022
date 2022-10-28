const logoutRouter = require('express').Router();
const { tokenExtractor } = require('../util/middleware');

const { BlacklistedJwt } = require('../models');

logoutRouter.post('/', tokenExtractor, async (req, res) => {
  const uuid = req.decodedToken.jti;

  const blacklistedJwt = await BlacklistedJwt.create({ id: uuid });

  res.json(blacklistedJwt);
});

module.exports = logoutRouter;
