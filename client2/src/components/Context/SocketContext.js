import React, { useState } from "react";

//Default context
export const SocketContext = React.createContext({
  socket: null,
  setSocket: () => {}
});

//Context Provider
const SocketProvider = ({ children }) => {
  const setSocket = socket => {
    updateSocket(prevState => {
      return {
        ...prevState,
        socket: socket
      };
    });
  };

  const socketState = {
    socket: null,
    setSocket
  };

  const [socket, updateSocket] = useState(socketState);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
