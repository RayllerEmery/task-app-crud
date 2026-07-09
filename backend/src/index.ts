import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/', authRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Backend rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Falha ao iniciar o servidor:', err);
    process.exit(1);
  }
}

start();
