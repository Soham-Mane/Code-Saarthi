import express, { text } from 'express';
import textRoutes from './routes/textRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app=express();

app.use(cors());
app.use(express.json());
app.use('/api/text', textRoutes);

export default app;