const COMBINATIONS = require('../Constants/combinations');

const getCombinationIndex = combination => {
  return COMBINATIONS.findIndex(combo => combo === combination);
};

module.exports = getCombinationIndex;
