const readingListsRouter = require('express').Router();
const { tokenExtractor } = require('../util/middleware');

const { ReadingList } = require('../models');

readingListsRouter.post('/', async (req, res) => {
  const { blogId, userId } = req.body;
  const readingList = await ReadingList.create({ blogId, userId });
  res.json(readingList);
});

readingListsRouter.put('/:id', tokenExtractor, async (req, res) => {
  const { id } = req.params;
  const readingList = await ReadingList.findByPk(id);

  if (readingList && req.body.update) {
    const updatedReadingList = await readingList.update({
      read: req.body.read,
    });
    res.json(updatedReadingList);
  } else if (readingList) {
    res.status(400).json({ error: 'missing read boolean' });
  } else {
    res.status(404).end();
  }
});

module.exports = readingListsRouter;
