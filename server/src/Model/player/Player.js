const isValidPlayer = require('../validators/player/isValidPlayer');
const generateID = require('../../Vendor/generateID');

class Player {
  constructor(name, socket) {
    if (!isValidPlayer({ name })) {
      throw new TypeError('Player class does not meet the requirements!');
    }

    this.name = name;
    this.id = generateID();
    this.socket = socket;
    this.cards;
    this.credits = 0;
    this.bet = 0;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    return (this.name = name);
  }

  getPlayerID() {
    return this.id;
  }
}

module.exports = Player;
