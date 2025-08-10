import { io } from "socket.io-client";
export const socket = io("http://localhost:8080");

socket.on("connect", () => {
  console.log("Connected with id:", socket.id);
});

socket.on("username", (data) => {
  console.log(" and UserName ", data);
});
