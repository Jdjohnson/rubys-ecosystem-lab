'use client';

interface StepDotsProps {
  total: number;
  current: number;
  color?: string;
}

export function StepDots({ total, current, color }: StepDotsProps) {
  return (
    <div className="flex gap-2 items-center justify-center">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? 'w-3 h-3'
              : i < current
              ? 'w-2.5 h-2.5'
              : 'w-2 h-2'
          }`}
          style={{
            backgroundColor:
              i <= current
                ? color || 'var(--forest-light)'
                : 'var(--bg-surface)',
          }}
        />
      ))}
    </div>
  );
}
