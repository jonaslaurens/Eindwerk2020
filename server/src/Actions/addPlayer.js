const Player = require('../Model/player/Player');
const SUPER_SECRET_CODE = require('../Constants/secretCode');

const addPlayer = (payload, casino, socket) => {
  if (payload.secretCode !== SUPER_SECRET_CODE) {
    throw new TypeError('Wrong secret code');
  }

  const table = casino.registerNewPlayer(new Player(payload.name, socket));

  console.info(`player: ${name} added to table`);

  return table;
};

module.exports = addPlayer;
