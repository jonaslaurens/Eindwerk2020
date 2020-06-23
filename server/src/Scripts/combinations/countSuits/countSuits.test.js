const countSuits = require('./index');

/**
 * Params are not tested in countSuits cause they where allready validated by `groupCards` before countSuits is called
 */
describe('Test if countSuits correctly handles the count of all cards', () => {
  test('Result should be of type object', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    expect(countSuits(cards)).toBeInstanceOf(Object);
  });

  test('Should return object containing the sum of all unique suits', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    const result = { Clubs: 4, Hearts: 2, Diamonds: 1 };

    expect(countSuits(cards)).toEqual(result);
  });

  test('Should return object containing the sum of all unique suits, even with less cards', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Diamonds' },
      { value: 3, suit: 'Clubs' }
    ];

    const result = { Clubs: 2, Diamonds: 1 };

    expect(countSuits(cards)).toEqual(result);
  });

  test('Should return object containing the sum of all unique suits', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Clubs' },
      { value: 10, suit: 'Clubs' }
    ];

    const result = { Clubs: 7 };

    expect(countSuits(cards)).toEqual(result);
  });
});
