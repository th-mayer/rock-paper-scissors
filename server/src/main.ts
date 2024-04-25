import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import * as http from 'http';

import { DatabaseConnection } from './database/connect';
import type { User } from './types/User';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

const db : DatabaseConnection = new DatabaseConnection();

let user: User = db.get('SELECT * FROM User');
console.log(user);
db.create('INSERT INTO User(email, name, password) VALUES(?,?,?)', ['testuser2@example.com', 'Jane Doe', 'notapasswd']);
user = db.get('SELECT * FROM User');
console.log(user);


db.closeConnection();

app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});