const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/images'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/");
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("msg", (msg) => {
    io.emit("msg",msg);
  });
});


let port = process.env.PORT | 8080
http.listen( port, () => {
  console.log('listening on *:'+ port);
});

