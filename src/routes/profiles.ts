import { Router, Request, Response } from 'express';
import { db } from '../store';
import { ProfileSchema } from '../types';

export const profilesRouter = Router();

profilesRouter.get('/', (_req: Request, res: Response) => {
  const list = db.listProfiles();
  res.json({ count: list.length, items: list });
});

profilesRouter.post('/', (req: Request, res: Response) => {
  const parsed = ProfileSchema.omit({ id: true, createdAt: true }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid payload', details: parsed.error.issues });
  }
  const created = db.addProfile(parsed.data);
  res.status(201).json(created);
});

profilesRouter.get('/:id', (req: Request, res: Response) => {
  const p = db.getProfile(req.params.id);
  if (!p) return res.status(404).json({ error: 'profile not found' });
  res.json(p);
});

profilesRouter.patch('/:id', (req: Request, res: Response) => {
  const parsed = ProfileSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid payload', details: parsed.error.issues });
  }
  const updated = db.updateProfile(req.params.id, parsed.data);
  if (!updated) return res.status(404).json({ error: 'profile not found' });
  res.json(updated);
});
