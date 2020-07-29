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

    this.tableId = tableId;

    // initiates a round
    this.initRound();
  }

  // initiates the round dealing cards to all players and community cards
  initRound() {
    // deal 2 cards for each player
    this.players.forEach((player) => {
      const handCards = this.dealer.dealAmountOfCards(2);
      // store player cards on player object
      player.cards = handCards;
      // send player card to players socket
      player.socket.emit('handCards', handCards);
    });

    // deal communitycards
    this.communityCards = this.dealer.dealAmountOfCards(5);

    // send community cards to all players
    this.players.forEach((player) => {
      player.socket.emit('broadcast', {
        type: 'communityCards',
        cards: this.communityCards,
        message: 'round starting',
      });
    });

    // start round by asking decision
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

  // returns an object containing the id and credits of each player
  getPlayerCredits() {
    return this.players.map((player) => {
      return {
        id: player.id,
        credits: player.credits,
      };
    });
  }

  // sends an object to each connected player containing his credits, the pot and all other players credits
  sendCredits() {
    this.players.forEach((player) => {
      const credits = {
        playerCredits: player.credits,
        pot: this.pot,
        tablePlayerCredits: this.getPlayerCredits(),
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
      message: 'your turn!',
    });
  }

  // checks if we have a possible end game
  checkEndGame() {
    if (this.players.length === 1) {
      return true;
    }

    if (this.equalBets() && this.playerBets.length === this.players.length) {
      return true;
    }

    return false;
  }
}

module.exports = Round;
