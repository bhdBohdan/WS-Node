import * as http from "http";
import { Server } from "socket.io";

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Connected with id", socket.id);

  socket.on("message", (text) => {
    console.log("message from " + socket.id + ": " + text);
    const message = {
      id: crypto.randomUUID(),
      text,
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
