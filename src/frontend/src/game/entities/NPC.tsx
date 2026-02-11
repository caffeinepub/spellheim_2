import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getDistance } from '../physics/collision';
import { useInteractionStore } from '../interactions/useInteractionStore';
import { BiomeType } from '../biomes/biomes';

interface NPCProps {
  position: [number, number, number];
  playerPosition: [number, number, number];
  biome: BiomeType;
}

const NPC_DIALOGUES: Record<BiomeType, string[]> = {
  forest: [
    "Greetings, traveler! The forest whispers of your arrival. These ancient trees have seen many mages pass through.",
    "Be wary of the creatures that lurk in the shadows. They grow more aggressive as night falls.",
  ],
  desert: [
    "The sands shift endlessly here, stranger. Many have lost their way in this vast expanse.",
    "I sense great power within you. The desert tests all who enter, but rewards the worthy.",
  ],
  mountains: [
    "Welcome to the peaks, spellcaster. The air is thin here, but the magic flows strong.",
    "These mountains hold ancient secrets. Perhaps you are the one destined to uncover them.",
  ],
};

export default function NPC({ position, playerPosition, biome }: NPCProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [isNearby, setIsNearby] = useState(false);
  const { setCanInteract, setDialogue, setShowDialogue } = useInteractionStore();

  useFrame((state) => {
    if (!meshRef.current) return;

    const distance = getDistance(position, playerPosition);
    const nearby = distance < 3;
    
    if (nearby !== isNearby) {
      setIsNearby(nearby);
      setCanInteract(nearby);
      
      if (!nearby) {
        setShowDialogue(false);
      }
    }

    // Idle animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
    
    // Look at player when nearby
    if (nearby) {
      const playerVec = new THREE.Vector3(...playerPosition);
      meshRef.current.lookAt(playerVec);
    }
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'e' && isNearby) {
        setDialogue(NPC_DIALOGUES[biome]);
        setShowDialogue(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isNearby, biome, setDialogue, setShowDialogue]);

  return (
    <group ref={meshRef} position={position}>
      {/* Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 2, 16]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 2.3, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>

      {/* Hat */}
      <mesh position={[0, 2.9, 0]} castShadow>
        <coneGeometry args={[0.5, 0.8, 16]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>

      {/* Staff */}
      <mesh position={[0.6, 1, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2.5, 8]} />
        <meshStandardMaterial color="#92400e" />
      </mesh>
      <mesh position={[0.6, 2.3, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
        <pointLight color="#3b82f6" intensity={2} distance={3} />
      </mesh>

      {/* Interaction indicator */}
      {isNearby && (
        <mesh position={[0, 3.5, 0]}>
          <ringGeometry args={[0.3, 0.4, 16]} />
          <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

