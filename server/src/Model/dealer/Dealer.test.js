const Dealer = require('./Dealer');

describe('Dealer', () => {
  test('Dealer should be instantiated', () => {
    expect(new Dealer()).toBeInstanceOf(Dealer);
  });
});
