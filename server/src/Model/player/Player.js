const generateID = require('../../Vendor/generateID');

class Player {
  constructor(name) {
    this.name = name;
    this.id = generateID();
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
