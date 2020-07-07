const addPlayer = require('./Actions/addPlayer');
const handleRaise = require('./Actions/handleRaise');
const handleCall = require('./Actions/handleCall');
const handleFold = require('./Actions/handleFold');
const getCurrentPlayer = require('./Helpers/getCurrentPlayer');
const continueRound = require('./Actions/continueRound');

const attachListenersToSocket = (socket, casino) => {
  // socket.on('tableInfo', (payload) => {
  //   const table = casino.getTable(payload.tableId);

  //   const data = {
  //     type: 'newPlayerAdded',
  //     table: table.toObject(payload.playerId),
  //   };

  //   console.log(data);

  //   return socket.emit('broadcast', data);
  // });

  /*   socket.on('login', async (payload, cb) => {
    console.log(payload);

    try {
      table = await addPlayer(payload, casino, socket);

      socket.emit('loggedIn', {
        type: 'login',
        status: true,
        msg: 'Welcome to our casino',
        player: payload.name,
        tableID: table.id,
        // players: table.players,
      });
      // cb({
      //   type: 'login',
      //   status: true,
      //   msg: 'Welcome to our casino',
      //   player: payload.name,
      //   table: table,
      // });

      // if we added a player try starting a game
      if (table) {
        table.startGame();
      }
    } catch (error) {
      socket.emit('casino.error', error.message);
    }
  }); */

  socket.on('decision', async (payload) => {
    console.log(payload);

    // get current table based on payload.table -> contains the table id

    // get current player
    const { player, index } = getCurrentPlayer(table, socket);
    console.info(`${player.name} will ${payload.decision}`);

    return;

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

  // handle disconnect
  socket.on('disconnect', () => {
    // find user based on socket id
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
