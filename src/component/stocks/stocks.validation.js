const Joi = require('joi');

module.exports = {
  searchStock: {
    query: Joi.object({
      symbol: Joi.string().required()
    })
  },
  addStock: {
    query: Joi.object({
      symbol: Joi.string().required()
    }),
    params: Joi.object({
      userId: Joi.number().required()
    }),
    body: Joi.object({
      companyName: Joi.string().required()
    })
  },
  stockChart: {
    query: Joi.object({
      symbol: Joi.string().required()
    })
  },
  getStocks: {
    params: Joi.object({
      userId: Joi.number().required()
    }),
  },
  deleteStock: {
    query: Joi.object({
      symbol: Joi.string().required()
    }),
    params: Joi.object({
      userId: Joi.number().required()
    }),
  },
  addTrigger: {
    params: Joi.object({
      stockId: Joi.number().required()
    }),
    body: Joi.object({
      category: Joi.string().valid('High', 'Low').required(),
      alertPrice: Joi.number().required(),
    })
  },
  deleteTrigger: {
    params: Joi.object({
      stockId: Joi.number().required()
    })
  }
};
