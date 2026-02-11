import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useActor } from '../hooks/useActor';
import { CharacterProfile, DEFAULT_PROFILE } from './characterProfile';
import type { CharacterProfile as BackendProfile } from '../backend';

const LOCAL_STORAGE_KEY = 'spellheim_character_profile';

export function useCharacterProfile() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const [profile, setProfile] = useState<CharacterProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      
      // Try to load from backend if authenticated
      if (identity && actor) {
        try {
          const backendProfile = await actor.getCallerCharacterProfile();
          if (backendProfile) {
            const localProfile: CharacterProfile = {
              name: backendProfile.name,
              archetype: backendProfile.archetype,
              cosmeticOptions: backendProfile.cosmeticOptions,
            };
            setProfile(localProfile);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localProfile));
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error('Failed to load profile from backend:', error);
        }
      }

      // Fall back to local storage
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localData) {
        try {
          setProfile(JSON.parse(localData));
        } catch (error) {
          console.error('Failed to parse local profile:', error);
          setProfile(null);
        }
      }
      
      setIsLoading(false);
    };

    loadProfile();
  }, [identity, actor]);

  const updateProfile = async (updates: Partial<CharacterProfile>) => {
    const newProfile = { ...DEFAULT_PROFILE, ...profile, ...updates };
    setProfile(newProfile);
    
    // Save to local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProfile));

    // Save to backend if authenticated
    if (identity && actor) {
      try {
        const backendProfile: BackendProfile = {
          name: newProfile.name,
          archetype: newProfile.archetype,
          cosmeticOptions: newProfile.cosmeticOptions,
          audioVolume: BigInt(75),
          basicStats: BigInt(0),
        };
        await actor.saveCharacterProfile(backendProfile);
      } catch (error) {
        console.error('Failed to save profile to backend:', error);
      }
    }
  };

  return {
    profile,
    updateProfile,
    isLoading,
  };
}

