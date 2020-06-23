const Player = require('../player/Player');
const Round = require('../round/Round');
const handleDecider = require('../../Helpers/handleDecider');

class Table {
  constructor(playerLimit) {
    // List of players (max 4 players)
    this.players = [];

    // check if there is a ongoing game
    this.gameStarted = false;

    // holds currentRound
    this.currentRound = null;

    // holds player limit
    this.playerLimit = playerLimit;

    // holds highest hand
    this.higestHand = 'high card';

    // start on next player every new round
    this.previousStarter = 0;
  }

  isFull() {
    return this.players.length === this.playerLimit;
  }

  getRound() {
    return this.currentRound;
  }

  /*
    Add players to table
    */
  addPlayer(player) {
    if (!(player instanceof Player)) {
      throw new TypeError('This is not a valid player');
    }

    if (this.isFull()) {
      throw new TypeError('There is no more room at the table');
    }

    // TODO: should be changed in future release so we start with player credits
    // give player 1000 starting credits
    player.credits = 1000;

    this.players.push(player);
  }

  // start a game
  startGame() {
    // check if we have enough players
    if (this.players.length <= 1) {
      throw new TypeError('Not enough players to start the game');
    }

    // check if there is a round in progress
    if (this.currentRound) {
      throw new TypeError('Round in progress, new one will begin shortly');
    }

    // create new array of our players that are gonna play a game
    const playingPlayers = this.players.map(player => player);

    // start new round with current players
    this.currentRound = new Round(playingPlayers, this.previousStarter);

    // handle previous starter so we allways have a new first decider
    this.previousStarter = handleDecider(
      this.previousStarter,
      this.players.length
    );
  }
}
module.exports = Table;
