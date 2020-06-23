const socket = require('./socket');

const randomizeDecision = require('./randomizeDecision');

socket.on('casino.error', console.log);

socket.emit('login', {
  name: 'Player 4'
});

socket.on('decision', payload => {
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
        decision: actions[randomInt],
        amount: bet
      });
    }

    socket.emit('decision', { decision: actions[randomInt] });
  }, 2000);
});

//fixed decision
/* socket.on('decision', payload => {
  setTimeout(() => {
    socket.emit('raise', { amount: 100 });
  }, 2000);
}); */

/*socket.on("decision", payload => {
  setTimeout(() => {
    socket.emit("call");
  }, 2000);
});*/

/*socket.on("decision", payload => {
  setTimeout(() => {
    socket.emit("fold");
  }, 2000);
});*/

socket.on('endgame', payload => {
  console.info(payload.message);
});

socket.on('broadcast', payload => {
  console.log(payload.message);
});
