const nodemailer = require('nodemailer');
const { smtpEthernal } = require('../constant/index');

const sendMail = async (userName, userEmail, companyName, category, currentStockPrice) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: smtpEthernal.user,
      pass: smtpEthernal.pass
    }
  });

  const info = await transporter.sendMail({
    from: `${userName} ${smtpEthernal.user}`,
    to: userEmail,
    subject: `${companyName} has reached alertPrice`,
    text: `The stock price of ${companyName} has reached @${currentStockPrice}`,
    html: `The stock price of ${companyName} has reached @${currentStockPrice} 🤑`
  });

  console.info('Email Sent', info);
};

module.exports = sendMail;
