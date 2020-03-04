import React, { useState, FunctionComponent } from "react";
import io from "socket.io-client";

type ChatProps = {
  username: string;
};

type LineProps = {
  username: string;
  message: string;
};

const Line: FunctionComponent<LineProps> = ({ username, message }) => (
  <li>{`${username}: ${message}`}</li>
);

const Chat: FunctionComponent<ChatProps> = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
  };

  if (messages.length > 0) {
    return (
      <>
        <p>Chat</p>
        <ul>
          {messages.map(message => (
            <Line username={username} message={message} />
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  } else {
    return (
      <>
        <p>Chat</p>
        <ul></ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
};

export default Chat;
