const sortArr = require('../sortArray');

module.exports = isFlush = (cards, countedSuits) => {
  // sort countedSuits based on values. If the first number is equal or greater than 5 we got a
  // flush else there is no flush
  return sortArr(Object.values(countedSuits), 'high')[0] >= 5 ? true : false;
};
