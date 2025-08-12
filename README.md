### Introductionary app to SocketIO

```javascript
io.on("connection", (socket) => {
  console.log("Connected with id", socket.id);

  socket.on("messages", (message) => {
    console.log("message from " + socket.id + ": " + message);
  });
});
```

### How to run

- Run client

```bash

cd react-chat
npm install
npm run dev

```

- Run server

```bash

cd server
npm install
node index.js

```
