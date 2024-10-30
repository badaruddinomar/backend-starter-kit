import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';

const app = express();

// middleware--
app.use(express.json());
app.use(cors());
// mongodb connection--
mongoose
  .connect(config.mongo_uri ?? '')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// routes--
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// server--
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
