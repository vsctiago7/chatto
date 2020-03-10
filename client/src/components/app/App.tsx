import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import io from "socket.io-client";

import Landing from "../landing/Landing";
import Chat from "../chat/Chat";
import SocketContext from "../context/SocketContext";
import "./App.css";

const socket = io("http://localhost:3000") as SocketIOClient.Socket;

const App = () => {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <Router>
          <Switch>
            <Route path="/chat">
              {socket => <Chat username="placeholder-user" socket={socket} />}
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Router>
      </SocketContext.Provider>
    </div>
  );
};

export default App;
