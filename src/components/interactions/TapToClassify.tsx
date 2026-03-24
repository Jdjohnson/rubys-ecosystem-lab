'use client';

import { useState, useCallback } from 'react';
import type { Classification } from '@/lib/types';
import { FeedbackMessage, FeedbackOverlay } from '@/components/ui/FeedbackOverlay';
import { Button } from '@/components/ui/Button';
import { ItemImage } from '@/components/ui/ItemImage';

interface TapItem {
  id: string;
  label: string;
  answer: Classification;
}

interface TapToClassifyProps {
  instructions: string;
  items: TapItem[];
  onComplete: () => void;
}

type ItemState = 'pending' | 'correct' | 'incorrect-flash';

export function TapToClassify({ instructions, items, onComplete }: TapToClassifyProps) {
  const [selectedItem, setSelectedItem] = useState<TapItem | null>(null);
  const [itemStates, setItemStates] = useState<Record<string, ItemState>>({});
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; message?: string } | null>(null);
  const [overlayType, setOverlayType] = useState<'correct' | 'incorrect' | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const allDone = correctCount === items.length;

  const handleItemTap = useCallback((item: TapItem) => {
    if (itemStates[item.id] === 'correct') return;
    setSelectedItem(item);
  }, [itemStates]);

  const handleClassify = useCallback((classification: Classification) => {
    if (!selectedItem) return;

    if (classification === selectedItem.answer) {
      setItemStates(prev => ({ ...prev, [selectedItem.id]: 'correct' }));
      setCorrectCount(prev => prev + 1);
      setFeedback({
        type: 'correct',
        message: selectedItem.answer === 'biotic'
          ? `${selectedItem.label} is biotic because it is living or came from something living.`
          : `${selectedItem.label} is abiotic because it was never alive.`,
      });
      setOverlayType('correct');
    } else {
      setItemStates(prev => ({ ...prev, [selectedItem.id]: 'incorrect-flash' }));
      setFeedback({
        type: 'incorrect',
        message: selectedItem.answer === 'biotic'
          ? `Look for signs that ${selectedItem.label.toLowerCase()} is living or came from something living.`
          : `Think about whether ${selectedItem.label.toLowerCase()} was ever alive.`,
      });
      setOverlayType('incorrect');
      // Reset after flash
      setTimeout(() => {
        setItemStates(prev => {
          if (prev[selectedItem.id] === 'incorrect-flash') {
            const next = { ...prev };
            delete next[selectedItem.id];
            return next;
          }
          return prev;
        });
      }, 800);
    }
    setSelectedItem(null);
  }, [selectedItem]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-4 pb-2">
        <p className="text-base text-dim">{instructions}</p>
        <div className="mt-2 text-sm text-dim">
          {correctCount} / {items.length} classified
        </div>
        <div className="mt-1 text-sm text-dim">
          Nothing is labeled for you first. Use your science brain, then check your answer.
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {items.map((item, index) => {
            const state = itemStates[item.id];
            const isSelected = selectedItem?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemTap(item)}
                disabled={state === 'correct'}
                className={`
                  touch-target eco-card p-4 flex flex-col items-center gap-2 text-center
                  transition-all duration-200
                  ${state === 'correct' ? 'eco-card-correct opacity-75' : ''}
                  ${state === 'incorrect-flash' ? 'eco-card-incorrect animate-shake' : ''}
                  ${isSelected ? 'ring-3 ring-sky shadow-lg scale-105' : ''}
                  ${!state && !isSelected ? 'active:scale-95' : ''}
                `}
              >
                {state === 'correct' ? (
                  <span className="text-3xl text-correct" aria-hidden="true">✓</span>
                ) : (
                  <ItemImage id={item.id} name={item.label} size={56} />
                )}
                <span className="text-sm font-semibold">{item.label}</span>
                {state === 'correct' && (
                  <span className="text-xs text-correct font-bold">
                    {item.answer === 'biotic' ? 'Biotic' : 'Abiotic'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Classification chooser */}
      {selectedItem && (
        <div className="px-6 py-4 border-t border-surface animate-slide-in">
          <p className="text-center text-sm text-dim mb-3">
            Is <strong>{selectedItem.label}</strong> biotic or abiotic?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleClassify('biotic')}
              className="touch-target flex-1 py-4 bg-correct/15 border-2 border-correct rounded-2xl text-center font-bold text-lg active:scale-95 transition-transform"
              >
                Biotic
            </button>
            <button
              onClick={() => handleClassify('abiotic')}
              className="touch-target flex-1 py-4 bg-sky/15 border-2 border-sky rounded-2xl text-center font-bold text-lg active:scale-95 transition-transform"
              >
                Abiotic
              </button>
            </div>
          </div>
      )}

      {feedback && (
        <div className="px-6 pb-4">
          <FeedbackMessage
            type={feedback.type}
            message={feedback.message}
            title={feedback.type === 'correct' ? 'You checked it correctly' : 'Try a different clue'}
          />
        </div>
      )}

      {/* Done state */}
      {allDone && !selectedItem && (
        <div className="px-6 py-4 border-t border-surface">
          <Button onClick={onComplete} size="lg" className="w-full">
            All classified! Continue →
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
