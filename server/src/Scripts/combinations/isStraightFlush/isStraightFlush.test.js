const isStraightFlush = require('./index');
const countSuits = require('../countSuits');

describe('test if given array contains the combination flush', () => {
  test('Object contains a flush and a straight, result should be a true', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 3, suit: 'Diamonds' },
      { value: 4, suit: 'Diamonds' },
      { value: 10, suit: 'Clubs' },
      { value: 11, suit: 'Clubs' },
      { value: 12, suit: 'Clubs' },
      { value: 13, suit: 'Clubs' },
    ];

    expect(isStraightFlush(cards, countSuits(cards))).toEqual(true);
  });

  test('Object contains a flush but no straight, result should be a false', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 12, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 5, suit: 'Clubs' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' },
    ];

    expect(isStraightFlush(cards, countSuits(cards))).toEqual(false);
  });

  test('Object contains a straight but no flush, result should be a false', () => {
    const cards = [
      { value: 6, suit: 'Diamonds' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Hearts' },
      { value: 5, suit: 'Spades' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' },
    ];

    expect(isStraightFlush(cards, countSuits(cards))).toEqual(false);
  });

  test('Object contains no flush or straight, result should be false', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 10, suit: 'Clubs' },
      { value: 1, suit: 'Clubs' },
      { value: 12, suit: 'Hearts' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' },
    ];

    expect(isStraightFlush(cards, countSuits(cards))).toEqual(false);
  });
});
