const Dealer = require('./Dealer');
const Deck = require('../deck/Deck');
const Card = require('../card/Card');

describe('Dealer', () => {
  test('Dealer should be instantiated', () => {
    expect(new Dealer()).toBeInstanceOf(Dealer);
  });

  test('Dealer should create a deck containing Card objects', () => {
    const dealer = new Dealer();
    const deck = new Deck();

    const dealerCards = dealer.deck.every((card) => card instanceof Card);

    const deckCards = deck.deck.every((card) => card instanceof Card);

    expect(dealerCards).toEqual(deckCards);
  });

  test('Dealer should create a deck containing 52 Card objects', () => {
    const dealer = new Dealer();
    const deck = new Deck();

    expect(dealer.deck.length).toEqual(deck.deck.length);
  });

  test('Dealer should deal a card', () => {
    const dealer = new Dealer();

    const res = dealer.dealCard();

    expect(res).toBeInstanceOf(Card);
  });

  test('Dealer should deal 4 cards', () => {
    const dealer = new Dealer();

    const res = dealer.dealAmountOfCards(4);

    expect(res.length).toEqual(4);
  });
});
