import { Server } from "socket.io";

const port = 3000;
const connectedClients = () => io.engine.clientsCount;

const io = new Server(port, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on("connect", (socket) => {
  console.log("Connected!");
  console.log(`${socket.id} connected`);
  console.log(`${connectedClients()} clients are online`);

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} disconnected`);
    console.log(`${connectedClients} clients are online`);
  });

  socket.emit("gm", "frens");

  socket.on("gn", (arg) => {
    console.log(arg);
  });

});