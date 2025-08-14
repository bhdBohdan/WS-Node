import * as http from "http";
import { Server } from "socket.io";
import random from "random-name";

const httpServer = http.createServer();
const users = new Map();
const CHANNELS = ["general", "jokes", "spam"];
const dmMessages = {};

const channelMessages = {
  General: [],
  Jokes: [],
  Spam: [],
};

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
    // const user = users.get(socket.id);
    // io.emit("message", { text: `${user.username} entered the chat` });

    console.log(chats);
  });

  socket.on("getChats", () => {
    const message = {
      channels: CHANNELS,
      userDms: Array.from(users.values()).map((u) => u.username),
    };
    socket.emit("chats", message);
  });

  socket.on("joinChannel", (channel) => {
    socket.join(channel);
    console.log("Joined room ", channel);
    socket.emit("messages", channelMessages[channel] || []);
  });

  socket.on("leaveChannel", (channel) => {
    socket.leave(channel);
    console.log("Leaved room ", channel);
  });

  socket.on("channelMessage", ({ channel, text }) => {
    const user = users.get(socket.id)?.username || "Anon";
    const message = {
      id: crypto.randomUUID(),
      text,
      username: user,
      senderId: socket.id,
      timestamp: Date.now(),
      channel: channel,
    };
    if (!channelMessages[channel]) channelMessages[channel] = [];
    channelMessages[channel].push(message);
    io.to(channel).emit("channelMessage", message);
    console.log("Sent to ", channel, " users who listen on channelMessage");
  });

  socket.on("dmMessage", ({ to, text }) => {
    const fromUser = users.get(socket.id)?.username;
    if (!fromUser) return;
    const key = [fromUser, to].sort().join("|");
    if (!dmMessages[key]) dmMessages[key] = [];
    const msg = {
      id: crypto.randomUUID(),
      text,
      username: fromUser,
      senderId: socket.id,
      timestamp: Date.now(),
      to,
      from: fromUser,
    };

    dmMessages[key].push(msg);

    for (const [id, info] of users) {
      if (info.username === to || info.username === fromUser) {
        io.to(id).emit("dmMessage", msg);
      }
    }
  });

  socket.on("getDMs", (to) => {
    const fromUser = users.get(socket.id)?.username;
    if (!fromUser || !to) return;

    const key = [fromUser, to].sort().join("|");
    const messages = dmMessages[key] || [];

    socket.emit("messages", messages);
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected:", reason);
    // const user = users.get(socket.id);
    users.delete(socket.id);
    const chats = {
      channels: CHANNELS,
      userDms: Array.from(users.values()).map((u) => u.username),
    };
    io.emit("chats", chats);
    // io.emit("message", { text: `${user.username} left the chat` });
  });
});

httpServer.listen(8080, () => console.log("listneinig on 8080"));

// import WebSocket from "ws";

// const server = new WebSocket.Server({ port: "8080" });

// server.on("connection", (socket) => {
//   socket.on("message", (message) => {
//     socket.send(`Roger that ${message}`);
//   });
// });
