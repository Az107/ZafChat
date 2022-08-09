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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  id = Math.floor(Math.random() * 100001); 
  res.redirect("/" + id);
});

app.get('/:id',(req,res) => {
  if (req.params.id == null){
    id = Math.floor(Math.random() * 101); 
    res.redirect("/" + id);
  }

  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(__dirname + "/public/");
});

io.on('connection', (socket) => {
  let socketId = socket.handshake.auth.id;
  console.log('a user connected ' + socketId);
  socket.join(socketId);
  socket.on("msg", ({content, to}) => {
    // io.emit("msg",content);
    console.log("sending to " + to )
    io.to(to).emit("msg",content);
  });
});


let port = process.env.PORT || 8080; 
http.listen( port,() => {
  console.log('listening on *:'+ port);
});

