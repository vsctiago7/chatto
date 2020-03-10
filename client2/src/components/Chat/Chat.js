import React, { useState, useContext } from 'react';
// import io from "socket.io-client";
import {
  NEW_MESSAGE,
  USER_CONNECTED,
  USER_DISCONNECTED,
} from '../../constants/SocketEvents';
import AuthContext from '../Context/AuthContext';
import { SocketContext } from '../Context/SocketContext';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  TextField,
  makeStyles,
  Typography,
  Button,
  Container,
} from '@material-ui/core';

const Line = ({ message }) => {
  const { username, content, type } = message;
  if (type === 'system') return <div>{`${content}`}</div>;
  else return <div>{`${username}: ${content}`}</div>;
};

const useStyles = makeStyles(theme => ({}));

const Form = ({ auth, message, setMessage, handleSubmit }) => {
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify="center" alignItems="stretch" spacing={2}>
        <Grid item>
          <TextField
            type="text"
            value={message.content}
            onChange={e =>
              setMessage({
                username: auth.username,
                content: e.target.value,
                type: 'user',
              })
            }
          />
        </Grid>
        <Grid item>
          <Button type="submit" color="primary" value="Submit">
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    username: '',
    content: '',
    type: 'user',
  });
  const auth = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  let history = useHistory();

  if (auth.username === '' || socket == null) {
    history.replace('/');
    return null;
  }

  socket.on(USER_CONNECTED, ({ username }) => {
    const newMessage = {
      username: null,
      content: `${username} just joined.`,
      type: 'system',
    };
    setMessages([...messages, newMessage]);
  });

  socket.on(USER_DISCONNECTED, ({ username }) => {
    const newMessage = {
      username: null,
      content: `${username} just left.`,
      type: 'system',
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
      username: '',
      content: '',
      type: 'user',
    });
  };

  if (messages.length > 0) {
    return (
      <>
        <p>Chat</p>
        <div>
          {messages.map((message, index) => (
            <Line key={index} message={message} />
          ))}
        </div>
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
        <Grid container direction="column">
          <Grid item xs>
            <Typography variant="h5">Chat</Typography>
          </Grid>
          <Grid item xs>
            <Form
              auth={auth}
              message={message}
              setMessage={setMessage}
              handleSubmit={handleSubmit}
            />
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Chat;
