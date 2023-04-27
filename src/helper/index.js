const sendMail = require('../utils/email');

module.exports = {
  checkPrice: (userName, userEmail, category, currentStockPrice, alertPrice, companyName) => {
    if (category === 'High' && currentStockPrice >= alertPrice) {
      // console.info('High Send email: ', userEmail);
      sendMail(userName, userEmail, companyName, category, currentStockPrice);
      return true;
    }
    if (category === 'Low' && currentStockPrice <= alertPrice) {
      // console.info('Low Send email: ', userEmail, category, currentStockPrice);
      sendMail(userName, userEmail, companyName, category, currentStockPrice);
      return true;
    }
    return false;
  }
};
