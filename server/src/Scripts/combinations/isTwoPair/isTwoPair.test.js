const isTwoPair = require('./index');

describe('test if given array contains the combination flush', () => {
  test('Object contains two pair with 1 pair and 1 trips, result should be a true (actually full house)', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 5, suit: 'Clubs' },
      { value: 2, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 4, suit: 'Diamonds' }
    ];

    expect(isTwoPair(cards)).toEqual(true);
  });

  test('Object contains three pairs with 2 normal pairs and 1 trips, result should be a true (actually full house)', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 3, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 4, suit: 'Diamonds' }
    ];

    expect(isTwoPair(cards)).toEqual(true);
  });

  test('Object contains two pairs with 2 trips, result should be a true (actually full house)', () => {
    const cards = [
      { value: 4, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 4, suit: 'Diamonds' }
    ];

    expect(isTwoPair(cards)).toEqual(true);
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

    expect(isTwoPair(cards)).toEqual(false);
  });
});
