import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { BIOMES, BiomeType } from './biomes';

interface BiomeEnvironmentProps {
  biome: BiomeType;
}

export default function BiomeEnvironment({ biome }: BiomeEnvironmentProps) {
  const { scene } = useThree();
  const config = BIOMES[biome];

  useEffect(() => {
    scene.background = new THREE.Color(config.skyColor);
    scene.fog = new THREE.FogExp2(config.fogColor, config.fogDensity);
  }, [biome, config, scene]);

  return (
    <>
      <ambientLight color={config.ambientLightColor} intensity={config.ambientLightIntensity} />
      <directionalLight
        color={config.directionalLightColor}
        intensity={config.directionalLightIntensity}
        position={[10, 20, 10]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Biome-specific props */}
      {biome === 'forest' && (
        <>
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.random() * 80 - 40,
                2,
                Math.random() * 80 - 40,
              ]}
              castShadow
            >
              <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
              <meshStandardMaterial color="#3d2817" />
            </mesh>
          ))}
        </>
      )}

      {biome === 'desert' && (
        <>
          {Array.from({ length: 15 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.random() * 80 - 40,
                0.5,
                Math.random() * 80 - 40,
              ]}
              rotation={[0, Math.random() * Math.PI, 0]}
            >
              <coneGeometry args={[1, 2, 4]} />
              <meshStandardMaterial color="#c19a6b" />
            </mesh>
          ))}
        </>
      )}

      {biome === 'mountains' && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.random() * 80 - 40,
                Math.random() * 3,
                Math.random() * 80 - 40,
              ]}
              castShadow
            >
              <dodecahedronGeometry args={[1 + Math.random() * 2, 0]} />
              <meshStandardMaterial color="#708090" />
            </mesh>
          ))}
        </>
      )}
    </>
  );
}

