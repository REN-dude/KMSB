import { Router, Request, Response } from 'express';
import { db } from '../store';
import { MatchRequestSchema, LikeSchema } from '../types';
import { computeMatchScore } from '../matching';

export const matchRouter = Router();

matchRouter.post('/match', (req: Request, res: Response) => {
  const parsed = MatchRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid payload', details: parsed.error.issues });
  }
  const { requesterId, limit, weights } = parsed.data;
  const me = db.getProfile(requesterId);
  if (!me) return res.status(404).json({ error: 'requester not found' });
  const candidates = db
    .listProfiles()
    .filter((p) => p.id !== requesterId)
    .map((p) => ({ targetId: p.id!, score: computeMatchScore(me, p, weights) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  res.json({ count: candidates.length, items: candidates });
});

matchRouter.post('/likes', (req: Request, res: Response) => {
  const parsed = LikeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid payload', details: parsed.error.issues });
  }
  const { fromId, toId } = parsed.data;
  const result = db.addLike(fromId, toId);
  if (!result.ok) return res.status(404).json({ error: 'profile not found' });
  res.status(201).json({ mutual: result.mutual });
});

matchRouter.get('/matches/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const me = db.getProfile(id);
  if (!me) return res.status(404).json({ error: 'profile not found' });
  const ids = db.getMutualMatches(id);
  res.json({ count: ids.length, items: ids });
});

