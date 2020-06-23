const isValidCard = require('../validators/card/isValidCard');

class Card {
  constructor(value, suit) {
    if (!isValidCard({ value, suit })) {
      throw new TypeError('Card class does not meet the requirements!');
    }

    this.value = value;

    this.suit = suit;
  }

  getValue() {
    return this.value;
  }

  getSuit() {
    return this.suit;
  }
}

module.exports = Card;
