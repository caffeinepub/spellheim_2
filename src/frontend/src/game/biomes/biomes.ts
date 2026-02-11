export type BiomeType = 'forest' | 'desert' | 'mountains';

export interface BiomeConfig {
  name: string;
  skyColor: string;
  groundColor: string;
  fogColor: string;
  fogDensity: number;
  ambientLightColor: string;
  ambientLightIntensity: number;
  directionalLightColor: string;
  directionalLightIntensity: number;
}

export const BIOMES: Record<BiomeType, BiomeConfig> = {
  forest: {
    name: 'Enchanted Forest',
    skyColor: '#87ceeb',
    groundColor: '#4a5f3a',
    fogColor: '#b8d4b8',
    fogDensity: 0.02,
    ambientLightColor: '#ffffff',
    ambientLightIntensity: 0.5,
    directionalLightColor: '#ffffcc',
    directionalLightIntensity: 0.8,
  },
  desert: {
    name: 'Scorched Wastes',
    skyColor: '#ffd89b',
    groundColor: '#d4a574',
    fogColor: '#ffe4b5',
    fogDensity: 0.015,
    ambientLightColor: '#fff5e6',
    ambientLightIntensity: 0.7,
    directionalLightColor: '#ffcc66',
    directionalLightIntensity: 1.2,
  },
  mountains: {
    name: 'Frozen Peaks',
    skyColor: '#b0c4de',
    groundColor: '#8b9dc3',
    fogColor: '#d3d3d3',
    fogDensity: 0.025,
    ambientLightColor: '#e6f2ff',
    ambientLightIntensity: 0.6,
    directionalLightColor: '#ffffff',
    directionalLightIntensity: 1.0,
  },
};

