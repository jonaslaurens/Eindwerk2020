const PORT = 3050;

const io = require('socket.io-client');
const socket = io(`http://localhost:${PORT}`);

module.exports = socket;
