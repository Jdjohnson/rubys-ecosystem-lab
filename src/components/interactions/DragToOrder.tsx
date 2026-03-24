'use client';

import { useState, useCallback, useMemo } from 'react';
import { shuffle } from '@/lib/shuffle';
import { FeedbackOverlay } from '@/components/ui/FeedbackOverlay';
import { Button } from '@/components/ui/Button';

interface ChainCardData {
  id: string;
  label: string;
  role: string;
  order: number;
}

interface ChainData {
  id: string;
  name: string;
  cards: ChainCardData[];
}

interface DragToOrderProps {
  instructions: string;
  chains: ChainData[];
  onComplete: () => void;
}

export function DragToOrder({ instructions, chains, onComplete }: DragToOrderProps) {
  const [chainIndex, setChainIndex] = useState(0);
  const chain = chains[chainIndex];
  const shuffled = useMemo(() => shuffle(chain.cards), [chain]);

  const [slots, setSlots] = useState<(ChainCardData | null)[]>(() =>
    Array(chain.cards.length).fill(null)
  );
  const [availableCards, setAvailableCards] = useState<ChainCardData[]>(shuffled);
  const [selectedCard, setSelectedCard] = useState<ChainCardData | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; message?: string } | null>(null);
  const [locked, setLocked] = useState(false);

  const allChainsDone = chainIndex >= chains.length;

  const resetForChain = useCallback((idx: number) => {
    const newChain = chains[idx];
    setSlots(Array(newChain.cards.length).fill(null));
    setAvailableCards(shuffle(newChain.cards));
    setSelectedCard(null);
    setLocked(false);
  }, [chains]);

  const handleCardTap = useCallback((card: ChainCardData) => {
    if (locked) return;
    setSelectedCard(prev => prev?.id === card.id ? null : card);
  }, [locked]);

  const handleSlotTap = useCallback((slotIndex: number) => {
    if (!selectedCard || locked) return;

    // Check if this is the right position
    if (selectedCard.order === slotIndex) {
      setSlots(prev => {
        const next = [...prev];
        next[slotIndex] = selectedCard;
        return next;
      });
      setAvailableCards(prev => prev.filter(c => c.id !== selectedCard.id));
      setFeedback({ type: 'correct' });
      setSelectedCard(null);

      // Check if chain is complete
      const filledCount = slots.filter(Boolean).length + 1;
      if (filledCount === chain.cards.length) {
        setLocked(true);
      }
    } else {
      setFeedback({
        type: 'incorrect',
        message: `${selectedCard.label} doesn't go here. Think about the order of energy flow.`,
      });
      setSelectedCard(null);
    }
  }, [selectedCard, locked, slots, chain]);

  const handleNextChain = useCallback(() => {
    const next = chainIndex + 1;
    if (next < chains.length) {
      setChainIndex(next);
      resetForChain(next);
    }
  }, [chainIndex, chains.length, resetForChain]);

  if (allChainsDone) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-6">
        <div className="text-5xl mb-4 animate-bounce-in">🎉</div>
        <div className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-fredoka)' }}>
          All chains built!
        </div>
        <Button onClick={onComplete} size="lg">
          Continue →
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-4 pb-2">
        <p className="text-base text-dim">{instructions}</p>
        <div className="mt-1 text-sm font-semibold" style={{ fontFamily: 'var(--font-fredoka)' }}>
          {chain.name} ({chainIndex + 1} of {chains.length})
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Slots — the chain layout */}
        <div className="mb-6">
          <div className="text-xs text-dim uppercase tracking-wide mb-2 text-center">
            Build the chain — start with the producer
          </div>
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {/* Sun icon */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-2xl">
                ☀️
              </div>
              <span className="text-xs text-dim mt-1">Sun</span>
            </div>

            {slots.map((slot, i) => (
              <div key={i} className="flex items-center">
                {/* Arrow */}
                <div className="text-forest-light text-xl font-bold mx-1">→</div>

                {/* Slot */}
                <button
                  onClick={() => handleSlotTap(i)}
                  disabled={!!slot}
                  className={`
                    touch-target w-20 h-20 rounded-2xl flex flex-col items-center justify-center
                    text-xs font-semibold text-center transition-all duration-200
                    ${slot
                      ? 'eco-card-correct bg-correct/10 animate-correct'
                      : selectedCard
                      ? 'border-2 border-dashed border-sky bg-sky/5 active:scale-95'
                      : 'border-2 border-dashed border-surface bg-surface/30'
                    }
                  `}
                >
                  {slot ? (
                    <>
                      <span className="font-bold text-xs">{slot.label}</span>
                      <span className="text-[10px] text-dim mt-0.5">{slot.role}</span>
                    </>
                  ) : (
                    <span className="text-dim">?</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Available cards */}
        {availableCards.length > 0 && (
          <div>
            <div className="text-xs text-dim uppercase tracking-wide mb-2 text-center">
              Tap a card, then tap where it goes
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {availableCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardTap(card)}
                  className={`
                    touch-target eco-card px-4 py-3 text-center transition-all duration-200
                    ${selectedCard?.id === card.id ? 'ring-3 ring-sky scale-105 shadow-lg' : 'active:scale-95'}
                  `}
                >
                  <div className="text-sm font-bold">{card.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Arrow direction reminder */}
        <div className="mt-6 p-3 bg-gold-light/20 rounded-xl text-center">
          <p className="text-xs text-dim">
            Remember: the arrow <strong>→</strong> points to the <strong>eater</strong>.
            Energy moves from food to eater.
          </p>
        </div>
      </div>

      {locked && (
        <div className="px-6 py-4 border-t border-surface">
          <Button
            onClick={chainIndex < chains.length - 1 ? handleNextChain : onComplete}
            size="lg"
            className="w-full"
          >
            {chainIndex < chains.length - 1 ? 'Next Chain →' : 'Continue →'}
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
