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
    this.bigBlind = 50;

    // hold the current bet, if there is a call this will be added to pot
    this.currentBet = 0;

    // hold big blind (player id)
    this.currentBigBlind = 0;

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

    this.handleBigBlind();

    this.sendCredits();

    this.askDecision();
  }

  // checks if all bets are equal
  equalBets() {
    return this.playerBets.every((val, i, arr) => val === arr[0]);
  }

  addToPot(amount) {
    this.pot += amount;
  }

  // returns all active players
  getActivePlayers() {
    return this.players;
  }

  // returns the communityCards
  getCommunityCards() {
    return this.communityCards;
  }

  hasBets() {
    return this.playerBets.length > 0;
  }

  getHighestBet() {
    return this.playerBets.reduce((a, b) => {
      return Math.max(a, b);
    });
  }

  handleBigBlind() {
    if (this.currentDecider === this.players.length - 1) {
      this.players[0].credits -= this.bigBlind;
      this.currentBigBlind = this.players[0].id;
    } else {
      this.players[this.players.length - 1].credits -= this.bigBlind;
      this.currentBigBlind = this.players[this.players.length - 1].id;
    }
    this.pot += this.bigBlind;
  }

  isBigBlind(playerId) {
    return playerId === this.currentBigBlind;
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

    // console.log('equal bets: ' + this.equalBets());
    console.log('current bet: ' + this.currentBet);
    this.players.forEach((player) =>
      console.log(player.name + ' credits:' + player.credits)
    );
    console.log('bets array: ' + this.playerBets);
    console.log('lengte van player bets: ' + this.playerBets.length);
    console.log('aantal spelers: ' + this.players.length);
    console.log('raise amount: ' + this.raiseAmount);

    // TODO:
    // check for all in players -> equalize there bet
    // check all players if they have gone all in

    // if they went all in equalize there bet inside the betarr to the highest bet

    // tho if they win, they win the full pot.. maybe a later fix

    if (this.equalBets() && this.playerBets.length === this.players.length) {
      return true;
    }

    return false;
  }
}

module.exports = Round;
