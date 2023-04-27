const stocksDal = require('./stocks.dal');
const { dbConnPool } = require('../../../config/db.config');
const { apiKey } = require('../../../config/index');
const helper = require('../../helper/index');

module.exports = {
  searchStockService: async (symbol) => {
    const URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`;
    const response = await fetch(URL);
    const data = await response.json();
    if (!data) {
      throw new Error('NOT_FOUND');
    }
    const result = data.bestMatches.map(item => ({
      symbol: item['1. symbol'],
      companyName: item['2. name']
    }));

    return result;
  },
  addStockService: async (userId, symbol, companyName) => {
    const dbClient = await dbConnPool.connect();
    try {
      const URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      const response = await fetch(URL);
      const data = await response.json();
      if (!data) {
        throw new Error('NOT_FOUND');
      }
      const price = Math.round(Number(data['Global Quote']['05. price']));
      const open = Math.round(Number(data['Global Quote']['02. open']));
      const high = Math.round(Number(data['Global Quote']['03. high']));
      const low = Math.round(Number(data['Global Quote']['04. low']));

      const parameters = [userId, symbol, companyName, price, open, high, low];
      const result = await stocksDal.addStockDal(dbClient, parameters);
      return result;
    } finally {
      dbClient.release();
    }
  },
  stockChartService: async (symbol) => {
    const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&TIME_SERIES_DAILY_ADJUSTED&apikey=${apiKey}`;
    const response = await fetch(URL);
    const data = await response.json();
    if (!data) {
      throw new Error('NOT_FOUND');
    }
    const storeData = [];
    const symbolName = data['Meta Data']['2. Symbol'];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const date in data['Time Series (Daily)']) {
      const temp = { date, open: data['Time Series (Daily)'][date]['1. open'], close: data['Time Series (Daily)'][date]['4. close'] };
      storeData.push(temp);
    }
    const result = { symbolName, dateWise: storeData };
    return result;
  },
  getStocksService: async (userId) => {
    const dbClient = await dbConnPool.connect();
    try {
      const parameter = [userId];
      const result = await stocksDal.getStocksDal(dbClient, parameter);
      return result.rows;
    } finally {
      dbClient.release();
    }
  },
  deleteStockService: async (userId, symbol) => {
    const dbClient = await dbConnPool.connect();
    try {
      const parameters = [userId, symbol];
      await stocksDal.deleteStockDal(dbClient, parameters);
    } finally {
      dbClient.release();
    }
  },
  // getCurrentStockPrice: async (symbol) => {
  //   const URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
  //   const response = await fetch(URL);
  //   const data = await response.json();
  //   return data['Global Quote']['05. price'];
  // },
  addTriggerService: async (stockId, category, alertPrice) => {
    const dbClient = await dbConnPool.connect();
    try {
      const parameters = [stockId, category, alertPrice];
      await stocksDal.addTriggerDal(dbClient, parameters);
    } finally {
      dbClient.release();
    }
  },
  getTriggersService: async () => {
    const dbClient = await dbConnPool.connect();
    try {
      const result = await stocksDal.getTriggersDal(dbClient);
      return result;
    } finally {
      dbClient.release();
    }
  },
  triggerPrice: async () => {
    const dbClient = await dbConnPool.connect();
    try {
      const triggerData = await stocksDal.getTriggersDal(dbClient);
      if (triggerData) {
        triggerData.forEach(async item => {
          const {
            stockId, symbol, companyName, category, alertPrice, userName, userEmail
          } = item;
          const URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
          const response = await fetch(URL);
          const data = await response.json();
          console.info(item);
          const currentStockPrice = Math.round(Number(data['Global Quote']['05. price']));
          const result = await helper.checkPrice(
            userName,
            userEmail,
            category,
            currentStockPrice,
            alertPrice,
            companyName,
          );
          if (result) {
            const parameter = [stockId];
            await stocksDal.deleteTriggerDal(dbClient, parameter);
          }
        });
      }
    } finally {
      dbClient.release();
    }
  }
};
