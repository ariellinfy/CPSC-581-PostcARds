const path = require("path");
var express = require('express');
var app = express();
const http = require('http');
const io = require('socket.io')(http);
app.use(express.static('public'));
const server = http.createServer(app);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// app.get("/main", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

http.listen(3000, () => {
  console.log("connected at 3000");
});

io.on("connection", socket => {
  console.log("a user connected!!");

  socket.on("data", msg => {
    io.emit("data", msg);
  });

  socket.on("disconnect", msg => {
    console.log("user disconnected");
  });
});