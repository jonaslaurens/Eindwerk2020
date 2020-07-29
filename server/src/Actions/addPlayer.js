const Player = require('../Model/player/Player');
const SUPER_SECRET_CODE = require('../Constants/secretCode');

module.exports = addPlayer = (payload, casino, socket) => {
  if (payload.secretCode !== SUPER_SECRET_CODE) {
    return 'Wrong secret code';
  }

  const table = casino.registerNewPlayer(new Player(payload.name, socket));

  console.info(`player: ${payload.name} added to table`);

  return table;
};
