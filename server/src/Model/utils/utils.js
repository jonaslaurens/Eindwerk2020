const SUITS = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
const VALUES = {
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Ten: 10,
  Jack: 11,
  Queen: 12,
  King: 13,
  Ace: 14
};

function generateID () {
  const uuidv4 = require('uuid/v4');
  generatedID = uuidv4();
  return generatedID
}

module.exports = { SUITS, VALUES , generateID };
