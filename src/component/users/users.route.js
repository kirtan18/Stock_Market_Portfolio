const express = require('express');
const usersController = require('./users.controller');
const { validate } = require('../../lib/expressValidation');
const validation = require('./users.validation');
const { auth } = require('../../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /portfolio/users/register:
 *   post:
 *     tags:
 *       - users
 *     summary: Register new user
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *          $ref: 'components/users/req.json#register'
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/users/res.json#register'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/register')
  .post(
    validate(validation.register),
    usersController.registerUser
  );

/**
 * @swagger
 * /portfolio/users/login:
 *   get:
 *     tags:
 *       - users
 *     summary: Login user
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *           $ref: 'components/users/req.json#login'
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/users/res.json#login'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/login')
  .get(
    validate(validation.login),
    usersController.loginUser
  );

/**
 * @swagger
 * /portfolio/users/token:
 *   get:
 *     tags:
 *       - users
 *     summary: Generate new token using refresh token
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *           $ref: 'components/users/req.json#token'
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/users/res.json#token'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/token')
  .get(
    validate(validation.getToken),
    usersController.getToken
  );

/**
 * @swagger
 * /portfolio/users/forgot:
 *   get:
 *     tags:
 *       - users
 *     summary: Forgot password and sent mail for reset password
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *           $ref: 'components/users/req.json#forgot'
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/users/res.json#forgot'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/forgot')
  .get(
    validate(validation.forgotPassword),
    usersController.forgotPassword
  );

/**
 * @swagger
 * /portfolio/users/reset:
 *   get:
 *     tags:
 *       - users
 *     summary: Reset password
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *           $ref: 'components/users/res.json#reset'
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/users/res.json#reset'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/reset')
  .get(
    validate(validation.resetPassword),
    usersController.resetPassword
  );

/**
 * @swagger
 * /portfolio/users/logout:
 *   get:
 *     tags:
 *       - users
 *     summary: Logout user
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/users/res.json#logout'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/logout')
  .get(
    auth,
    usersController.logoutUser
  );
module.exports = router;
