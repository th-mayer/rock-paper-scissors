import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});

io.on("connection", (socket: any) => {
  console.log(`connect ${socket.id}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});