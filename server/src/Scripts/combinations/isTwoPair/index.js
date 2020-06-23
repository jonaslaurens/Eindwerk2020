module.exports = isTwoPair = countedCards => {
  // filter the countedCards array to only include values greater than or equal to 2
  const indexes = countedCards.filter(current => {
    return current >= 2;
  });

  // if the length of the indexes is equal to 2, it means we have 2 pairs,
  if (indexes.length >= 2) return true;

  // return false if no 2 pair are found
  return false;
};
