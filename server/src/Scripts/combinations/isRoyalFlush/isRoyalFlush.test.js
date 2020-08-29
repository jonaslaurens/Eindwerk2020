const isRoyalFlush = require('./index');
const countCards = require('../countCards');
const countSuits = require('../countSuits');

describe('test if given array contains the combination royal flush', () => {
  test('Result should be a true', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 3, suit: 'Diamonds' },
      { value: 4, suit: 'Diamonds' },
      { value: 10, suit: 'Clubs' },
      { value: 11, suit: 'Clubs' },
      { value: 12, suit: 'Clubs' },
      { value: 13, suit: 'Clubs' },
    ];

    expect(isRoyalFlush(cards, countCards(cards), countSuits(cards))).toEqual(
      true
    );
  });

  test('Result should be a false, we only hit a straight flush', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 3, suit: 'Diamonds' },
      { value: 8, suit: 'Clubs' },
      { value: 10, suit: 'Clubs' },
      { value: 11, suit: 'Clubs' },
      { value: 12, suit: 'Clubs' },
      { value: 9, suit: 'Clubs' },
    ];

    expect(isRoyalFlush(cards, countCards(cards), countSuits(cards))).toEqual(
      false
    );
  });

  test('Result should be false', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' },
      { value: 10, suit: 'Clubs' },
      { value: 12, suit: 'Hearts' },
      { value: 13, suit: 'Hearts' },
    ];

    expect(isRoyalFlush(cards, countCards(cards), countSuits(cards))).toEqual(
      false
    );
  });
});
