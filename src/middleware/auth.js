const jwt = require('jsonwebtoken');
const config = require('../../config/index');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return next(new Error('BAD_REQUEST'));
    }
    const decoded = jwt.verify(token, config.tokenKey);
    req.user = decoded;
  } catch (error) {
    next(new Error('UNAUTHORIZED'));
  }
  return next();
};

module.exports = { verifyToken };
