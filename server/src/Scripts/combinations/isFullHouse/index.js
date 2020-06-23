module.exports = isFullHouse = countedCards => {
  // will hold a bool if there is a pair or not inside the cards param
  let isPairHit = false;

  // will hold a bool if there is a trips or not inside the cards param
  let isTripsHit = false;

  // will hold the indexes of possible trips found in the cards param
  const indexes = [];

  // checks what the current number of the itteration is inside the countedCards array
  for (let i = 0; i < countedCards.length; i++) {
    // current number is equal to 2, then we got a pair
    if (countedCards[i] === 2) {
      isPairHit = true;
    }

    // current number is equal to 3, then we got trips
    if (countedCards[i] === 3) {
      isTripsHit = true;
      indexes.push(i);
    }
  }

  // if we got a pair and we got trips, we will have a fullhouse
  if (isPairHit && isTripsHit) return true;

  // if the length of the indexes is equal to 2, this means we have 2 trips.
  // if this is the case we will also have a fullhouse.
  if (indexes.length === 2) return true;

  return false;
};
