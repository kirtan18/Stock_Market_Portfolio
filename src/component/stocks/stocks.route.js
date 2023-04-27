const express = require('express');
const stocksController = require('./stocks.controller');
const { validate } = require('../../lib/expressValidation');
const validation = require('./stocks.validation');
// const { verifyToken } = require('../../middleware/auth');

// const auth = verifyToken;

const router = express.Router();

router.route('/searchStock')
  .get(
    validate(validation.searchStock),
    stocksController.searchStock
  );

router.route('/addStock/:userId')
  .post(
    validate(validation.addStock),
    stocksController.addStock
  );

router.route('/stock-chart')
  .get(
    validate(validation.stockChart),
    stocksController.stockChart
  );

router.route('/getStocks/:userId')
  .get(
    validate(validation.getStocks),
    stocksController.getStocks
  );

router.route('/deleteStock/:userId')
  .delete(
    validate(validation.deleteStock),
    stocksController.deleteStock
  );

router.route('/addTrigger/:stockId')
  .post(
    validate(validation.addTrigger),
    stocksController.addTrigger
  );

router.route('/getTriggers')
  .get(
    stocksController.getTriggers
  );
module.exports = router;
