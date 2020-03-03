import React from "react";
import io from "socket.io-client";
import "./App.css";

const App = () => {
  const socket = io();
  return (
    <div className="App">
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
    </div>
  );
};

export default App;
