const isPair = require('./index');

describe('test if given array contains the combination pair', () => {
  test('Result should be a true', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 2, suit: 'Hearts' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' }
    ];

    expect(isPair(cards)).toEqual(true);
  });

  test('Result should be false', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 10, suit: 'Clubs' },
      { value: 1, suit: 'Clubs' },
      { value: 12, suit: 'Hearts' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' }
    ];

    expect(isPair(cards)).toEqual(false);
  });
});