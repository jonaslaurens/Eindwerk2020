const Player = require('./src/Model/player/Player');
const SUPER_SECRET_CODE = require('./src/Constants/secretCode');
const { isValidLogin } = require('./validation/routerValidation');

module.exports = (app, casino) => {
  // handle login
  app.post('/login', (req, res) => {
    const { errors, isValid } = isValidLogin(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPlayer = new Player(req.body.name);

    let result = casino.registerNewPlayer(newPlayer);

    const data = {
      table: result.table.toObject(),
      player: result.player,
    };

    if (typeof data === 'object') {
      return res.status(200).json(data);
    }
  });

  // handle get table info
  app.get('/table/:id', (req, res) => {
    console.log(req.params.id);
    const table = casino.getTable(req.params.id);
    console.log(table);
  });
};
