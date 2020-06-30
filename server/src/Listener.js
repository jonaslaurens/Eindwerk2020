const addPlayer = require('./Actions/addPlayer');
const handleRaise = require('./Actions/handleRaise');
const handleCall = require('./Actions/handleCall');
const handleFold = require('./Actions/handleFold');
const getCurrentPlayer = require('./Helpers/getCurrentPlayer');
const continueRound = require('./Actions/continueRound');

const SUPER_SECRET_CODE = require('./Constants/secretCode');

const attachListenersToSocket = (socket, casino) => {
  let table = null;

  socket.on('login', async (payload) => {
    try {
      table = await addPlayer(payload, casino, socket);

      // if we added a player try starting a game
      if (table) {
        table.startGame();
      }
    } catch (error) {
      socket.emit('casino.error', {
        type: 'addPlayer',
        message: error.message,
      });
    }
  });

  socket.on('decision', async (payload) => {
    // get current player
    const { player, index } = getCurrentPlayer(table, socket);

    console.info(`${player.name} will ${payload.decision}`);

    // get the current round
    const currentRound = table.getRound();

    // handle decision
    switch (payload.decision) {
      case 'call':
        await handleCall(currentRound, player, index);
        break;

      case 'raise':
        await handleRaise(currentRound, player, index, payload.amount);
        break;

      case 'fold':
        await handleFold(currentRound, index);
        break;
    }

    await continueRound(table, currentRound);
  });

  socket.on('disconnect', () => {
    // find user based on socket id
    const index = casino
      .getTable()
      .players.findIndex((player) => player.socket.id === socket.id);

    // remove user from players array
    if (index !== -1) {
      table.players.splice(index, 1);
    }
  });
};

class Listener {
  constructor(io, casino) {
    io.on('connection', (socket) => {
      console.info('A new connection was established');
      attachListenersToSocket(socket, casino);
    });
  }
}

module.exports = Listener;
