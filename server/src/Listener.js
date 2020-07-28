const addPlayer = require('./Actions/addPlayer');
const handleRaise = require('./Actions/handleRaise');
const handleCall = require('./Actions/handleCall');
const handleFold = require('./Actions/handleFold');
const getCurrentPlayer = require('./Helpers/getCurrentPlayer');
const continueRound = require('./Actions/continueRound');

const Player = require('./Model/player/Player');
const { isValidLogin } = require('../validation/routerValidation');

const attachListenersToSocket = (socket, casino) => {
  socket.on('login', (payload) => {
    const { errors, isValid } = isValidLogin(payload);

    // validate req.body
    if (!isValid) {
      return socket.emit('loginError', errors);
    }

    // create new player
    const newPlayer = new Player(payload.name, socket);

    // register new player
    const result = casino.registerNewPlayer(newPlayer);

    const data = {
      type: 'playerAdded',
      table: result.table,
      player: result.player,
    };

    // send data to socket
    socket.emit('loggedIn', data);

    // still needed? we got table in data?
    // get table
    const table = casino.getTable(result.table.id);

    // send new table data to all connected sockets
    table.broadcast();

    // have the socket join a room based on the table id.
    // if the table is full we get a new id and thus
    // a new room will be created
    socket.join(data.table.id);

    // try starting game
    if (!table.hasAvailableSpots()) {
      return table.startGame();
    }
  });
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
      socket.emit('connected');
    });
  }
}

module.exports = Listener;
