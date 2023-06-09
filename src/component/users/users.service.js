const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TokenGenerator = require('uuid-token-generator');
const usersDal = require('./users.dal');

const { dbConnPool } = require('../../../config/db.config');
const { accessTokenSecret, refreshTokenSecret } = require('../../../config/index');
const { sendMailForGetToken } = require('../../helper/index');

const { blockListTokenMap, blockListAccessToken } = require('../../middleware/auth');

const saltRounds = 13;

module.exports = {
  registerService: async (userName, userEmail, userPassword) => {
    const dbClient = await dbConnPool.connect();
    try {
      const hashPassword = await bcrypt.hash(userPassword, saltRounds);
      const result = usersDal.registerDal(dbClient, userName, userEmail, hashPassword);
      return result;
    } finally {
      dbClient.release();
    }
  },

  loginService: async (userEmail, userPassword) => {
    const dbClient = await dbConnPool.connect();
    try {
      const user = await usersDal.getUserDal(dbClient, userEmail);
      if (!user) {
        throw new Error('USER_NOT_FOUND');
      }
      const validPassword = await bcrypt.compare(userPassword, user.userPassword);
      if (!validPassword) {
        throw new Error('UNAUTHORIZED');
      }
      const PAYLOAD = {
        ...user
      };
      const accessToken = jwt.sign(PAYLOAD, accessTokenSecret, { expiresIn: '24h' });
      const refreshToken = jwt.sign(PAYLOAD, refreshTokenSecret, { expiresIn: '7d' });
      blockListTokenMap.set(user.userId, refreshToken);
      const response = {
        status: 'Logged in',
        token: accessToken,
        refreshtoken: refreshToken,
      };
      return response;
    } finally {
      dbClient.release();
    }
  },

  getTokenService: async (refreshToken) => {
    const dbClient = await dbConnPool.connect();
    try {
      let tokenUser;
      jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
        if (err) {
          throw new Error('UNAUTHORIZED');
        }
        tokenUser = decoded;
      });
      const { userId } = tokenUser;
      if (!blockListTokenMap.has(userId)) {
        throw new Error('FORBIDDEN');
      }
      const user = await usersDal.getUserDal(dbClient, tokenUser.userEmail);
      if (!user) {
        throw new Error('USER_NOT_FOUND');
      }
      const PAYLOAD = {
        ...user
      };
      const accessToken = jwt.sign(PAYLOAD, accessTokenSecret, { expiresIn: '24h' });
      return {
        accessToken,
      };
    } finally {
      dbClient.release();
    }
  },

  logoutUserService: async (token, userId) => {
    blockListTokenMap.delete(userId);
    blockListAccessToken.add(token);
    // jwt.sign(token, '', { expiresIn: '1' }, (logout, err) => {
    //   if (err) {
    //     throw new Error(err);
    //   }
    // });
  },

  forgotPasswordService: async (userEmail) => {
    const dbClient = await dbConnPool.connect();
    try {
      const user = await usersDal.getUserDal(dbClient, userEmail);
      if (!user) {
        throw new Error('USER_NOT_FOUND');
      }
      const tokenGen = new TokenGenerator(TokenGenerator.BASE36);
      const token = tokenGen.generate();
      // Token expire after 1 hour(3600000 miliseconds)
      const expiresAt = new Date(Date.now() + 3600000);

      await usersDal.updateUserResetData(dbClient, token, expiresAt, userEmail);

      const resetUrl = `http://localhost:5555/resetTokenAndExpireTime?token=${token}`;

      const isMailSent = sendMailForGetToken(user.userName, userEmail, resetUrl);
      if (!isMailSent) {
        throw new Error('DELIVERY_ERROR');
      }
    } finally {
      dbClient.release();
    }
  },

  resetPasswordService: async (token, userPassword) => {
    const dbClient = await dbConnPool.connect();
    try {
      const user = await usersDal.resetPasswordDal(dbClient, token);
      if (!user || (new Date() > user.resetTokenExpireAt)) {
        throw new Error('BAD_REQUEST');
      }
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      await usersDal.updateUserPasswordDal(dbClient, hashedPassword, user.userEmail);
    } finally {
      dbClient.release();
    }
  },
};
