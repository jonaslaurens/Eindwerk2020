const generateID = require('../../Vendor/generateID');
const Player = require('../player/Player');
const Round = require('../round/Round');
const handleDecider = require('../../Helpers/handleDecider');

const Dealer = require('../dealer/Dealer');

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
    this.higestHand = 'high card';

    // start on next player every new round
    this.previousStarter = 0;
  }

  getCards() {
    const dealer = new Dealer();

    const player = dealer.dealAmountOfCards(2);
    const community = dealer.dealAmountOfCards(5);

    return {
      player,
      community,
    };
  }

  hasAvailableSpots() {
    return this.players.length < this.playerLimit;
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

  // start a game
  startGame(io, socket) {
    // check if we have enough players
    if (this.players.length <= 1) {
      return socket.emit('casinoError', {
        msg: 'Not enough players to start the game',
      });
    }

    // check if there is a round in progress
    if (this.currentRound) {
      return socket.emit('casinoError', {
        msg: 'Round in progress, new one will begin shortly',
      });
    }

    // create new array of our players that are gonna play a game
    const playingPlayers = this.players.map((player) => player);

    // start new round with current players
    this.currentRound = new Round(
      playingPlayers,
      this.previousStarter,
      io,
      this.id
    );

    // handle previous starter so we allways have a new first decider
    this.previousStarter = handleDecider(
      this.previousStarter,
      this.players.length
    );
  }

  broadcast(playerId) {
    if (this.players.length === 1) return;

    this.players.forEach((player) => {
      if (player.id !== playerId) {
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
      }
    });
  }

  broadcast() {
    if (this.players.length === 1) return;

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
