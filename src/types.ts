import { z } from 'zod';

export const ProfileSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  university: z.string().min(1),
  skills: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  bio: z.string().max(500).optional().default(''),
  lookingFor: z.string().max(200).optional().default(''),
  createdAt: z.string().datetime().optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const LikeSchema = z.object({
  fromId: z.string().uuid(),
  toId: z.string().uuid(),
});
export type Like = z.infer<typeof LikeSchema>;

export const MatchRequestSchema = z.object({
  requesterId: z.string().uuid(),
  limit: z.number().int().min(1).max(50).optional().default(5),
  weights: z
    .object({
      skills: z.number().min(0).max(1).optional().default(0.6),
      interests: z.number().min(0).max(1).optional().default(0.3),
      university: z.number().min(0).max(1).optional().default(0.1),
    })
    .optional()
    .default({ skills: 0.6, interests: 0.3, university: 0.1 }),
});
export type MatchRequest = z.infer<typeof MatchRequestSchema>;

export type MatchResult = {
  targetId: string;
  score: number;
};

