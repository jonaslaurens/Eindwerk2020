const Deck = require('./Deck');

describe('Deck', () => {
  test('Deck should be instantiated', () => {
    expect(new Deck()).toBeInstanceOf(Deck);
  });

  test('Deck should be returned', () => {
    const newDeck = new Deck();

    newDeck.createDeck();

    const createdDeck = newDeck.deck;

    expect(newDeck.getDeck()).toEqual(createdDeck);
  });

  test('Deck should be shuffled', () => {
    const newDeck = new Deck();
    const shuffledDeck = new Deck();

    newDeck.createDeck();
    shuffledDeck.createDeck();

    shuffledDeck.shuffleDeck();

    expect(shuffledDeck).not.toBe(newDeck);
  });

  test('Deal card should return a card', () => {
    const newDeck = new Deck();

    const newCard = { value: 14, suit: 'Clubs' };

    newDeck.createDeck();

    expect(newDeck.dealCard()).toEqual(newCard);
  });

  test('Deal all cards, deck should be empty', () => {
    const newDeck = new Deck();

    newDeck.createDeck();
    newDeck.shuffleDeck();

    const deckLength = newDeck.deck.length;

    for (let i = 0; i < deckLength; i++) {
      newDeck.dealCard();
    }

    expect(newDeck.deck.length).toEqual(0);
  });
});
