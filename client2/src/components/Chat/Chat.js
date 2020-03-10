import React, { useState, useContext } from "react";
// import io from "socket.io-client";
import {
  NEW_MESSAGE,
  USER_CONNECTED,
  USER_DISCONNECTED
} from "../../constants/SocketEvents";
import AuthContext from "../Context/AuthContext";
import { SocketContext } from "../Context/SocketContext";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

const Line = ({ message }) => {
  const { username, content, type } = message;
  if (type === "system") return <li>{`${content}`}</li>;
  else return <li>{`${username}: ${content}`}</li>;
};

const Form = ({ auth, message, setMessage, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid container item xs={2}>
          <input
            type="text"
            placeholder="message"
            value={message.content}
            onChange={e =>
              setMessage({
                username: auth.username,
                content: e.target.value,
                type: "user"
              })
            }
          />
        </Grid>
        <Grid container item xs={2}>
          <input type="submit" value="Submit" />
        </Grid>
      </Grid>
    </form>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    username: "",
    content: "",
    type: "user"
  });
  const auth = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  let history = useHistory();

  if (auth.username === "" || socket == null) {
    history.replace("/");
    return null;
  }

  socket.on(USER_CONNECTED, ({ username }) => {
    const newMessage = {
      username: null,
      content: `${username} just joined.`,
      type: "system"
    };
    setMessages([...messages, newMessage]);
  });

  socket.on(USER_DISCONNECTED, ({ username }) => {
    const newMessage = {
      username: null,
      content: `${username} just left.`,
      type: "system"
    };
    setMessages([...messages, newMessage]);
  });

  socket.on(NEW_MESSAGE, message => {
    addMessage(message);
  });

  const addMessage = message => {
    setMessages([...messages, message]);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addMessage(message);
    socket.emit(NEW_MESSAGE, message);
    setMessage({
      username: "",
      content: "",
      type: "user"
    });
  };

  if (messages.length > 0) {
    return (
      <>
        <p>Chat</p>
        <ul>
          {messages.map((message, index) => (
            <Line key={index} message={message} />
          ))}
        </ul>
        <Form
          auth={auth}
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
        />
      </>
    );
  } else {
    return (
      <>
        <p>Chat</p>
        <Form
          auth={auth}
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
        />
      </>
    );
  }
};

export default Chat;
