const decideWinner = require('../Scripts/decideWinner/decideWinner');

const getCombinationIndex = require('../Helpers/getCombinationIndex');
const getCombination = require('../Helpers/getCombination');
const getCurrentPlayer = require('../Helpers/getCurrentPlayer');

const logStuff = require('../../helpers/logStuff');
let gameNumber = 0;

const continueRound = (table, round) => {
  const { players, communityCards } = round;

  // handle the end of the game
  if (round.checkEndGame()) {
    logStuff(table, round, gameNumber);

    gameNumber++;

    // checkwinner
    const winner = decideWinner(players, communityCards);

    // check hand to keep history of highest hand
    const handIndex = getCombinationIndex(winner.result.name);
    const previousHandIndex = getCombinationIndex(table.higestHand);
    if (handIndex < previousHandIndex) {
      table.higestHand = getCombination(handIndex);
    }

    // add pot to winner
    const currentPlayer = getCurrentPlayer(table, winner.socket);
    table.players[currentPlayer.index].credits += round.pot;

    // set pot to 0
    round.pot = 0;

    // send updated credits to players
    round.sendCredits();

    // send msg to winner
    winner.socket.emit('endgame', { message: 'You Won!' });

    // send message to only losers saying who won
    table.getSockets().forEach((socket) =>
      socket.emit('broadcast', {
        message: `${winner.name} won with a ${winner.result.name}`,
      })
    );

    // reset round
    table.currentRound = null;

    // try starting new game
    if (!table.hasAvailableSpots()) {
      table.startGame();
    }

    return;
  }

  // send updated credits
  round.sendCredits();

  round.handleCurrentDecider();

  round.askDecision();
};

module.exports = continueRound;
