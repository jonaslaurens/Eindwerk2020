const createSet = require('./index');

describe('Test if createSet gives the expected result', () => {
  /**
   *  Result should be 21 cause out of 7 cards we can get 21 possible combinations with a length of 5 cards
   */
  test('Result should be a 21', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' },
    ];

    const result = createSet(cards, 5);
    expect(result.length).toEqual(21);
  });

  /**
   * Result should be 1 cause out of 7 cards we can get only 1 possible combination with a length of 7 cards
   */
  test('Result should be a 1', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' },
    ];

    const result = createSet(cards, 7);
    expect(result.length).toEqual(1);
  });

  /**
   * Result should be 7 cause out of 7 cards we can get 7 possible combination with a length of 6 cards
   */
  test('Result should be a 1', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' },
    ];

    const result = createSet(cards, 6);
    expect(result.length).toEqual(7);
  });
});
