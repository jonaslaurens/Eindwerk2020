module.exports = combinationValue = (cards, primary) => {
  let str = '';

  cards.forEach(card => {
    let value = card.value;
    let lowerValue = (value < 10 ? '0' : '') + value;
    str += lowerValue;
  });

  return primary * 10000000000 + parseInt(str);
};
