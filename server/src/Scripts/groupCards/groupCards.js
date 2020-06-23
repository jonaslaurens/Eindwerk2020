const sortArray = require('../combinations/sortArray');
const validateParams = require('../validation/validateParams');
/**
 * @description combines the cards of the player and the communitycards to 1 array needs to
 *              be called before any combination check can be done.
 * @param {object} playerCards contains the cards of the player
 * @param {object} communityCards containt the cards from table
 * @function sortArray sorts the newly created array from lowest value to highest
 *
 * @returns array of card objects sorted from lowest to highest value
 */
module.exports = groupCards = (playerCards, communityCards) => {
  if (!validateParams(playerCards) || !validateParams(communityCards))
    return false;

  const cards = [...playerCards, ...communityCards];
  return sortArray(cards, 'lowObject');
};
