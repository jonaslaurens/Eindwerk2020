const isValidPlayer = require('../validators/player/isValidPlayer');

class Player {
  constructor(name, playerID, socket) {
    if (!isValidPlayer({ name, playerID })) {
      throw new TypeError('Player class does not meet the requirements!');
    }

    this.name = name;
    this.id = playerID;
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
