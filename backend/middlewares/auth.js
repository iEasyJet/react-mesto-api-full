const { CRYPTO_KEY } = process.env;
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let _id;
  try {
    _id = jwt.verify(token, CRYPTO_KEY);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  req.user = _id;

  return next();
};

module.exports = auth;
