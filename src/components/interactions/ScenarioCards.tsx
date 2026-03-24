'use client';

import { useState, useCallback } from 'react';
import { scenarios } from '@/data/scenarios';
import { getOrganism } from '@/data/organisms';
import { Button } from '@/components/ui/Button';

interface ScenarioCardsProps {
  instructions: string;
  onComplete: () => void;
}

export function ScenarioCards({ instructions, onComplete }: ScenarioCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [viewedScenarios, setViewedScenarios] = useState<Set<number>>(new Set());

  const scenario = scenarios[currentIndex];
  const isLastScenario = currentIndex >= scenarios.length - 1;
  const viewedEnough = viewedScenarios.size >= 3;

  const handleReveal = useCallback(() => {
    setRevealed(true);
    setViewedScenarios(prev => new Set(prev).add(currentIndex));
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (isLastScenario) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    setRevealed(false);
  }, [isLastScenario]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-4 pb-2">
        <p className="text-base text-dim">{instructions}</p>
        <div className="text-sm text-dim mt-1">
          Scenario {currentIndex + 1} of {scenarios.length} · {viewedScenarios.size} unique explored
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col items-center">
        <div className="w-full max-w-md">
          {/* Scenario card */}
          <div className="eco-card overflow-hidden">
            {/* Header */}
            <div className="p-5 bg-forest-light/10 border-b border-surface">
              <div className="text-xs text-dim uppercase tracking-wide mb-1">What if...</div>
              <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-fredoka)' }}>
                {scenario.title}
              </h3>
              <p className="text-sm text-dim mt-2">{scenario.change}</p>
            </div>

            {!revealed ? (
              <button
                onClick={handleReveal}
                className="touch-target w-full p-6 text-center active:bg-surface/50 transition-colors"
              >
                <div className="text-3xl mb-2">🤔</div>
                <div className="text-base font-semibold text-sky">
                  Tap to see what happens
                </div>
              </button>
            ) : (
              <div className="p-5 animate-slide-in">
                <div className="text-xs text-dim uppercase tracking-wide mb-3">
                  Ripple effects:
                </div>
                <div className="space-y-3">
                  {scenario.effects.map((effect, i) => {
                    const org = getOrganism(effect.organism);
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 animate-slide-in"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                          ${effect.direction === 'increase'
                            ? 'bg-correct/20 text-correct'
                            : effect.direction === 'decrease'
                            ? 'bg-incorrect/20 text-incorrect'
                            : 'bg-surface text-dim'
                          }
                        `}>
                          {effect.direction === 'increase' ? '↑' : effect.direction === 'decrease' ? '↓' : '—'}
                        </div>
                        <div>
                          <div className="text-sm font-semibold">
                            {org?.name || effect.organism}
                          </div>
                          <div className="text-xs text-dim">{effect.effect}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          {revealed && (
            <div className="mt-4 flex gap-3 animate-fade-in">
              <Button onClick={handleNext} variant="secondary" className="flex-1">
                {isLastScenario ? 'Start over' : 'Next scenario →'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {viewedEnough && (
        <div className="px-6 py-4 border-t border-surface">
          <Button onClick={onComplete} size="md" className="w-full">
            Continue →
          </Button>
        </div>
      )}
    </div>
  );
}
