const Table = require('./Table');

const players = [
  {
    name: 'Jack',
    credits: 4000,
  },
  {
    name: 'Joe',
    credits: 0,
  },
  {
    name: 'William',
    credits: 0,
  },
  {
    name: 'Averelle',
    credits: 0,
  },
];

describe('Test table function checkPlayerCredits', () => {
  test('All players but one are bust', () => {
    const table = new Table(4);

    table.players = players;

    expect(table.checkPlayerCredits().length === 1).toEqual(true);
  });

  test('No players are bust', () => {
    const table = new Table(4);

    table.players = [
      {
        name: 'Jack',
        credits: 4000,
      },
      {
        name: 'Joe',
        credits: 10,
      },
      {
        name: 'William',
        credits: 10,
      },
      {
        name: 'Averelle',
        credits: 20,
      },
    ];

    expect(table.checkPlayerCredits().length > 0).toEqual(true);
  });

  test('Two players are bust', () => {
    const table = new Table(4);

    table.players = [
      {
        name: 'Jack',
        credits: 0,
      },
      {
        name: 'Joe',
        credits: 10,
      },
      {
        name: 'William',
        credits: 0,
      },
      {
        name: 'Averelle',
        credits: 20,
      },
    ];

    expect(table.checkPlayerCredits().length === 2).toEqual(true);
  });
});
