const socket = require('./socket');

const randomizeDecision = require('./randomizeDecision');

let tableId = 0;

socket.on('casino.error', console.log);

socket.on('connected', () => {
  socket.emit('login', {
    name: 'Player 4',
    casinoServer: 'localhost:3050',
    secretCode: 'aze',
  });
});

socket.on('loggedIn', (payload) => {
  tableId = payload.table.id;
});

socket.on('decision', (payload) => {
  console.log(payload);
  // deconstruct required info
  const { actions } = payload;

  // calculate hand on client side

  // WARN: remove in future
  // randomize decision
  const randomInt = randomizeDecision();

  let bet = 0;

  if (randomInt === 2) bet = 100;

  // send random decision to server
  setTimeout(() => {
    if (randomInt === 2) {
      return socket.emit('decision', {
        table: tableId,
        decision: actions[randomInt],
        amount: bet,
      });
    }

    socket.emit('decision', {
      table: tableId,
      decision: actions[randomInt],
      bet: '',
    });
  }, 2000);
});

// socket.on("decision", payload => {
//   setTimeout(() => {
//     socket.emit("fold");
//   }, 2000);
// });

socket.on('endgame', (payload) => {
  console.info(payload.message);
});

socket.on('broadcast', (payload) => {
  console.log(payload.message);
});
