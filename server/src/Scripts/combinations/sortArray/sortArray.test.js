const sortArray = require('./index');

describe('Test if sortArray correctly handles different scenarios', () => {
  test('Result should be false, because params are empty', () => {
    expect(sortArray()).toEqual(false);
  });

  test('Result should be a sorted array from high to low', () => {
    const arr = [3, 4, 10, 6, 8];

    const result = [10, 8, 6, 4, 3];

    expect(sortArray(arr, 'high')).toEqual(result);
  });

  test('Should fail because type of sort was high to low so it cannot be low to high', () => {
    const arr = [3, 4, 10, 6, 8];

    const result = [3, 4, 6, 8, 10];

    expect(sortArray(arr, 'high')).not.toBe(result);
  });

  test('Result should be a sorted array from low to high', () => {
    const arr = [3, 4, 10, 6, 8];

    const result = [3, 4, 6, 8, 10];

    expect(sortArray(arr, 'low')).toEqual(result);
  });

  test('Should fail because type of sort was low to high so it cannot be high to low', () => {
    const arr = [3, 4, 10, 6, 8];

    const result = [10, 8, 6, 4, 3];

    expect(sortArray(arr, 'high')).not.toBe(result);
  });

  test('Result should be a sorted array from low to high with object given as param', () => {
    const cards = [
      { value: 3, suit: 'Hearts' },
      { value: 4, suit: 'Hearts' },
      { value: 10, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 4, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
    ];

    const result = [
      { value: 2, suit: 'Clubs' },
      { value: 3, suit: 'Hearts' },
      { value: 4, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 10, suit: 'Hearts' },
    ];

    expect(sortArray(cards, 'lowObject')).toEqual(result);
  });

  test('Result should be a sorted array from high to low with object given as param', () => {
    const cards = [
      { value: 3, suit: 'Hearts' },
      { value: 4, suit: 'Hearts' },
      { value: 10, suit: 'Hearts' },
      { value: 6, suit: 'Clubs' },
      { value: 8, suit: 'Diamonds' },
      { value: 4, suit: 'Clubs' },
      { value: 2, suit: 'Clubs' },
    ];

    const result = [
      { value: 10, suit: 'Hearts' },
      { value: 8, suit: 'Diamonds' },
      { value: 6, suit: 'Clubs' },
      { value: 4, suit: 'Hearts' },
      { value: 4, suit: 'Clubs' },
      { value: 3, suit: 'Hearts' },
      { value: 2, suit: 'Clubs' },
    ];

    expect(sortArray(cards, 'highObject')).toEqual(result);
  });
});
