import { z } from 'zod';

export const ProfileSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  university: z.string().min(1),
  skills: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  createdAt: z.string().datetime().optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export type MatchRequest = {
  requesterId: string;
  limit?: number;
};

export type MatchResult = {
  targetId: string;
  score: number;
};

