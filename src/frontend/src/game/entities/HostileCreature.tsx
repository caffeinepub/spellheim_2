import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCreatureAI } from './useCreatureAI';

interface HostileCreatureProps {
  position: [number, number, number];
  playerPosition: [number, number, number];
  health: number;
  onAttack: () => void;
}

export default function HostileCreature({ position, playerPosition, health, onAttack }: HostileCreatureProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { shouldAttack, moveTowardsPlayer } = useCreatureAI(position, playerPosition);
  const [currentPos, setCurrentPos] = useState<[number, number, number]>(position);
  const lastAttackTime = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current || health <= 0) return;

    const newPos = moveTowardsPlayer(currentPos, delta);
    setCurrentPos(newPos);
    meshRef.current.position.set(newPos[0], newPos[1], newPos[2]);

    // Look at player
    const playerVec = new THREE.Vector3(...playerPosition);
    meshRef.current.lookAt(playerVec);

    // Attack logic
    if (shouldAttack && state.clock.elapsedTime - lastAttackTime.current > 2) {
      onAttack();
      lastAttackTime.current = state.clock.elapsedTime;
    }

    // Idle animation
    meshRef.current.position.y = newPos[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  const healthPercent = health / 100;

  return (
    <group ref={meshRef} position={position}>
      {/* Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color={health > 0 ? "#8b0000" : "#444"} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={health > 0 ? "#a00000" : "#555"} />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.2, 2.6, 0.4]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={health > 0 ? 2 : 0} />
      </mesh>
      <mesh position={[-0.2, 2.6, 0.4]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={health > 0 ? 2 : 0} />
      </mesh>

      {/* Health bar */}
      {health > 0 && (
        <group position={[0, 3.5, 0]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[1.5, 0.2]} />
            <meshBasicMaterial color="#333" />
          </mesh>
          <mesh position={[-(1.5 / 2) * (1 - healthPercent), 0, 0.01]}>
            <planeGeometry args={[1.5 * healthPercent, 0.15]} />
            <meshBasicMaterial color={healthPercent > 0.5 ? "#00ff00" : healthPercent > 0.25 ? "#ffff00" : "#ff0000"} />
          </mesh>
        </group>
      )}
    </group>
  );
}

