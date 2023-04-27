const express = require('express');
const usersController = require('./users.controller');
const { validate } = require('../../lib/expressValidation');
const validation = require('./users.validation');
// const { verifyToken } = require('../../middleware/auth');

// const auth = verifyToken;
const router = express.Router();

router.route('/register')
  .post(
    validate(validation.register),
    usersController.registerUser
  );

router.route('/login')
  .get(
    validate(validation.login),
    usersController.loginUser
  );

module.exports = router;
