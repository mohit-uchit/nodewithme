const moment = require('moment');

/**
 * Format the date in the provided format.
 * @param {string} date The date in UTC format.
 * @param {string} dateFormat The desired date format.
 * @returns {string} Converted date in the desired format.
 */
const formatDate = (date, dateFormat) => {
  return moment(date).format(dateFormat);
};

module.exports = {
  formatDate,
};
