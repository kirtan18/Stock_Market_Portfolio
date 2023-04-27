const cron = require('node-cron');
const stocksService = require('../component/stocks/stocks.service');
const { cronJobTime } = require('../constant/index');

const getEmail = async () => {
  try {
    await stocksService.triggerPrice();
  } catch (error) {
    console.info(error);
  }
};

const createCronJob = (tm, task) => {
  const job = cron.schedule(tm, task, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
  });
  return job;
};

const scheduleJob = (tm, task) => {
  const job = createCronJob(tm, task);
  return job;
};

const cronJob = () => {
  const job = scheduleJob(cronJobTime.time, getEmail);
  return job;
};

module.exports = cronJob;
