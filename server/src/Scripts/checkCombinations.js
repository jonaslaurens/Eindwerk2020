const calculate = require('./calculate/calculate');
const createSet = require('./combinations/createSet');

module.exports = checkCombination = cards => {
  let best = {
    name: 'Nothing',
    value: 0
  };

  const sets = createSet(cards, 5);
  sets.forEach(set => {
    const result = calculate(set);
    if (best.value < result.value) {
      best = result;
    }
  });

  return best;
};
