const COMBINATIONS = require('../Constants/combinations');

module.exports = getCombinationIndex = (combination) => {
  return COMBINATIONS.findIndex((combo) => combo === combination);
};
