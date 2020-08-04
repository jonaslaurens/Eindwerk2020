const decideWinner = require('./decideWinner');

describe('Tests decideWinner', () => {
  test('Winner should be Joe with highest pair', () => {
    const player1 = {
      name: 'Jack',
      cards: [
        { value: 9, suit: 'Hearts' },
        { value: 9, suit: 'Hearts' },
      ],
    };

    const player2 = {
      name: 'Joe',
      cards: [
        { value: 8, suit: 'Clubs' },
        { value: 8, suit: 'Clubs' },
      ],
    };

    const communityCards = [
      { value: 10, suit: 'Diamond' },
      { value: 11, suit: 'Diamond' },
      { value: 12, suit: 'Diamond' },
      { value: 13, suit: 'Diamond' },
      { value: 14, suit: 'Diamond' },
    ];

    const players = [player1, player2];
    const winner = decideWinner(players, communityCards);

    expect(winner.name).toEqual('Jack');
  });

  test('Winner should be Joe with 2 pair', () => {
    const player1 = {
      name: 'Jack',
      cards: [
        { value: 8, suit: 'Clubs' },
        { value: 4, suit: 'Clubs' },
      ],
    };

    const player2 = {
      name: 'Joe',
      cards: [
        { value: 9, suit: 'Clubs' },
        { value: 7, suit: 'Spades' },
      ],
    };

    const communityCards = [
      { value: 2, suit: 'Diamonds' },
      { value: 6, suit: 'Spades' },
      { value: 7, suit: 'Spades' },
      { value: 10, suit: 'Spades' },
      { value: 6, suit: 'Diamonds' },
    ];

    const players = [player1, player2];
    const winner = decideWinner(players, communityCards);

    expect(winner.name).toEqual('Joe');
  });

  test('Winner should be Jack with royal flush', () => {
    const player1 = {
      name: 'Jack',
      cards: [
        { value: 14, suit: 'Clubs' },
        { value: 13, suit: 'Clubs' },
      ],
    };

    const player2 = {
      name: 'Joe',
      cards: [
        { value: 9, suit: 'Clubs' },
        { value: 7, suit: 'Spades' },
      ],
    };

    const communityCards = [
      { value: 12, suit: 'Clubs' },
      { value: 11, suit: 'Clubs' },
      { value: 10, suit: 'Clubs' },
      { value: 10, suit: 'Spades' },
      { value: 6, suit: 'Diamonds' },
    ];

    const players = [player1, player2];
    const winner = decideWinner(players, communityCards);

    expect(winner.name).toEqual('Jack');
  });
});
