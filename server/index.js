import * as http from "http";
import { Server } from "socket.io";
import random from "random-name";

const httpServer = http.createServer();
const users = new Map();

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Connected with id", socket.id);
  const userData = {
    username: random.first() + " " + random.last(),
  };
  users.set(socket.id, userData);
  socket.emit("username", userData.username);

  socket.on("message", (text) => {
    console.log("message from " + socket.id + ": " + text);
    const user = users.get(socket.id);
    const message = {
      id: crypto.randomUUID(),
      text,
      username: user?.username || "Anonymous",
      senderId: socket.id,
      timestamp: Date.now(),
    };
    io.emit("message", message);
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected:", reason);
  });
});

// io.on("connection", (socket) => {
//   console.log("user connected");

//   socket.on("message", (message) => {
//     console.log(message);
//     io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
//   });
// });

httpServer.listen(8080, () => console.log("listneinig on 8080"));

// import WebSocket from "ws";

// const server = new WebSocket.Server({ port: "8080" });

// server.on("connection", (socket) => {
//   socket.on("message", (message) => {
//     socket.send(`Roger that ${message}`);
//   });
// });
