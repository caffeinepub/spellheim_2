import { useState, useEffect } from 'react';
import { getDistance } from '../physics/collision';

export function useCreatureAI(
  initialPosition: [number, number, number],
  playerPosition: [number, number, number]
) {
  const [shouldAttack, setShouldAttack] = useState(false);
  const detectionRange = 15;
  const attackRange = 3;
  const moveSpeed = 2;

  useEffect(() => {
    const distance = getDistance(initialPosition, playerPosition);
    setShouldAttack(distance < attackRange);
  }, [playerPosition, initialPosition]);

  const moveTowardsPlayer = (
    currentPos: [number, number, number],
    delta: number
  ): [number, number, number] => {
    const distance = getDistance(currentPos, playerPosition);

    if (distance > detectionRange || distance < attackRange) {
      return currentPos;
    }

    const direction: [number, number, number] = [
      playerPosition[0] - currentPos[0],
      0,
      playerPosition[2] - currentPos[2],
    ];

    const length = Math.sqrt(direction[0] ** 2 + direction[2] ** 2);
    if (length === 0) return currentPos;

    const normalized: [number, number, number] = [
      direction[0] / length,
      0,
      direction[2] / length,
    ];

    return [
      currentPos[0] + normalized[0] * moveSpeed * delta,
      currentPos[1],
      currentPos[2] + normalized[2] * moveSpeed * delta,
    ];
  };

  return {
    shouldAttack,
    moveTowardsPlayer,
  };
}

