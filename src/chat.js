import socket_io from "socket.io";
const io = socket_io();

const chat = {};

chat.io = io;

io.on("connection", socket => {
  console.log("A user connected.");
  socket.on("disconnect", () => {
    console.log("user disconnected.");
  });
});

export default chat;
