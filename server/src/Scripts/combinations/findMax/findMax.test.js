const findMax = require('./index');

/**
 * Params are not tested in findMax cause they where allready validated by `groupCards` before findMax is called
 */
describe('Test if findMax correctly handles return of highest number inside array', () => {
  test('Result should be of type number', () => {
    const test = [1, 4, 15, 2, 7];

    const type = findMax(test);

    expect(typeof type).toEqual('number');
  });

  test('Should return the highest number', () => {
    const test = [1, 4, 15, 2, 7];

    expect(findMax(test)).toEqual(15);
  });

  test('Should return the highest number', () => {
    const test = [1, 4, 15, 2, 7, 0, 1654781];

    expect(findMax(test)).toEqual(1654781);
  });

  test('Should return highest card cause we pass true in the params, in this case it should be Ace with value of 14', () => {
    const test = [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1];

    expect(findMax(test, true)).toEqual(14);
  });

  test('Should return highest card cause we pass true in the params, in this case it should be 2', () => {
    const test = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    expect(findMax(test, true)).toEqual(2);
  });
});
