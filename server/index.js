const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')({
  serveClient: false,
});
const cors = require('cors');
const Casino = require('./src/Casino');
const Listener = require('./src/Listener');
const router = require('./router');

app.use(express.json());
app.use(cors());

// socket.io middleware
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// init new casino
const casino = new Casino('Royal');
new Listener(io, casino);

// pass app and casino to router
router(app, casino);

io.attach(http);

// we start our server on port 3050
http.listen(3050, function () {
  console.log('listening on *:3050');
});
