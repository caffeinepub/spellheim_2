import { create } from 'zustand';
import { BiomeType } from './biomes';

interface BiomeStore {
  currentBiome: BiomeType;
  setBiome: (biome: BiomeType) => void;
}

export const useBiomeStore = create<BiomeStore>((set) => ({
  currentBiome: 'forest',
  setBiome: (biome) => set({ currentBiome: biome }),
}));

