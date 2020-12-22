const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});



app.use(express.static('public'));

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(__dirname + "/public/");
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("msg", (msg) => {
    io.emit("msg",msg);
  });
});


let port = process.env.PORT || 8080; 
http.listen( port,() => {
  console.log('listening on *:'+ port);
});

