import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Physics } from '@react-three/cannon';
import BiomeEnvironment from './biomes/BiomeEnvironment';
import { useFirstPersonControls } from './controls/useFirstPersonControls';
import { useSpellSystem } from './spells/useSpellSystem';
import SpellEffects from './spells/SpellEffects';
import HostileCreature from './entities/HostileCreature';
import NPC from './entities/NPC';
import { useCombatState } from './combat/useCombatState';
import { BiomeType } from './biomes/biomes';
import { useBiomeStore } from './biomes/useBiomeStore';

function GameScene() {
  const { position, rotation, updatePosition } = useFirstPersonControls();
  const { spells, castSpell, mana, updateMana } = useSpellSystem();
  const { playerHealth, damagePlayer, healPlayer } = useCombatState();
  const currentBiome = useBiomeStore((state) => state.currentBiome);

  const [activeSpells, setActiveSpells] = useState<Array<{ id: string; type: string; position: [number, number, number]; direction: [number, number, number]; timestamp: number }>>([]);
  const [creatureHealth, setCreatureHealth] = useState(100);
  const [creatureDefeated, setCreatureDefeated] = useState(false);

  const handleSpellCast = (spellType: string) => {
    const spell = spells.find(s => s.id === spellType);
    if (!spell || !castSpell(spellType)) return;

    const spellId = `${spellType}-${Date.now()}`;
    const direction: [number, number, number] = [
      Math.sin(rotation[1]),
      0,
      Math.cos(rotation[1])
    ];

    setActiveSpells(prev => [...prev, {
      id: spellId,
      type: spellType,
      position: [position[0], position[1] + 1.5, position[2]],
      direction,
      timestamp: Date.now()
    }]);

    setTimeout(() => {
      setActiveSpells(prev => prev.filter(s => s.id !== spellId));
    }, 3000);
  };

  const handleSpellHit = (spellId: string) => {
    if (creatureDefeated) return;
    
    const spell = activeSpells.find(s => s.id === spellId);
    if (!spell) return;

    const damage = spell.type === 'projectile' ? 25 : spell.type === 'area' ? 35 : 0;
    const newHealth = Math.max(0, creatureHealth - damage);
    setCreatureHealth(newHealth);

    if (newHealth === 0) {
      setCreatureDefeated(true);
      setTimeout(() => {
        setCreatureDefeated(false);
        setCreatureHealth(100);
      }, 5000);
    }

    setActiveSpells(prev => prev.filter(s => s.id !== spellId));
  };

  const handleCreatureAttack = () => {
    damagePlayer(10);
  };

  return (
    <>
      <BiomeEnvironment biome={currentBiome} />
      
      <SpellEffects
        activeSpells={activeSpells}
        onSpellHit={handleSpellHit}
      />

      {!creatureDefeated && (
        <HostileCreature
          position={[10, 0, 10]}
          playerPosition={position}
          health={creatureHealth}
          onAttack={handleCreatureAttack}
        />
      )}

      <NPC
        position={[-8, 0, -8]}
        playerPosition={position}
        biome={currentBiome}
      />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#4a5f3a" />
      </mesh>
    </>
  );
}

export default function SpellheimCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 1.7, 0], fov: 75 }}
        onClick={(e) => {
          if (document.pointerLockElement === null) {
            (e.target as HTMLElement).requestPointerLock();
          }
        }}
      >
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.8, 0]}>
            <GameScene />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}

