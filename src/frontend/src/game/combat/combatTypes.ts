export interface CombatEntity {
  health: number;
  maxHealth: number;
  isAlive: boolean;
}

export function applyDamage(entity: CombatEntity, damage: number): CombatEntity {
  const newHealth = Math.max(0, entity.health - damage);
  return {
    ...entity,
    health: newHealth,
    isAlive: newHealth > 0,
  };
}

export function heal(entity: CombatEntity, amount: number): CombatEntity {
  return {
    ...entity,
    health: Math.min(entity.maxHealth, entity.health + amount),
  };
}

