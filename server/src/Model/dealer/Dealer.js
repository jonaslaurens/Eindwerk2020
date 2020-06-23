const Deck = require('../deck/Deck');
const generateID = require('../../Vendor/generateID');

class Dealer {
  constructor() {
    // add id to our dealer for future reference
    this.id = generateID();

    // initialize deck
    this.deck = new Deck().deck;

    // holds dealt cards
    this.dealtCards = [];

    // shuffle the created deck
    this.shuffleDeck();
  }

  // puts the deck in a random order
  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
    return this.deck;
  }

  // removes a card from the deck and puts it in the dealtCards array then the removed card will be returned
  dealCard() {
    const dealtCard = this.deck.pop();
    this.dealtCards.push(dealtCard);
    return dealtCard;
  }

  dealAmountOfCards(amount) {
    const newHand = [];
    for (let i = 0; i < amount; i++) {
      newHand.push(this.dealCard());
    }
    return newHand;
  }
}

module.exports = Dealer;
