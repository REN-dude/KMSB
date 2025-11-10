import { Profile } from './types.js';
import { randomUUID } from 'crypto';

class InMemoryStore {
  private profiles: Map<string, Profile> = new Map();

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
}

export const db = new InMemoryStore();

