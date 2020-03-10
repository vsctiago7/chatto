import socket_io from "socket.io";

import {
  CONNECTION,
  DISCONNECT,
  USER_CONNECTED,
  USER_DISCONNECTED,
  NEW_MESSAGE
} from "./constants/SocketEvents";

const io = socket_io();

const chat = {};

chat.io = io;

io.on(CONNECTION, socket => {
  socket.on(USER_CONNECTED, ({ username }) => {
    socket.broadcast.emit(USER_CONNECTED, { username });

    socket.once(DISCONNECT, () => {
      socket.broadcast.emit(USER_DISCONNECTED, { username: username });
    });
  });

  socket.on(NEW_MESSAGE, message => {
    socket.broadcast.emit(NEW_MESSAGE, message);
  });

  // socket.on(DISCONNECT, () => {
  //   console.log(`User just disconnected. (ID: ${socket.id})`);
  //   socket.broadcast.emit(USER_DISCONNECTED, {
  //     id: socket.id,
  //     username: username
  //   });
  // });
});

// io.on("new message", message => {});

export default chat;
