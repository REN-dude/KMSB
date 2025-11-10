import { Profile } from './types';

function jaccard(a: string[], b: string[]): number {
  const A = new Set(a.map((s) => s.toLowerCase())) as Set<string>;
  const B = new Set(b.map((s) => s.toLowerCase())) as Set<string>;
  const intersection = new Set([...A].filter((x) => B.has(x)));
  const union = new Set([...A, ...B]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

export function computeMatchScore(
  a: Profile,
  b: Profile,
  weights: { skills: number; interests: number; university: number } = {
    skills: 0.6,
    interests: 0.3,
    university: 0.1,
  },
): number {
  const skills = jaccard(a.skills ?? [], b.skills ?? []);
  const interests = jaccard(a.interests ?? [], b.interests ?? []);
  const university = a.university && b.university && a.university === b.university ? 1 : 0;
  const totalWeight = weights.skills + weights.interests + weights.university || 1;
  const score =
    (weights.skills * skills + weights.interests * interests + weights.university * university) /
    totalWeight;
  return Math.max(0, Math.min(1, score));
}

