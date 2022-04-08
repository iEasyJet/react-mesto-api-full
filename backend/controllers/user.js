const { NODE_ENV, CRYPTO_KEY } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Unauthorized = require('../errors/Unauthorized');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const ConflictError = require('../errors/ConflictError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

const postUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          res.send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('Переданы неккоретные данные'));
          } else if (err.name === 'MongoServerError' && err.code === 11000) {
            next(new ConflictError('Пользователь с такой почтой уже существует'));
          } else {
            next(err);
          }
        });
    });
};

const findUser = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  const _id = jwt.verify(token, NODE_ENV === 'production' ? CRYPTO_KEY : 'dev-secret');
  User.findById(_id)
    .orFail(() => {
      next(new NotFoundError('Нет пользователя с переданным id'));
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы неккоретные данные'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? CRYPTO_KEY : 'dev-secret', { expiresIn: '7d' });
      req.user = user._id;
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

const getUserInfoById = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      next(new NotFoundError('Нет пользователя с переданным id'));
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы неккоретные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  postUser,
  findUser,
  updateUser,
  updateAvatar,
  login,
  getUserInfoById,
};
