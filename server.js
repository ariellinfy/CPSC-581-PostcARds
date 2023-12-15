const path = require("path");
var express = require('express');
const http = require('http');
const io = require('socket.io')(http);
// const ejs = require('ejs');

var app = express();
const server = http.createServer(app);
// const io = socketIo(server);

// app.set('view engine', 'ejs');
app.set('src', path.join(__dirname, "src"));
app.use(express.static(path.join(__dirname, "public")));


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/pages/login.html');
});

// app.get("/main", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

server.listen(3000, () => {
  console.log("Server connected at 3000");
});

io.on("connection", (socket) => {
  console.log("a user connected!!");

  socket.on("data", (msg) => {
    console.log("Received update from user: ", msg);
    io.emit("data", msg);
  });

  socket.on("disconnect", () => {      // () <-> msg; check what works
    console.log("user disconnected");
  });
});