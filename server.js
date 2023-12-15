const path = require("path");
var express = require('express');
const http = require('http');

var app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.set('src', path.join(__dirname, "src"));
app.use(express.static(path.join(__dirname, "public")));

// html files should be stored in this directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/pages/login.html');
});

app.get("/new", (req, res) => {
  res.sendFile(__dirname + "/src/pages/create.html");
});

app.get("/lobby", (req, res) => {
  res.sendFile(__dirname + "/src/pages/lobby.html");
});

app.get('/create', (req, res) => {
  res.sendFile(__dirname + '/src/pages/create.html');
});
app.get('/client', (req, res) => {
  res.sendFile(__dirname + '/src/pages/client.html');
});

io.on("connection", (socket) => {
  console.log("a user connected!!");

  socket.on('data', (msg) => {
    console.log("Received update from user: ", msg);
    io.emit('data', msg);
  });
  
  socket.on('contentChange', (msg) => {
    io.emit('contentUpdate', msg);
  });

  socket.on('disconnect', () => {      // () <-> msg; check what works
    console.log("user disconnected");
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server connected at 3000");
});