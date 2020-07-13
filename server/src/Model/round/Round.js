const Dealer = require('../dealer/Dealer');
const { any } = require('../../Constants/playerActions');
const handleDecider = require('../../Helpers/handleDecider');

class Round {
  constructor(players, decider, tableId) {
    // holds all active players
    this.players = players;

    // holds our dealer
    this.dealer = new Dealer();

    // holds the pot
    this.pot = 0;

    // check if the round is running
    this.roundStarted = false;

    // hold the current decider
    this.currentDecider = decider;

    // holds minimum bet
    this.minimumBet = 50;

    // hold the current bet, if there is a call this will be added to pot
    this.currentBet = 0;

    // holds the players bets
    this.playerBets = [];

    // this.io = io;

    this.tableId = tableId;

    // initiates a round
    this.initRound();
  }

  // initiates the round dealing cards to all players and community cards
  initRound() {
    this.players.forEach((player) => {
      const handCards = this.dealer.dealAmountOfCards(2);
      // store player cards on player object
      player.cards = handCards;
      // send player card to players socket
      player.socket.emit('handCards', handCards);
    });

    // send community cards to all sockets (can be room broadcast)
    this.communityCards = this.dealer.dealAmountOfCards(5);

    // dirty fix
    this.players[0].socket.emit('broadcast', {
      type: 'communityCards',
      cards: this.communityCards,
    });

    this.players[0].socket.to(this.tableId).emit('broadcast', {
      type: 'communityCards',
      cards: this.communityCards,
    });

    this.askDecision();
  }

  // checks if all bets are equal
  equalBets() {
    return this.playerBets.every((val, i, arr) => val === arr[0]);
  }

  // returns all active players
  getActivePlayers() {
    return this.players;
  }

  // returns the communityCards
  getCommunityCards() {
    return this.communityCards;
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

  sendCredits() {
    this.players.forEach((player) => {
      const credits = {
        playerCredits: player.credits,
        pot: this.pot,
      };

      player.socket.emit('credits', credits);
    });
  }

  // handles the current decider. Will increment if previous made decision or
  // back to 0 if everyone decided.
  handleCurrentDecider() {
    this.currentDecider = handleDecider(
      this.currentDecider,
      this.players.length
    );
    return;
  }

  // handles the emit to the current decider
  askDecision() {
    const currentPlayer = this.players[this.currentDecider];

    currentPlayer.socket.emit('decision', {
      actions: any,
    });
  }

  // checks if we have a possible end game
  checkEndGame() {
    if (this.activePlayers === 1) {
      return true;
    }

    if (this.equalBets() && this.playerBets.length === this.players.length) {
      return true;
    }

    return false;
  }
}

module.exports = Round;
