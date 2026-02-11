import { useState } from 'react';

export function useCombatState() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const maxHealth = 100;

  const damagePlayer = (amount: number) => {
    setPlayerHealth(prev => Math.max(0, prev - amount));
  };

  const healPlayer = (amount: number) => {
    setPlayerHealth(prev => Math.min(maxHealth, prev + amount));
  };

  return {
    playerHealth,
    maxHealth,
    damagePlayer,
    healPlayer,
  };
}

