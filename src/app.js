import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import http from "http";
import logger from "morgan";

import indexRouter from "./routes/index";

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);

io.on("connection", socket => {
  console.log("A user connected.");
  socket.on("disconnect", () => {
    console.log("user disconnected.");
  });
});

export default app;
