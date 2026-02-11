export interface AABB {
  min: [number, number, number];
  max: [number, number, number];
}

export function checkCollision(
  position: [number, number, number],
  bounds: AABB
): boolean {
  return (
    position[0] >= bounds.min[0] &&
    position[0] <= bounds.max[0] &&
    position[1] >= bounds.min[1] &&
    position[1] <= bounds.max[1] &&
    position[2] >= bounds.min[2] &&
    position[2] <= bounds.max[2]
  );
}

export function clampToBounds(
  position: [number, number, number],
  bounds: AABB
): [number, number, number] {
  return [
    Math.max(bounds.min[0], Math.min(bounds.max[0], position[0])),
    Math.max(bounds.min[1], Math.min(bounds.max[1], position[1])),
    Math.max(bounds.min[2], Math.min(bounds.max[2], position[2])),
  ];
}

export function getDistance(
  pos1: [number, number, number],
  pos2: [number, number, number]
): number {
  const dx = pos1[0] - pos2[0];
  const dy = pos1[1] - pos2[1];
  const dz = pos1[2] - pos2[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

