const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../../config/index');

const blockListTokenMap = new Map();
const blockListAccessToken = new Set();

module.exports = {
  auth: (req, res, next) => {
    const token = req.headers.authorization;
    try {
      if (!token) {
        throw new Error('FORBIDDEN');
      }
      if (blockListAccessToken.has(token)) {
        throw new Error('FORBIDDEN');
      }
      jwt.verify(token, accessTokenSecret, (err, decoded) => {
        if (err) {
          next(new Error('UNAUTHORIZED'));
        }
        req.user = decoded;
        next();
      });
    } catch (error) {
      next(error);
    }
  },
  blockListTokenMap,
  blockListAccessToken
};
