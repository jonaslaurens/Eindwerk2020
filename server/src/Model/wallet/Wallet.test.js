const Wallet = require('./Wallet');
const newWallet = new Wallet(123456, 1000);

describe('Create Wallet', () => {
  test('Wallet should be instantiated', () => {
    expect(new Wallet(1, 1000)).toBeInstanceOf(Wallet);
  });

  test('Wallet should be created', () => {
    expect(new Wallet(123456, 1000)).toEqual(newWallet);
  });

  test('Wallet id should be returned', () => {
    expect(newWallet.getWalletPlayerId()).toEqual(123456);
  });

  test('Wallet credits should be returned', () => {
    expect(newWallet.getCredits()).toEqual(1000);
  });

  test('Wallet credits cannot be of type String', () => {
    expect(() => {
      new Wallet(654321, 'Jonas');
    }).toThrow(TypeError);
  });

  test('Wallet credits should be added', () => {
    newWallet.addCredits(500);
    expect(newWallet.getCredits()).toEqual(1500);
  });

  test('Wallet credits should be substracted', () => {
    newWallet.substractCredits(200);
    expect(newWallet.getCredits()).toEqual(1300);
  });
});
