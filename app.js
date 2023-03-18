const express = require('express');
const cors = require('cors');
const logger = require('morgan');

require('dotenv').config();

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const authRouter = require('./routes/api/auth');

app.use(
  cors()
  // {
  // origin: ['http://localhost:3000', 'https://petly-front.onrender.com'],
  // methods: 'GET,POST,PUT,DELETE,PATCH',
  // allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true,
  // }
);
app.use(logger(formatsLogger));
app.use(express.json());
app.use(express.static('public'));

// ROUTES:
app.use('/api', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});
module.exports = app;
