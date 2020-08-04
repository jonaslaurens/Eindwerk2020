const groupCards = require('./index');

describe('Test if groupCards correctly handles different scenarios', () => {
  test('Result should be false, because params cannot be of type string', () => {
    expect(groupCards('hello')).toEqual(false);
  });

  test('Result should be false, because params cannot be null', () => {
    expect(groupCards(null)).toEqual(false);
  });

  test('Result should be false, because params cannot be undefined', () => {
    expect(groupCards(undefined)).toEqual(false);
  });

  test('Result should be false, because params are empty', () => {
    expect(groupCards()).toEqual(false);
  });

  test('Result should be a array of all cards', () => {
    const testPlayer = {
      name: 'john',
      cards: [
        { value: 1, suit: 'Clubs' },
        { value: 2, suit: 'Clubs' },
      ],
    };

    const testCommunityCards = [
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Hearts' },
      { value: 10, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
    ];

    const result = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' },
    ];

    expect(groupCards(testPlayer.cards, testCommunityCards)).toEqual(result);
  });

  test('Result should be false because there are wrong keys inside the objects', () => {
    const testPlayer = {
      name: 'john',
      cards: [
        { wrongkey: 1, suit: 'Clubs' },
        { value: 2, suit: 'Clubs' },
      ],
    };

    const testCommunityCards = [
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Hearts' },
      { value: 10, wrongkey: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
    ];

    expect(groupCards(testPlayer.cards, testCommunityCards)).toEqual(false);
  });

  test('Result should be false because there are wrong values inside the objects', () => {
    const testPlayer = {
      name: 'john',
      cards: [
        { value: 'Clubs', suit: 'Clubs' },
        { value: 2, suit: 'Clubs' },
      ],
    };

    const testCommunityCards = [
      { value: 3, suit: 321 },
      { value: 4, suit: 'Hearts' },
      { value: 10, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
    ];

    expect(groupCards(testPlayer.cards, testCommunityCards)).toEqual(false);
  });
});
