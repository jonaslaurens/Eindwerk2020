const Card = require('../card/Card');
const SUITS = require('../../Constants/suits');
const VALUES = require('../../Constants/values');

class Deck {
  constructor() {
    this.deck = [];
    this.createDeck();
  }

  getDeck() {
    return this.deck;
  }

  /**
   * @description creates a new deck of cards
   */
  createDeck() {
    SUITS.forEach((suit) => {
      Object.entries(VALUES).forEach((value) => {
        const newCard = new Card(value[1], suit);
        this.deck.push(newCard);
      });
    });
  }
}

module.exports = Deck;
