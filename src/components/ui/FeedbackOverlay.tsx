'use client';

import { useEffect, useRef, useState } from 'react';

interface FeedbackOverlayProps {
  type: 'correct' | 'incorrect' | null;
  message?: string;
  onDone?: () => void;
}

export function FeedbackOverlay({ type, message, onDone }: FeedbackOverlayProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derive visibility from type prop changes
  const shouldShow = type !== null;

  useEffect(() => {
    if (shouldShow) {
      setVisible(true);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        onDone?.();
      }, 1200);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  if (!visible || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className={`px-8 py-6 rounded-3xl text-center ${
          type === 'correct'
            ? 'bg-correct/90 text-white animate-bounce-in'
            : 'bg-incorrect/90 text-white animate-shake'
        }`}
      >
        <div className="text-4xl mb-2">
          {type === 'correct' ? '✓' : '✗'}
        </div>
        <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-fredoka)' }}>
          {type === 'correct' ? 'Nice!' : 'Not quite'}
        </div>
        {message && (
          <div className="text-sm mt-1 opacity-90 max-w-xs">{message}</div>
        )}
      </div>
    </div>
  );
}
