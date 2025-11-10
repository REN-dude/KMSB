import { Profile } from './types';
import { randomUUID } from 'crypto';

class InMemoryStore {
  private profiles: Map<string, Profile> = new Map();
  private likes: Map<string, Set<string>> = new Map();

  addProfile(data: Omit<Profile, 'id' | 'createdAt'>): Profile {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const profile: Profile = { id, createdAt, ...data } as Profile;
    this.profiles.set(id, profile);
    return profile;
  }

  listProfiles(): Profile[] {
    return Array.from(this.profiles.values());
  }

  getProfile(id: string): Profile | undefined {
    return this.profiles.get(id);
  }

  updateProfile(id: string, patch: Partial<Omit<Profile, 'id' | 'createdAt'>>): Profile | undefined {
    const current = this.profiles.get(id);
    if (!current) return undefined;
    const updated: Profile = { ...current, ...patch } as Profile;
    this.profiles.set(id, updated);
    return updated;
  }

  addLike(fromId: string, toId: string): { ok: boolean; mutual: boolean } {
    if (!this.profiles.has(fromId) || !this.profiles.has(toId)) return { ok: false, mutual: false };
    if (!this.likes.has(fromId)) this.likes.set(fromId, new Set());
    this.likes.get(fromId)!.add(toId);
    const mutual = this.likes.get(toId)?.has(fromId) ?? false;
    return { ok: true, mutual };
  }

  getMutualMatches(userId: string): string[] {
    const liked = this.likes.get(userId) ?? new Set<string>();
    const result: string[] = [];
    for (const toId of liked) {
      if (this.likes.get(toId)?.has(userId)) {
        result.push(toId);
      }
    }
    return result;
  }
}

export const db = new InMemoryStore();
