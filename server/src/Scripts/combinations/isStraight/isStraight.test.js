const isStraight = require('./index');
const countCards = require('../countCards');

describe('test if given array contains the combination straight', () => {
  test('Result should be a true', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Clubs' },
      { value: 6, suit: 'Hearts' },
      { value: 10, suit: 'Clubs' },
      { value: 11, suit: 'Diamonds' },
    ];

    expect(isStraight(countCards(cards))).toEqual(true);
  });

  test('Result should be true', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Diamonds' },
      { value: 5, suit: 'Clubs' },
      { value: 12, suit: 'Hearts' },
      { value: 13, suit: 'Hearts' },
    ];

    expect(isStraight(countCards(cards))).toEqual(true);
  });

  test('Result should be true', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 10, suit: 'Diamonds' },
      { value: 11, suit: 'Clubs' },
      { value: 12, suit: 'Hearts' },
      { value: 13, suit: 'Hearts' },
    ];

    expect(isStraight(countCards(cards))).toEqual(true);
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

    expect(isStraight(countCards(cards))).toEqual(false);
  });
});
