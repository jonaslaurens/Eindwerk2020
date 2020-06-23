const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')({
  serveClient: false
});

const Casino = require('./src/Casino');
const Listener = require('./src/Listener');
const Table = require('./src/Model/table/Table');

// serve a simple homepage over http
app.get('/', function(req, res) {
  res.send('<h1>Node js Example</h1>');
});

// we start our server on port 3050
http.listen(3050, function() {
  console.log('listening on *:3050');
});

// attach our socket.io instance
io.attach(http);

const myCasino = new Casino('Royal', new Table(4));
new Listener(io, myCasino);
