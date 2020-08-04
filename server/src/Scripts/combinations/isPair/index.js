const findMax = require('../findMax');

module.exports = isPair = (countedCards, amount) => {
  // check for a pair of the amount given in param
  if (findMax(countedCards) === amount) {
    return true;
  }

  return false;
};
