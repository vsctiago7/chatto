import React from "react";
import Landing from "../landing/Landing";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Chat from "../chat/Chat";

import "./App.css";
import SocketContext from "../context/SocketContext";

const App = () => {
  return (
    <div className="App">
      <SocketContext.Provider value={}>
        <Router>
          <Switch>
            <Route path="/chat">
              <Chat username="placeholder-user" />
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
