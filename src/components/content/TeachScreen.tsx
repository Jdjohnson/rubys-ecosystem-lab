'use client';

import type { ModuleStep } from '@/lib/types';
import { Button } from '@/components/ui/Button';

interface TeachScreenProps {
  step: ModuleStep;
  onNext: () => void;
}

function renderContent(content: string) {
  // Simple markdown-ish renderer: bold, line breaks, bullets
  const lines = content.split('\n');
  return lines.map((line, i) => {
    if (line.trim() === '') return <br key={i} />;

    // Process bold
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={j} className="text-foreground font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    // Bullet points
    if (line.trim().startsWith('•') || line.trim().startsWith('- ')) {
      return (
        <div key={i} className="flex gap-2 pl-2 mb-1">
          <span className="text-forest-light font-bold">•</span>
          <span>{rendered}</span>
        </div>
      );
    }

    return (
      <p key={i} className="mb-3 leading-relaxed">
        {rendered}
      </p>
    );
  });
}

export function TeachScreen({ step, onNext }: TeachScreenProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <h2
          className="text-2xl font-bold text-foreground mb-6"
          style={{ fontFamily: 'var(--font-fredoka)' }}
        >
          {step.title}
        </h2>

        <div className="text-lg text-foreground/85 leading-relaxed max-w-lg">
          {step.content && renderContent(step.content)}
        </div>

        {step.keyLine && (
          <div className="mt-6 p-4 bg-gold-light/30 border-l-4 border-gold rounded-r-xl">
            <p className="text-base font-semibold text-foreground">
              {step.keyLine}
            </p>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-surface">
        <Button onClick={onNext} size="lg" className="w-full">
          Got it! Next →
        </Button>
      </div>
    </div>
  );
}
