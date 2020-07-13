const addPlayer = require('./Actions/addPlayer');
const handleRaise = require('./Actions/handleRaise');
const handleCall = require('./Actions/handleCall');
const handleFold = require('./Actions/handleFold');
const getCurrentPlayer = require('./Helpers/getCurrentPlayer');
const continueRound = require('./Actions/continueRound');

const attachListenersToSocket = (socket, casino) => {
  // try starting a game with the id of the table in the payload param
  // socket.on('startGame', (payload) => {
  //   // get our table
  //   const table = casino.getTable(payload);

  //   table.startGame(socket);
  // });

  // payload is the id of the table
  socket.on('decision', (payload) => {
    // get table based on payload
    const table = casino.getTable(payload.table);

    // get current player
    const { player, index } = getCurrentPlayer(table, socket);
    console.info(`${player.name} will ${payload.decision}`);

    // get the current round
    const currentRound = table.getRound();

    // handle decision based on decision in the payload param
    switch (payload.decision) {
      case 'call':
        handleCall(currentRound, player, index);
        break;

      case 'raise':
        handleRaise(currentRound, player, index, payload.amount);
        break;

      case 'fold':
        handleFold(currentRound, index);
        break;
    }

    continueRound(table, currentRound);
  });

  // handle disconnect
  socket.on('disconnect', () => {
    // find user based on socket id
    // remove user from table
    // const index = casino
    //   .getTable()
    //   .players.findIndex((player) => player.socket.id === socket.id);
    // // remove user from players array
    // if (index !== -1) {
    //   table.players.splice(index, 1);
    // }
  });
};

class Listener {
  constructor(io, casino) {
    io.on('connection', (socket) => {
      console.info('\nA new connection was established\n');
      attachListenersToSocket(socket, casino);
      socket.emit('connected', socket.id);
    });
  }
}

module.exports = Listener;
