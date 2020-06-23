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
    SUITS.forEach(suit => {
      Object.entries(VALUES).forEach(value => {
        const newCard = new Card(value[1], suit);
        this.deck.push(newCard);
      });
    });
  }

  /**
   *  @description shuffles the deck in random order.
   */
  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  /**
   * @description removes a card from the deck and gives it to the applicant
   * @returns { object } the card that has been dealt
   */
  dealCard() {
    const dealtCard = this.deck.pop();
    return dealtCard;
  }
}

module.exports = Deck;
