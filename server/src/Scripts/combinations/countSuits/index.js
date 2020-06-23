/**
 * @description returns object with the amount a certain suit is counted inside the cards array
 * @param { array } cards contains an array of cards
 *
 * @returns {object} contains how much a certain suit is present in the cards
 */
module.exports = countSuits = cards => {
  // create object
  let counts = {};

  // create key value pairs determined by the suits contained in array
  for (let i = 0; i < cards.length; i++) {
    const currentSuit = cards[i].suit;
    counts[`${currentSuit}`] = 0;
  }

  // count suits inside cards array and add them to newly created object
  for (let i = 0; i < cards.length; i++) {
    const currentSuit = cards[i].suit;
    counts[currentSuit] += 1;
  }

  // returns object with key = suit and value = times suit is occurring in cards array
  return counts;
};
