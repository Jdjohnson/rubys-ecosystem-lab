'use client';

import { useState, useCallback } from 'react';

export interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  velocity: number;
}

const COLORS = ['#4ade80', '#60a5fa', '#f59e0b', '#ec4899', '#a855f7', '#14b8a6'];

export function useConfetti() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [active, setActive] = useState(false);

  const fire = useCallback((originX: number = 50, originY: number = 50) => {
    const newParticles: Particle[] = Array.from({ length: 16 }, (_, i) => ({
      id: Date.now() + i,
      x: originX,
      y: originY,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 6,
      angle: (360 / 16) * i + (Math.random() * 20 - 10),
      velocity: 80 + Math.random() * 60,
    }));

    setParticles(newParticles);
    setActive(true);

    setTimeout(() => {
      setActive(false);
      setParticles([]);
    }, 800);
  }, []);

  return { particles, active, fire };
}
