module.exports = {
  PostgreDbErrorCode: {
    FOREIGN_KEY_VIOLATION: '23503',
    UNIQUE_VIOLATION: '23505'
  },
  cronJobTime: {
    // Cronjob call api every 1 minute
    time: '0 */1 * * * *',
  },
  smtpEthernal: {
    user: 'lauretta.mayer@ethereal.email',
    pass: 'smDFJKBgwvN8DYRe1t'
  }
};
