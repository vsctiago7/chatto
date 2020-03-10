import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SocketProvider from "../Context/SocketContext";
import AuthContext from "../Context/AuthContext";
import MainLayout from "../Layouts/MainLayout";
import Landing from "../Landing/Landing";
import Chat from "../Chat/Chat";
// import "./App.css";
import { createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core";

// const useStyles = makeStyles({theme}

const App = () => {
  const initialAuthContext = {
    username: ""
  };

  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  return (
    // <div>
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <AuthContext.Provider value={initialAuthContext}>
          <Router>
            <Switch>
              <Route path="/chat">
                <MainLayout>
                  <Chat />
                </MainLayout>
              </Route>
              <Route path="/">
                <MainLayout>
                  <Landing />
                </MainLayout>
              </Route>
            </Switch>
          </Router>
        </AuthContext.Provider>
      </SocketProvider>
    </ThemeProvider>
    // </div>
  );
};

export default App;
