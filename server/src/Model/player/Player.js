const generateID = require('../../Vendor/generateID');

class Player {
  constructor(name, socket) {
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

  toObject() {
    return {
      name: this.name,
      id: this.id,
      credits: this.credits,
    };
  }
}

module.exports = Player;
