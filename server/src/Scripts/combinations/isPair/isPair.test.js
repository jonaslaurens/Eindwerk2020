const isPair = require('./index');
const countCards = require('../countCards');

describe('test if given array contains the combination pair', () => {
  test('We expect true cause we got a pair', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 2, suit: 'Hearts' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' },
    ];

    expect(isPair(countCards(cards), 2)).toEqual(true);
  });

  test('We expect false cause we got no pair', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 10, suit: 'Clubs' },
      { value: 1, suit: 'Clubs' },
      { value: 12, suit: 'Hearts' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' },
    ];

    expect(isPair(countCards(cards), 2)).toEqual(false);
  });

  test('We expect true cause we got 3 of a kind', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 2, suit: 'Hearts' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 2, suit: 'Diamonds' },
    ];

    expect(isPair(countCards(cards), 3)).toEqual(true);
  });

  test('We expect true cause we got quads', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 2, suit: 'Hearts' },
      { value: 2, suit: 'Spades' },
      { value: 4, suit: 'Clubs' },
      { value: 2, suit: 'Diamonds' },
    ];

    expect(isPair(countCards(cards), 4)).toEqual(true);
  });
});
