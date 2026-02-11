export interface CharacterProfile {
  name: string;
  archetype: string;
  cosmeticOptions: string[];
}

export const DEFAULT_PROFILE: CharacterProfile = {
  name: '',
  archetype: 'mage',
  cosmeticOptions: ['Short', 'Black', 'Fair'],
};

export function validateProfile(profile: Partial<CharacterProfile>): boolean {
  return !!(profile.name && profile.name.trim().length > 0);
}

