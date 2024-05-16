import { Server, Socket } from "socket.io";
import express from "express";
import { Item, Items, Player } from "./src/types/socket-connection-types";
import {
  matchmaking_diff_1,
  matchmaking_diff_10,
  matchmaking_diff_any,
} from "./src/matchmaking/dicts/player-level-dicts";
import { running_matches } from "./src/matchmaking/dicts/running-matches-dict";
import { addToMatchmaking } from "./src/matchmaking/add-to-matchmaking";
import { createServer } from "http";
import userController from "./src/controllers/user.controller";
import SocketServer from "./src/socket/events";

const port = 3000;
// readded express for future authentication when logging in w users to db
const app = express();
/**
 * express app use statements here
 */
app.use("/user", userController);

const httpServer = createServer(app);
SocketServer(httpServer);

//app.get("/", (req, res) => {
//  res.send("Express Server running");
//});

httpServer.listen(port, () => {
  console.log("Backendserver running on port " + port);
});
