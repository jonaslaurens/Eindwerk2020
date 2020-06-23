const Player = require('../Model/player/Player');
const generateID = require('../Vendor/generateID');

const addPlayer = (name, table, socket) => {
  const player = new Player(name, generateID(), socket);

  table.addPlayer(player);

  console.info(`player: ${name} added to table`);

  return player;
};

module.exports = addPlayer;
