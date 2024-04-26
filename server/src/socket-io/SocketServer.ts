import { Server } from "socket.io";

const SocketServer = (server: any) => {
  const io = new Server(server);

  io.on("connection", (socket: any) => {
    console.log("User connected");
  });
};
export default SocketServer;