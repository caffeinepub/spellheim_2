import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ActiveSpell {
  id: string;
  type: string;
  position: [number, number, number];
  direction: [number, number, number];
  timestamp: number;
}

interface SpellEffectsProps {
  activeSpells: ActiveSpell[];
  onSpellHit: (spellId: string) => void;
}

function ProjectileEffect({ spell, onHit }: { spell: ActiveSpell; onHit: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const position = useRef(new THREE.Vector3(...spell.position));
  const direction = useRef(new THREE.Vector3(...spell.direction).normalize());

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    position.current.add(direction.current.clone().multiplyScalar(20 * delta));
    meshRef.current.position.copy(position.current);

    // Check for collision with creatures (simplified)
    if (position.current.length() > 50) {
      onHit();
    }
  });

  return (
    <mesh ref={meshRef} position={spell.position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={2} />
      <pointLight color="#6366f1" intensity={2} distance={5} />
    </mesh>
  );
}

function AreaEffect({ spell, onHit }: { spell: ActiveSpell; onHit: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scale = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    scale.current += delta * 8;
    meshRef.current.scale.setScalar(scale.current);
    
    if (scale.current > 3) {
      onHit();
    }
  });

  return (
    <mesh ref={meshRef} position={spell.position}>
      <torusGeometry args={[1, 0.2, 16, 32]} />
      <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2} transparent opacity={0.7} />
      <pointLight color="#f59e0b" intensity={5} distance={10} />
    </mesh>
  );
}

function ShieldEffect({ spell }: { spell: ActiveSpell }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 2;
  });

  return (
    <mesh ref={meshRef} position={spell.position}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#10b981"
        emissive="#10b981"
        emissiveIntensity={1}
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
}

export default function SpellEffects({ activeSpells, onSpellHit }: SpellEffectsProps) {
  return (
    <>
      {activeSpells.map((spell) => {
        if (spell.type === 'projectile') {
          return <ProjectileEffect key={spell.id} spell={spell} onHit={() => onSpellHit(spell.id)} />;
        }
        if (spell.type === 'area') {
          return <AreaEffect key={spell.id} spell={spell} onHit={() => onSpellHit(spell.id)} />;
        }
        if (spell.type === 'shield') {
          return <ShieldEffect key={spell.id} spell={spell} />;
        }
        return null;
      })}
    </>
  );
}

