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
  res.sendFile(__dirname + "/src/pages/index.html");
});

var allPostcards = [];

io.on("connection", (socket) => {  
  console.log("a user connected!!" + socket.id);

  socket.on("new-postcard", data => {
    console.log(data);
    allPostcards.push(data);
  });
  
  socket.on("new-user", data => {
    io.emit("user-joined", allPostcards);
  });

  socket.on('disconnect', () => {      // () <-> msg; check what works
    console.log("user disconnected");
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server connected at 3000");
});