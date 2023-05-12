const express = require('express');
const stocksController = require('./stocks.controller');
const { validate } = require('../../lib/expressValidation');
const validation = require('./stocks.validation');
const { auth } = require('../../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /portfolio/stocks/searchStock:
 *   get:
 *     tags:
 *       - Stocks
 *     summary: To return all available stocks name and symbol.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         required: true
 *         name: symbol
 *         schema:
 *           type: string
 *           example: AFISX
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/stocks/res.json#searchStock'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/searchStock')
  .get(
    auth,
    validate(validation.searchStock),
    stocksController.searchStock
  );

/**
 * @swagger
 * /portfolio/stocks/addStock/{userId}:
 *   post:
 *     tags:
 *       - Stocks
 *     summary: Add new stock
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         required: true
 *         name: symbol
 *         schema:
 *           type: string
 *           example: AFISX
 *       - in: path
 *         required: true
 *         name: userId
 *         schema:
 *           type: integer
 *           example: 3
 *       - in: body
 *         name: stock
 *         schema:
 *           $ref: 'components/stocks/req.json#addStock'
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/stocks/res.json#addStock'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/addStock/:userId')
  .post(
    auth,
    validate(validation.addStock),
    stocksController.addStock
  );

/**
 * @swagger
 * /portfolio/stocks/stock-chart:
 *   get:
 *     tags:
 *       - Stocks
 *     summary: To return all history of stock
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         required: true
 *         name: symbol
 *         schema:
 *           type: string
 *           example: AFISX
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/stocks/res.json#stock-chart'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/stock-chart')
  .get(
    auth,
    validate(validation.stockChart),
    stocksController.stockChart
  );

/**
 * @swagger
 * /portfolio/stocks/getStocks/{userId}:
 *   get:
 *     tags:
 *       - Stocks
 *     summary: To return all existing stocks
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         required: true
 *         name: userId
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/stocks/res.json#getStocks'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/getStocks/:userId')
  .get(
    auth,
    validate(validation.getStocks),
    stocksController.getStocks
  );

/**
 * @swagger
 * /portfolio/stocks/getStockAnalysis:
 *   get:
 *     tags:
 *       - Stocks
 *     summary: To return analysis stock
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         required: true
 *         name: symbol
 *         schema:
 *           type: string
 *           example: HMCA
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/stocks/res.json#getStockAnalysis'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/getStockAnalysis')
  .get(
    auth,
    validate(validation.getStockAnalysis),
    stocksController.getStockAnalysis
  );

/**
 * @swagger
 * /portfolio/stocks/deleteStock/{userId}:
 *   delete:
 *     tags:
 *       - Stocks
 *     summary: To delete stock
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         required: true
 *         name: userId
 *         schema:
 *           type: integer
 *           example: 3
 *       - in: query
 *         required: true
 *         name: symbol
 *         schema:
 *           type: string
 *           example: AFISX
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/stocks/res.json#deleteStock'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/deleteStock/:userId')
  .delete(
    auth,
    validate(validation.deleteStock),
    stocksController.deleteStock
  );

/**
 * @swagger
 * /portfolio/stocks/addTrigger/{stockId}:
 *   post:
 *     tags:
 *       - Stocks
 *     summary: Add new trigger on stock
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         required: true
 *         name: stockId
 *         schema:
 *           type: integer
 *           example: 3
 *       - in: body
 *         schema:
 *         $ref: 'components/stocks/req.json#addTrigger'
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/stocks/res.json#addTrigger'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/addTrigger/:stockId')
  .post(
    auth,
    validate(validation.addTrigger),
    stocksController.addTrigger
  );

/**
 * @swagger
 * /portfolio/stocks/getTriggers:
 *   get:
 *     tags:
 *       - Stocks
 *     summary: Get all triggers
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
 *           $ref: 'components/stocks/res.json#getTriggers'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/getTriggers')
  .get(
    auth,
    stocksController.getTriggers
  );

/**
 * @swagger
 * /portfolio/stocks/deleteTrigger{stockId}:
 *   delete:
 *     tags:
 *       - Stocks
 *     summary: Delete Trigger
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         required: true
 *         name: stockId
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/stocks/res.json#deleteTrigger'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/deleteTrigger/:stockId')
  .delete(
    auth,
    validate(validation.deleteTrigger),
    stocksController.deleteTrigger
  );
module.exports = router;
