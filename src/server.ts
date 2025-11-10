import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { profilesRouter } from './routes/profiles.js';
import { Request, Response } from 'express';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/profiles', profilesRouter);

app.post('/match', (req: Request, res: Response) => {
  // Simple stub: random scores for demo
  const { requesterId, limit = 5 } = req.body ?? {};
  if (!requesterId || typeof requesterId !== 'string') {
    return res.status(400).json({ error: 'requesterId is required' });
  }
  // For now, return top N other profiles with dummy score
  // A real implementation would compute based on skills/interests overlap
  // and perhaps university or availability.
  const { db } = require('./store.js');
  const all = db.listProfiles();
  const results = all
    .filter((p: any) => p.id !== requesterId)
    .map((p: any) => ({ targetId: p.id, score: Math.random() }))
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, Math.max(0, Math.min(limit, 20)));
  res.json({ count: results.length, items: results });
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`KMSB API listening on http://localhost:${port}`);
});

