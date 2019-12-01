const WebSocket = require('ws');

const ws = new WebSocket('ws://104.186.149.75:8080', {
  perMessageDeflate: false
});

ws.on('open', () => {
    const id = makeId(6);
    console.log(`Connected: http://localhost:3000/${id}`);
    ws.send(`id: ${id}`);
});

ws.on('message', (message) => {
  console.log("Credentials recieved: " + message);
});

function makeId(length) {
  var result           = '';
  var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}