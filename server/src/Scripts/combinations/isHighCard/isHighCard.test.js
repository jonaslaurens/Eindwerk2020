const isHighCard = require('./index');
const countCards = require('../countCards');

describe('test if given array contains the combination pair', () => {
  test('Result should be the highest card', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 2, suit: 'Hearts' },
      { value: 13, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Diamonds' }
    ];

    const countedCards = countCards(cards);

    expect(isHighCard(countedCards)).toEqual(13);
  });

  test('Result should be the highest card', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 1, suit: 'Clubs' },
      { value: 1, suit: 'Clubs' },
      { value: 1, suit: 'Hearts' },
      { value: 1, suit: 'Hearts' },
      { value: 1, suit: 'Clubs' },
      { value: 1, suit: 'Diamonds' }
    ];

    const countedCards = countCards(cards);

    expect(isHighCard(countedCards)).toEqual(14);
  });

  test('Result should be the highest card', () => {
    const cards = [
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Hearts' },
      { value: 2, suit: 'Hearts' },
      { value: 2, suit: 'Clubs' },
      { value: 2, suit: 'Diamonds' }
    ];

    const countedCards = countCards(cards);

    expect(isHighCard(countedCards)).toEqual(2);
  });
});
