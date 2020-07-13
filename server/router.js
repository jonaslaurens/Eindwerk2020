const Player = require('./src/Model/player/Player');
const { isValidLogin } = require('./validation/routerValidation');
// const Listener = require('./src/Listener');

module.exports = (app, casino) => {
  // handle login
  app.post('/login', (req, res) => {
    const { errors, isValid } = isValidLogin(req.body);

    // validate req.body
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const connectedSocket = req.io.sockets.connected[req.body.socketId];

    // create a new player
    const newPlayer = new Player(req.body.name, connectedSocket);

    const result = casino.registerNewPlayer(newPlayer);

    const data = {
      type: 'playerAdded',
      table: result.table,
      player: result.player,
    };

    // get table
    const table = casino.getTable(result.table.id);

    // send new table data to all connected sockets
    table.broadcast();

    // have the socket join a room based on the table id.
    // if the table is full we get a new id and thus
    // a new room will be created
    connectedSocket.join(data.table.id);

    // try starting a game

    // send initial data to connected client
    res.status(200).json(data);

    // start game when table is full
    if (!table.hasAvailableSpots()) {
      table.startGame();
    }
    return;

    // return res.status(200).json(data);
  });

  // handle get table info
  app.get('/table/:id', (req, res) => {
    const table = casino.getTable(req.params.id);

    if (!table) {
      return res.status(400).json({ msg: 'That table does not exist' });
    }

    return res.status(200).json(table);
  });
};
