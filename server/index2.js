import * as http from "http";
import { Server } from "socket.io";
import random from "random-name";

const httpServer = http.createServer();
const users = new Map();
const CHANNELS = ["General", "NSFW jokes", "Spam"];

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Connected with id", socket.id);

  socket.on("joinServer", (data) => {
    console.log(data);
    if (!data || data === "") {
      users.set(socket.id, {
        username: random.first() + " " + random.last(),
      });
    } else {
      users.set(socket.id, {
        username: data,
      });
    }

    socket.emit("username", data);

    const chats = {
      channels: CHANNELS,
      userDms: Array.from(users.values()).map((u) => u.username),
    };
    io.emit("chats", chats);
    const user = users.get(socket.id);
    io.emit("message", { text: `${user.username} entered the chat` });

    console.log(chats);
  });

  socket.on("getChats", () => {
    const message = {
      channels: CHANNELS,
      userDms: Array.from(users.values()).map((u) => u.username),
    };
    socket.emit("chats", message);
  });

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
    const user = users.get(socket.id);
    users.delete(socket.id);
    const chats = {
      channels: CHANNELS,
      userDms: Array.from(users.values()).map((u) => u.username),
    };
    io.emit("chats", chats);
    io.emit("message", { text: `${user.username} left the chat` });
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
