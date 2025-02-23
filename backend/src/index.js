import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 


import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';

import { connectDB } from './lib/db.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth/', authRoutes);
app.use('/api/message', messageRoutes)


app.listen(PORT, () => {
  console.log('Server is running on port' + PORT);
  connectDB();
})