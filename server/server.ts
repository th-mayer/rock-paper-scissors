import express, { json } from "express";
import { createServer } from "http";
import cors, { CorsOptions } from "cors";
import userController from "./src/controllers/user.controller";
import SocketServer from "./src/socket/events";
import { errorHandler } from "./src/express-middleware/error.handler";

const port = process.env.PORT;
const app = express();
const corsOptions : CorsOptions = {
  origin: process.env.CLIENT_URL
}

app.use(cors(corsOptions));
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// api routes
app.use("/users", userController);

const httpServer = createServer(app);
SocketServer(httpServer);

//app.get("/", (req, res) => {
//  res.send("Express Server running");
//});

httpServer.listen(port, () => {
  console.log("Backendserver running on port " + port);
});
