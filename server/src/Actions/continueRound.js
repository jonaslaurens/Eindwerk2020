const decideWinner = require('../Scripts/decideWinner/decideWinner');

const getCombinationIndex = require('../Helpers/getCombinationIndex');
const getCombination = require('../Helpers/getCombination');
const getCurrentPlayer = require('../Helpers/getCurrentPlayer');

let gameNumber = 0;

module.exports = continueRound = (table, round) => {
  const { players, communityCards } = round;

  // handle the end of the game
  if (round.checkEndGame()) {
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
    winner.socket.emit('endgame', {
      message: `You won with ${winner.result.name}`,
    });

    // send message to only losers saying who won
    table.getSockets().forEach((socket) => {
      const data = {
        type: 'endgame',
        message: `${winner.name} won with a ${winner.result.name}`,
      };
      socket.emit('broadcast', data);
    });

    // set highest hand
    table.setHighHand(winner.result.name);

    // reset round
    table.currentRound = null;

    // try starting new game
    if (!table.hasAvailableSpots()) {
      if (table.checkPlayerCredits().length > 1) {
        return table.startGame();
      } else {
        table.grandWinner = table.checkPlayerCredits();
        return table.getSockets().forEach((socket) => {
          const data = {
            type: 'grandWinner',
            message: `${table.grandWinner.name} won all credits, game's over.`,
          };
          socket.emit('broadcast', data);
        });
      }
    }
  }

  // send updated credits
  round.sendCredits();

  // handle current decider
  round.handleCurrentDecider();

  // send decision to next decider
  round.askDecision();
};
