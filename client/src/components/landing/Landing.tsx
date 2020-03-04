import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

const Landing = () => {
	const [username, setUsername] = useState("");
	let history = useHistory();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    connect();
  };

  const connect = () => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      history.push("/chat");
    });

    setUsername(username);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Landing;
