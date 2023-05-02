const nodemailer = require('nodemailer');
const { smtpEthernal } = require('../constant/index');

const sendMail = async (userName, userEmail, SUBJECT, TEXT, HTML) => {
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
    subject: SUBJECT,
    text: TEXT,
    html: HTML
  });

  console.info('Email Sent', info);
  return true;
};

module.exports = sendMail;
