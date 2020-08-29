const generateID = require('../../Vendor/generateID');
const Player = require('../player/Player');
const Round = require('../round/Round');
const handleDecider = require('../../Helpers/handleDecider');

class Table {
  constructor(playerLimit) {
    this.id = generateID();

    // List of players (max 4 players)
    this.players = [];

    // check if there is a ongoing game
    this.gameStarted = false;

    // holds currentRound
    this.currentRound = null;

    // holds player limit
    this.playerLimit = playerLimit;

    // holds highest hand
    this.highestHand = '';

    // start on next player every new round
    this.previousStarter = 0;

    this.grandWinner = '';
  }

  // returns bool to tell if there are free spots on the table
  hasAvailableSpots() {
    return this.players.length < this.playerLimit;
  }

  checkPlayerCredits() {
    return this.players.filter((player) => player.credits !== 0);
  }

  // returns the current round
  getRound() {
    return this.currentRound;
  }

  // returns the highest hand of the table
  getHighHand() {
    if (!this.highestHand) {
      return false;
    }
    return this.highestHand;
  }

  // sets the highest hand of the table
  setHighHand(hand) {
    this.highestHand = hand;
  }

  /*
    Add players to table
    */
  addPlayer(player) {
    if (!(player instanceof Player)) {
      throw new TypeError('This is not a valid player');
    }

    if (!this.hasAvailableSpots()) {
      throw new TypeError('There is no more room at the table');
    }

    // give player 1000 starting credits
    player.credits = 1000;

    this.players.push(player);
  }

  getSockets() {
    return this.players.map((player) => player.socket);
  }

  // start game when there are playerlimit is reached
  startGame() {
    // start new round with current players
    this.currentRound = new Round(
      this.checkPlayerCredits(),
      this.previousStarter,
      this.id
    );

    // handle previous starter so we allways have a new first decider
    this.previousStarter = handleDecider(
      this.previousStarter,
      this.players.length
    );
  }

  broadcast() {
    this.players.forEach((player) => {
      const data = {
        type: 'newPlayerAdded',
        table: {
          id: this.id,
          players: this.players
            .filter((currentPlayer) => currentPlayer.id !== player.id)
            .map((player) => {
              return {
                name: player.name,
                id: player.id,
                credits: player.credits,
              };
            }),
        },
      };
      player.socket.emit('broadcast', data);
    });
  }

  toObject(playerId) {
    if (this.players.length === 1) {
      return {
        id: this.id,
      };
    }

    return {
      id: this.id,
      players: this.players
        .filter((player) => player.id !== playerId)
        .map((player) => {
          return {
            name: player.name,
            id: player.id,
            credits: player.credits,
          };
        }),
    };
  }
}
module.exports = Table;
