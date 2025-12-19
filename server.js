const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

io.on("connection", socket => {
  console.log("User connected");
  socket.on("draw", data => io.emit("draw", data));
  socket.on("clear", () => io.emit("clear"));
  socket.on("drawShape", data => io.emit("drawShape", data));
});

http.listen(3000, () => console.log("Server running on http://localhost:3000"));
