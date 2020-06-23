const calculate = require('./calculate');

describe('Test if calculate correctly handles different scenarios', () => {
  test('Should be a high card', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    const result = 'high card';

    expect(calculate(cards).name).toEqual(result);
  });

  test('Should be a pair', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 3, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    const result = 'pair';

    expect(calculate(cards).name).toEqual(result);
  });

  test('Should be two pair', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 3, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 2, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    const result = 'two pair';

    expect(calculate(cards).name).toEqual(result);
  });

  test('Should be a three of a kind', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 3, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 3, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    const result = 'three of a kind';

    expect(calculate(cards).name).toEqual(result);
  });

  test('Should be a straight', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Hearts' },
      { value: 5, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    const result = 'straight';

    expect(calculate(cards).name).toEqual(result);
  });

  test('Should be a flush', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Clubs' },
      { value: 7, suit: 'Clubs' },
      { value: 8, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    const result = 'flush';

    expect(calculate(cards).name).toEqual(result);
  });

  test('Should be full house', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 3, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 2, suit: 'Diamonds' },
      { value: 2, suit: 'Hearts' }
    ];

    const result = 'full house';

    expect(calculate(cards).name).toEqual(result);
  });

  test('Should be a four of a kind', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 3, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 3, suit: 'Diamonds' },
      { value: 3, suit: 'Spades' }
    ];

    const result = 'four of a kind';

    expect(calculate(cards).name).toEqual(result);
  });

  test('Should be a straight flush', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Clubs' },
      { value: 4, suit: 'Clubs' },
      { value: 5, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    const result = 'straight flush';

    expect(calculate(cards).name).toEqual(result);
  });

  test('Should be a royal flush', () => {
    const cards = [
      { value: 1, suit: 'Clubs' },
      { value: 10, suit: 'Clubs' },
      { value: 11, suit: 'Clubs' },
      { value: 12, suit: 'Clubs' },
      { value: 13, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' }
    ];

    const result = 'royal flush';

    expect(calculate(cards).name).toEqual(result);
  });
});
