const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const user = require('./routes/user');
const card = require('./routes/card');
const { login, postUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { postUserValidation, loginValidation } = require('./middlewares/validation');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
/* const { cors } = require('./middlewares/cors'); */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

const allowedCors = [
  'https://easyjet.nomoredomains.work',
  'http://easyjet.nomoredomains.work',
  'localhost:3000',
];

app.use(cors({
  origin: allowedCors,
}));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', postUserValidation, postUser);

app.use('/', auth, user);
app.use('/', auth, card);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  console.log(err);
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
