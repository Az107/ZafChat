var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/web/index.html");
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("msg", (msg) => {
    io.emit("msg",msg);
  });
});



http.listen(process.env.PORT, () => {
  console.log('listening on *:'+process.env.PORT);
});

