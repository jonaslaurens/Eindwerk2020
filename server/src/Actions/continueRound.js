const decideWinner = require('../Scripts/decideWinner/decideWinner');

const getCombinationIndex = require('../Helpers/getCombinationIndex');
const getCombination = require('../Helpers/getCombination');
const getCurrentPlayer = require('../Helpers/getCurrentPlayer');

const logStuff = require('../../helpers/logStuff');
let gameNumber = 0;

const continueRound = async (table, round) => {
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

    table.players.forEach((player) => console.log(player.credits));

    // send msg to winner
    winner.socket.emit('endgame', { message: 'You Won!' });

    // send message to everyone declaring who won
    table.getSockets().forEach((socket) =>
      socket.emit('broadcast', {
        message: `${winner.name} won with a ${winner.result.name}`,
      })
    );

    // reset round
    table.currentRound = null;

    // try starting new game
    table.startGame();

    return;
  }

  await round.handleCurrentDecider();

  await round.askDecision();
};

module.exports = continueRound;