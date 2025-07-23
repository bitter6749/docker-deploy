import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import mongoose from 'mongoose';

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from './userController.js';

// ESM環境では __dirname がないので下記で定義する
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB接続成功"))
  .catch(err => console.error('MongoDB接続エラー:', err));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ルーティングにコントローラ関数を割り当て
app.post('/api/users', createUser);
app.get('/api/users', getUsers);
app.get('/api/users/:id', getUserById);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);

app.listen(PORT, () => {
  console.log(`API listening port:${PORT}`);
});
