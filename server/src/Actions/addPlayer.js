const Player = require('../Model/player/Player');

const addPlayer = (name, casino, socket) => {
  const table = casino.registerNewPlayer(new Player(name, socket));

  console.info(`player: ${name} added to table`);

  return table;
};

module.exports = addPlayer;
