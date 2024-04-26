import cors from 'cors';
import 'dotenv/config';
import * as express from 'express';
import * as http from 'http';
import SocketServer from './socket-io/SocketServer';

const app = express.default();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});

const httpServer = http.createServer(app);
SocketServer(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});