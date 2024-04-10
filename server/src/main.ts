import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { DatabaseConnection } from './database/connect';
import type { User } from './types/user';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

const db : DatabaseConnection = new DatabaseConnection();

const user: User = db.get();
console.log(user);

db.closeConnection();

app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});