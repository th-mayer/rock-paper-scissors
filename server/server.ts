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

// middleware
app.use(cors(corsOptions));
app.use(json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/users", userController);

// global error handler for json responses
app.use(errorHandler);

const httpServer = createServer(app);
SocketServer(httpServer);

httpServer.listen(port, () => {
  console.log("Backendserver running on port " + port);
});
