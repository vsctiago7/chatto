import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

import SocketProvider from "../Context/SocketContext";
import AuthContext from "../Context/AuthContext";
import MainLayout from "../Layouts/MainLayout";
import Landing from "../Landing/Landing";
import Chat from "../Chat/Chat";

const App = () => {
  const initialAuthContext = {
    username: ""
  };

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      background: {
        default: "#282c34"
      },
      primary: {
        main: orange[300]
      }
    }
  });

  return (
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
  );
};

export default App;
