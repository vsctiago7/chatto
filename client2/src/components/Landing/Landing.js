import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { TextField, Button, Grid, makeStyles } from "@material-ui/core";

import { USER_CONNECTED } from "../../constants/SocketEvents";
import { SocketContext } from "../Context/SocketContext";
import AuthContext from "../Context/AuthContext";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1
  }
}));

const Form = ({ username, setUsername, handleSubmit }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" justify="center" alignItems="stretch" spacing={2}>
          <Grid item>
            <TextField
              type="text"
              placeholder="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <Button type="submit" disabled={!username} variant="text" fullWidth>
              Join
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const Landing = () => {
  const [username, setUsername] = useState("");
  const auth = useContext(AuthContext);
  let { socket, setSocket } = useContext(SocketContext);
  let history = useHistory();

  const handleSubmit = evt => {
    evt.preventDefault();
    connect();
  };

  const connect = () => {
    socket = io("http://localhost:3000");

    socket.on("connect", () => {
      setSocket(socket);
      auth.username = username;
      socket.emit(USER_CONNECTED, { username: username });
      history.push("/chat");
    });
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      handleSubmit={handleSubmit}
    />
  );
};

export default Landing;
