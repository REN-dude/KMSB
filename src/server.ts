import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { profilesRouter } from './routes/profiles';
import { db } from './store';
import { matchRouter } from './routes/match';
import { Request, Response } from 'express';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/profiles', profilesRouter);
app.use('/', matchRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`KMSB API listening on http://localhost:${port}`);
});
