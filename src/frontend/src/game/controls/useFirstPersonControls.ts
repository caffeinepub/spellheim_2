import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { checkCollision } from '../physics/collision';

export function useFirstPersonControls() {
  const [position, setPosition] = useState<[number, number, number]>([0, 1.7, 0]);
  const [rotation, setRotation] = useState<[number, number]>([0, 0]);
  
  const keysPressed = useRef<Set<string>>(new Set());
  const mouseMovement = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement) {
        mouseMovement.current.x += e.movementX;
        mouseMovement.current.y += e.movementY;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((_, delta) => {
    if (!document.pointerLockElement) return;

    // Update rotation from mouse
    const sensitivity = 0.002;
    const newRotX = rotation[0] - mouseMovement.current.y * sensitivity;
    const newRotY = rotation[1] - mouseMovement.current.x * sensitivity;
    
    setRotation([
      Math.max(-Math.PI / 2, Math.min(Math.PI / 2, newRotX)),
      newRotY
    ]);
    mouseMovement.current = { x: 0, y: 0 };

    // Update position from keys
    const speed = 5 * delta;
    let newX = position[0];
    let newZ = position[2];

    const forward = [Math.sin(rotation[1]), Math.cos(rotation[1])];
    const right = [Math.cos(rotation[1]), -Math.sin(rotation[1])];

    if (keysPressed.current.has('w')) {
      newX += forward[0] * speed;
      newZ += forward[1] * speed;
    }
    if (keysPressed.current.has('s')) {
      newX -= forward[0] * speed;
      newZ -= forward[1] * speed;
    }
    if (keysPressed.current.has('a')) {
      newX -= right[0] * speed;
      newZ -= right[1] * speed;
    }
    if (keysPressed.current.has('d')) {
      newX += right[0] * speed;
      newZ += right[1] * speed;
    }

    // Apply collision bounds
    const bounds = 45;
    newX = Math.max(-bounds, Math.min(bounds, newX));
    newZ = Math.max(-bounds, Math.min(bounds, newZ));

    setPosition([newX, position[1], newZ]);
  });

  return {
    position,
    rotation,
    updatePosition: setPosition,
  };
}

