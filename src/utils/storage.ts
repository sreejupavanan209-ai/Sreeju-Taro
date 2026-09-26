import { ReadingRecord, UserProfile } from '../types';

const STORAGE_KEYS = {
  PROFILES: 'mystic_tarot_profiles_v1',
  ACTIVE_PROFILE_ID: 'mystic_tarot_active_profile_id_v1',
  READINGS: 'mystic_tarot_readings_v1'
};

// Seed sample historical reading if empty for demonstration
const SAMPLE_PROFILES: UserProfile[] = [
  {
    id: 'seeker-seraphina',
    name: 'Seraphina Vance',
    age: 28,
    dateOfBirth: '1998-07-21',
    timeOfBirth: '07:14',
    createdAt: '2026-09-01T10:00:00.000Z'
  }
];

export function getAllProfiles(): UserProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(SAMPLE_PROFILES));
      return SAMPLE_PROFILES;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_PROFILES;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    const profiles = getAllProfiles();
    const existingIndex = profiles.findIndex(p => p.id === profile.id);
    if (existingIndex >= 0) {
      profiles[existingIndex] = profile;
    } else {
      profiles.unshift(profile);
    }
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, profile.id);
  } catch (err) {
    console.error('Failed to save user profile:', err);
  }
}

export function getActiveProfile(): UserProfile | null {
  try {
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE_ID);
    const profiles = getAllProfiles();
    if (activeId) {
      const match = profiles.find(p => p.id === activeId);
      if (match) return match;
    }
    return profiles[0] || null;
  } catch {
    return null;
  }
}

export function setActiveProfileId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, id);
  } catch {}
}

export function getAllReadings(): ReadingRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.READINGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getReadingsForUser(userId: string): ReadingRecord[] {
  const all = getAllReadings();
  return all.filter(r => r.userId === userId);
}

export function saveReading(reading: ReadingRecord): void {
  try {
    const all = getAllReadings();
    const idx = all.findIndex(r => r.id === reading.id);
    if (idx >= 0) {
      all[idx] = reading;
    } else {
      all.unshift(reading);
    }
    localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to save reading:', err);
  }
}

export function deleteReading(id: string): void {
  try {
    const all = getAllReadings().filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(all));
  } catch {}
}
