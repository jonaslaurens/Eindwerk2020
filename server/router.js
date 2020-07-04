const Player = require('./src/Model/player/Player');
const { isValidLogin } = require('./validation/routerValidation');
// const Listener = require('./src/Listener');

module.exports = (app, casino) => {
  // handle login
  app.post('/login', (req, res) => {
    const { errors, isValid } = isValidLogin(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPlayer = new Player(
      req.body.name,
      req.io.sockets.connected[req.body.socketId]
    );

    const result = casino.registerNewPlayer(newPlayer);

    const data = {
      type: 'playerAdded',
      table: result.table,
      player: result.player,
    };

    const tableData = {
      type: 'newPlayerAdded',
      table: result.table,
    };

    if (typeof data === 'object') {
      req.io.emit('broadcast', tableData);
      return res.status(200).json(data);
    }
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
