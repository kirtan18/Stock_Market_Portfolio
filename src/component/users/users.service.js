const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersDal = require('./users.dal');

const { dbConnPool } = require('../../../config/db.config');
const { tokenKey } = require('../../../config/index');

const saltRounds = 13;

module.exports = {
  // To register new user
  registerService: async (userName, userEmail, userPassword) => {
    const dbClient = await dbConnPool.connect();
    try {
      const hashPassword = await bcrypt.hash(userPassword, saltRounds);
      const result = usersDal.registerDal(dbClient, userName, userEmail, hashPassword);
      const PAYLOAD = {
        ...result,
      };
      const token = jwt.sign(PAYLOAD, tokenKey, { expiresIn: '2h' });
      return token;
    } finally {
      dbClient.release();
    }
  },

  loginService: async (userEmail, userPassword) => {
    const dbClient = await dbConnPool.connect();
    try {
      const user = await usersDal.loginDal(dbClient, userEmail);
      if (!user) {
        throw new Error('USER_NOT_FOUND');
      }
      const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
      if (!passwordMatch) {
        throw new Error('UNAUTHORIZED');
      }
      const PAYLOAD = {
        ...user
      };
      const token = jwt.sign(PAYLOAD, tokenKey, { expiresIn: '24h' });
      return token;
    } finally {
      dbClient.release();
    }
  }
};
