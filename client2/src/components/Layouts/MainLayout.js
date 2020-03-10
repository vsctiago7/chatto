import React from "react";
import { makeStyles, colors } from "@material-ui/core";
// import "./MainLayout.css";

const useStyles = makeStyles(theme => ({
  content: {
    minHeight: "100vh",
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)"
  }
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.content}>{children}</div>;
};
export default MainLayout;
