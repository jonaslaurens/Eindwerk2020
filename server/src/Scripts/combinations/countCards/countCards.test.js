const countCards = require('./index');

/**
 * Params are not tested in countCards cause they where allready validated by `groupCards` before countCards is called
 */
describe('Test if countCards correctly handles the count of all cards', () => {
  test('Result should be of type array', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    const result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    expect(countCards(cards)).toBeInstanceOf(Array);
  });

  test('Result should be a array of all cards counted', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    const result = [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1];

    expect(countCards(cards)).toEqual(result);
  });

  test('All numbers 2 should be counted', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Hearts' },
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Diamonds' },
      { value: 2, suit: 'Hearts' }
    ];

    const result = [0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    expect(countCards(cards)).toEqual(result);
  });

  test('All numbers 2 should be counted', () => {
    const cards = [{ value: 2, suit: 'Clubs' }];

    const result = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    expect(countCards(cards)).toEqual(result);
  });

  test('All numbers 1 should be counted as an Ace, even with less cards', () => {
    const cards = [
      { value: 1, suit: 'Spades' },
      { value: 1, suit: 'Diamonds' },
      { value: 1, suit: 'Clubs' },
      { value: 1, suit: 'Hearts' }
    ];

    const result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4];

    expect(countCards(cards)).toEqual(result);
  });
});
