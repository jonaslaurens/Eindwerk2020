const isValidWallet = require('../validators/wallet/isValidWallet');
const isValidAmount = require('../validators/amount/isValidAmount');

/**
 * @description Creates an instance of Wallet.
 * @param { Number } playerId contains the id of the wallet
 * @param { String } credits contains the credits of the wallet
 */
class Wallet {
  constructor(playerId, credits) {
    if (!isValidWallet({ playerId, credits })) {
      throw new TypeError('Invalid wallet');
    }
    this.playerId = playerId;
    this.credits = credits;
  }

  //returns the id of the wallet
  getWalletPlayerId() {
    return this.playerId;
  }

  //returns the credits of the wallet
  getCredits() {
    return this.credits;
  }

  //adds an amount of credits to the credits property
  addCredits(amount) {
    if (!isValidAmount(amount)) {
      throw new TypeError('Invalid amount');
    }

    this.credits += amount;
  }

  //substracts an amount of credits of the credits property
  substractCredits(amount) {
    if (!isValidAmount(amount)) {
      throw new TypeError('Invalid amount');
    }

    this.credits -= amount;
  }
}

module.exports = Wallet;
