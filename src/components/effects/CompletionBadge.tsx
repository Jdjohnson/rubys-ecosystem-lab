'use client';

interface CompletionBadgeProps {
  moduleName: string;
  moduleIcon: string;
  onContinue: () => void;
}

export function CompletionBadge({ moduleName, moduleIcon, onContinue }: CompletionBadgeProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/30">
      <div className="bg-card rounded-3xl p-8 mx-6 text-center animate-bounce-in shadow-xl max-w-sm">
        <div className="text-6xl mb-4 animate-scale-in" style={{ animationDelay: '200ms' }}>
          {moduleIcon}
        </div>
        <div className="text-3xl mb-1" style={{ fontFamily: 'var(--font-fredoka)' }}>
          Module Complete!
        </div>
        <div className="text-lg text-dim mb-2">{moduleName}</div>
        <div className="text-5xl my-4">⭐</div>
        <button
          onClick={onContinue}
          className="touch-target mt-4 px-8 py-3 bg-forest-light text-white font-bold rounded-2xl text-lg shadow-md active:scale-97 transition-transform"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
