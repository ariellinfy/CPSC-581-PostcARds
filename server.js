const path = require("path");
var express = require('express');
var app = express();
const http = require('http');
const io = require('socket.io')(http);
app.use(express.static('public'));
const server = http.createServer(app);


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