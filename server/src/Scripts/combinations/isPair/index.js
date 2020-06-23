const findMax = require('../findMax');

module.exports = isPair = countedCards => {
  // check for pair
  if (findMax(countedCards) === 2) {
    return true;
  }

  return false;
};
