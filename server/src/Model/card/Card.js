const isValidCard = require('../validators/card/isValidCard');

/**
 * Creates an instance of the Card model
 * @class Card model
 * @constructor
 * @param {number} value - A value for the card
 * @param {string} suit - A suit for the card
 *
 *
 * @requires isValidCard
 * @see {@link module:validation/isValidCard|Card validator}
 */
class Card {
  constructor(value, suit) {
    if (!isValidCard({ value, suit })) {
      throw new TypeError('Card class does not meet the requirements!');
    }

    /** @property {number} value - Contains the value of the card */
    this.value = value;

    /**@property {string} suit - Contains the suit of the card */
    this.suit = suit;
  }

  /**
   * @property {function} getValue returns the value of the card
   */
  getValue() {
    return this.value;
  }

  /**
   * @property {function} getSuit returns the suit of the card
   */
  getSuit() {
    return this.suit;
  }
}

module.exports = Card;
