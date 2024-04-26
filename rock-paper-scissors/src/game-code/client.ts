import { io } from "socket.io-client";

export const socket = io("ws://localhost:8000/", {});

socket.on("connect", () => {
  console.log("User connected");
});