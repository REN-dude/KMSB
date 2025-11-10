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

app.get('/', (_req: Request, res: Response) => {
  res.type('html').send(`<!doctype html>
  <html lang="ja"><head><meta charset="utf-8"><title>KMSB API</title>
  <style>body{font-family:system-ui,Segoe UI,Arial,sans-serif;padding:24px;line-height:1.6}</style>
  </head><body>
  <h1>KMSB API</h1>
  <p>APIは稼働中です。主要エンドポイント:</p>
  <ul>
    <li><a href="/health">/health</a> — ヘルスチェック</li>
    <li><a href="/profiles">/profiles</a> — プロフィール一覧（GET）</li>
  </ul>
  <p>POST/詳細は README を参照してください。</p>
  </body></html>`);
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/profiles', profilesRouter);
app.use('/', matchRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`KMSB API listening on http://localhost:${port}`);
});
