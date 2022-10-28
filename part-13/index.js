const express = require('express');
const cors = require('cors');
require('express-async-errors');

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const blogsRouter = require('./controllers/blogs');
const authorsRouter = require('./controllers/authors');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const readingListRouter = require('./controllers/readingLists');
const { errorHandler } = require('./util/middleware');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/blogs', blogsRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/users', usersRouter);
app.use('/api/readinglists', readingListRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

// errorHandler middleware
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
