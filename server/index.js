const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const Casino = require('./src/Casino');
const router = require('./router');

app.use(express.json());
app.use(cors());

const casino = new Casino('Royal');

router(app, casino);

// we start our server on port 3050
http.listen(3050, function () {
  console.log('listening on *:3050');
});
