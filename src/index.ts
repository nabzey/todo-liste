import express from 'express';
import cors from 'cors';
import userroute from './routes/UserRoute';
import tacheroute from './routes/Tacherouter';
import authenticate from './middlewares/Authmiddleware';

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Middlewares
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
// Pour servir les fichiers statiques du dossier uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/users', userroute);
app.use('/taches', authenticate, tacheroute);

export default app;
