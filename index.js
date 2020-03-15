const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const sockets = {};

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('assets'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    if (sockets[name]) {
      res.render('home', { name });
    } else {
      res.render('404', { name });
    }
});

app.post('/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const socket = sockets[name];
  const {server, token} = req.body;
  if (!socket) {
    res.status(404).end();
  } else {
      socket.send(JSON.stringify({server, token}));
      socket.close();
      delete sockets[name];
      console.log(`Credentials sent. Closing connect ${name}`);
      res.status(200).end();
  }
});

// ssl route
app.get('/.well-known/acme-challenge/3XUzlpNUapJIOqavEg7778bdjvATRiXSvNhxNiY_3gg', (req, res) => {
  res.send('3XUzlpNUapJIOqavEg7778bdjvATRiXSvNhxNiY_3gg.r55yryYu5PWXFU75NIVYt0_KaNoKHShqsBjD3LqX8aM');
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    if (message.startsWith("id:")) {
      const id = message.split(":")[1].trim().toLowerCase();
      sockets[id] = ws;
      console.log(`New socket created: ${id}`);
      ws.on('close', () => {
        console.log(`Socket ${id} closed and deleted`);
        delete sockets[id];
      });

      ws.on('error', (err) => {
        console.log(`Web socket error ${err}`);
      })
    }
  });
});

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);
