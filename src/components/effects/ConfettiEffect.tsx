'use client';

import type { Particle } from '@/hooks/useConfetti';

interface ConfettiEffectProps {
  particles: Particle[];
  active: boolean;
}

export function ConfettiEffect({ particles, active }: ConfettiEffectProps) {
  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {particles.map((p) => {
        const radians = (p.angle * Math.PI) / 180;
        const px = Math.cos(radians) * p.velocity;
        const py = Math.sin(radians) * p.velocity * -1; // negative = up

        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              '--px': `${px}px`,
              '--py': `${py}px`,
              animation: 'particle-burst 0.8s ease-out forwards',
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
