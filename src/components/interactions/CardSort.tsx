'use client';

import { useState, useCallback, useMemo } from 'react';
import { shuffle } from '@/lib/shuffle';
import { FeedbackMessage, FeedbackOverlay } from '@/components/ui/FeedbackOverlay';
import { Button } from '@/components/ui/Button';
import { ItemImage } from '@/components/ui/ItemImage';

interface SortCardData {
  id: string;
  label: string;
  category: string;
  hint?: string;
  imageId?: string;
}

interface CardSortProps {
  instructions: string;
  categories: string[];
  cards: SortCardData[];
  onComplete: () => void;
}

export function CardSort({ instructions, categories, cards, onComplete }: CardSortProps) {
  const shuffledCards = useMemo(() => shuffle(cards), [cards]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedCards, setSortedCards] = useState<Record<string, SortCardData[]>>(() => {
    const bins: Record<string, SortCardData[]> = {};
    categories.forEach(c => { bins[c] = []; });
    return bins;
  });
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; message?: string } | null>(null);
  const [overlayType, setOverlayType] = useState<'correct' | 'incorrect' | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const currentCard = currentIndex < shuffledCards.length ? shuffledCards[currentIndex] : null;
  const allDone = currentIndex >= shuffledCards.length;

  const handleSort = useCallback((category: string) => {
    if (!currentCard) return;

    if (category === currentCard.category) {
      setSortedCards(prev => ({
        ...prev,
        [category]: [...prev[category], currentCard],
      }));
      setCorrectCount(prev => prev + 1);
      setFeedback({ type: 'correct', message: `${currentCard.label} fits in ${category}.` });
      setOverlayType('correct');
      setCurrentIndex(prev => prev + 1);
    } else {
      setFeedback({
        type: 'incorrect',
        message: currentCard.hint || 'Think carefully about this one. What group does it fit best?',
      });
      setOverlayType('incorrect');
    }
  }, [currentCard]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-4 pb-2">
        <p className="text-base text-dim">{instructions}</p>
        <div className="mt-2 text-sm text-dim">
          {correctCount} / {shuffledCards.length} sorted
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col items-center justify-center">
        {currentCard ? (
          <div className="w-full max-w-sm">
            {/* Current card */}
            <div className="eco-card p-6 text-center mb-6 animate-slide-in flex flex-col items-center" key={currentCard.id}>
              {currentCard.imageId && (
                <ItemImage id={currentCard.imageId} name={currentCard.label} size={72} className="mb-2" />
              )}
              <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-fredoka)' }}>
                {currentCard.label}
              </div>
              <div className="text-sm text-dim">
                Card {currentIndex + 1} of {shuffledCards.length}
              </div>
            </div>

            {feedback && (
              <FeedbackMessage
                type={feedback.type}
                message={feedback.message}
                className="mb-4"
              />
            )}

            {/* Category buttons */}
            <div className={`grid gap-3 ${categories.length <= 2 ? 'grid-cols-2' : categories.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-3'}`}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSort(cat)}
                  className="touch-target eco-card p-4 text-center font-semibold active:scale-95 transition-transform border-2 border-transparent hover:border-forest-light/30"
                >
                  <div className="text-sm">{cat}</div>
                  <div className="text-xs text-dim mt-1">
                    {sortedCards[cat]?.length || 0} cards
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center animate-bounce-in">
            <div className="text-5xl mb-4">🎉</div>
            <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-fredoka)' }}>
              All sorted!
            </div>
            <div className="text-dim mt-2">
              {correctCount} out of {shuffledCards.length} correct
            </div>
          </div>
        )}
      </div>

      {allDone && (
        <div className="px-6 py-4 border-t border-surface">
          <Button onClick={onComplete} size="lg" className="w-full">
            Continue →
          </Button>
        </div>
      )}

      <FeedbackOverlay
        type={overlayType}
        onDone={() => setOverlayType(null)}
      />
    </div>
  );
}
