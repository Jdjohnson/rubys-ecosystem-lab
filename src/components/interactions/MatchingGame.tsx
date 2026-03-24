'use client';

import { useState, useCallback, useMemo } from 'react';
import { shuffle } from '@/lib/shuffle';
import { FeedbackOverlay } from '@/components/ui/FeedbackOverlay';
import { Button } from '@/components/ui/Button';

interface MatchPair {
  organismId: string;
  organismLabel: string;
  needId: string;
  needLabel: string;
}

interface MatchingGameProps {
  instructions: string;
  pairs: MatchPair[];
  onComplete: () => void;
}

export function MatchingGame({ instructions, pairs, onComplete }: MatchingGameProps) {
  const shuffledNeeds = useMemo(() => shuffle(pairs.map(p => ({ id: p.needId, label: p.needLabel }))), [pairs]);
  const [selectedOrganism, setSelectedOrganism] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // organismId -> needId
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; message?: string } | null>(null);

  const matchedOrganisms = useMemo(() => new Set(Object.keys(matches)), [matches]);
  const matchedNeeds = useMemo(() => new Set(Object.values(matches)), [matches]);
  const allDone = Object.keys(matches).length === pairs.length;

  const handleOrganismTap = useCallback((organismId: string) => {
    if (matchedOrganisms.has(organismId)) return;
    setSelectedOrganism(prev => prev === organismId ? null : organismId);
  }, [matchedOrganisms]);

  const handleNeedTap = useCallback((needId: string) => {
    if (!selectedOrganism || matchedNeeds.has(needId)) return;

    const pair = pairs.find(p => p.organismId === selectedOrganism);
    if (pair && pair.needId === needId) {
      setMatches(prev => ({ ...prev, [selectedOrganism]: needId }));
      setFeedback({ type: 'correct' });
    } else {
      setFeedback({ type: 'incorrect', message: 'Try a different match.' });
    }
    setSelectedOrganism(null);
  }, [selectedOrganism, matchedNeeds, pairs]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-4 pb-2">
        <p className="text-base text-dim">{instructions}</p>
        <div className="mt-2 text-sm text-dim">
          {Object.keys(matches).length} / {pairs.length} matched
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          {/* Left column: organisms */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-dim uppercase tracking-wide text-center mb-2">
              Organism
            </div>
            {pairs.map((pair) => {
              const isMatched = matchedOrganisms.has(pair.organismId);
              const isSelected = selectedOrganism === pair.organismId;
              return (
                <button
                  key={pair.organismId}
                  onClick={() => handleOrganismTap(pair.organismId)}
                  disabled={isMatched}
                  className={`
                    touch-target eco-card w-full p-3 text-center text-sm font-semibold
                    transition-all duration-200
                    ${isMatched ? 'eco-card-correct opacity-70' : ''}
                    ${isSelected ? 'ring-3 ring-sky scale-105 shadow-lg' : ''}
                    ${!isMatched && !isSelected ? 'active:scale-95' : ''}
                  `}
                >
                  {pair.organismLabel}
                  {isMatched && <span className="ml-1 text-correct">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Right column: needs */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-dim uppercase tracking-wide text-center mb-2">
              What It Needs
            </div>
            {shuffledNeeds.map((need) => {
              const isMatched = matchedNeeds.has(need.id);
              return (
                <button
                  key={need.id}
                  onClick={() => handleNeedTap(need.id)}
                  disabled={isMatched || !selectedOrganism}
                  className={`
                    touch-target eco-card w-full p-3 text-center text-sm font-semibold
                    transition-all duration-200
                    ${isMatched ? 'eco-card-correct opacity-70' : ''}
                    ${selectedOrganism && !isMatched ? 'border-2 border-dashed border-sky/40 active:scale-95' : ''}
                    ${!selectedOrganism && !isMatched ? 'opacity-50' : ''}
                  `}
                >
                  {need.label}
                  {isMatched && <span className="ml-1 text-correct">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {allDone && (
        <div className="px-6 py-4 border-t border-surface">
          <Button onClick={onComplete} size="lg" className="w-full">
            All matched! Continue →
          </Button>
        </div>
      )}

      <FeedbackOverlay
        type={feedback?.type ?? null}
        message={feedback?.message}
        onDone={() => setFeedback(null)}
      />
    </div>
  );
}
