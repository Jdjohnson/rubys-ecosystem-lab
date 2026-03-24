'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/Button';

interface CompletionBadgeProps {
  moduleName: string;
  moduleIcon: string;
  onContinue: () => void;
}

export function CompletionBadge({ moduleName, moduleIcon, onContinue }: CompletionBadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/30">
      <div className={`bg-card rounded-3xl p-8 mx-6 text-center shadow-xl max-w-sm ${prefersReducedMotion ? '' : 'animate-bounce-in'}`}>
        <div
          className={`text-6xl mb-4 ${prefersReducedMotion ? '' : 'animate-scale-in'}`}
          style={{ animationDelay: '200ms' }}
        >
          {moduleIcon}
        </div>
        <div className="text-3xl mb-1" style={{ fontFamily: 'var(--font-fredoka)' }}>
          Module Complete!
        </div>
        <div className="text-lg text-dim mb-2">{moduleName}</div>
        <div className="text-5xl my-4">⭐</div>
        <Button onClick={onContinue} size="lg" className="mt-4">
          Continue
        </Button>
      </div>
    </div>
  );
}
