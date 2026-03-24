'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FeedbackOverlayProps {
  type: 'correct' | 'incorrect' | null;
  message?: string;
  onDone?: () => void;
  durationMs?: number;
}

interface FeedbackMessageProps {
  type: 'correct' | 'incorrect';
  message?: string;
  title?: string;
  className?: string;
}

export function FeedbackMessage({
  type,
  message,
  title,
  className = '',
}: FeedbackMessageProps) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm shadow-sm ${
        type === 'correct'
          ? 'border-correct/40 bg-correct/12 text-foreground'
          : 'border-incorrect/40 bg-incorrect/12 text-foreground'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            type === 'correct'
              ? 'bg-correct text-white'
              : 'bg-incorrect text-white'
          }`}
        >
          {type === 'correct' ? '✓' : '!'}
        </div>
        <div>
          <div className="font-bold" style={{ fontFamily: 'var(--font-fredoka)' }}>
            {title ?? (type === 'correct' ? 'Nice work' : 'Try again')}
          </div>
          {message && <p className="mt-1 leading-relaxed text-dim">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export function FeedbackOverlay({
  type,
  message,
  onDone,
  durationMs = 1800,
}: FeedbackOverlayProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onDoneRef = useRef(onDone);
  const prefersReducedMotion = useReducedMotion();

  // Keep onDone ref up to date
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  // Handle showing and auto-hiding the overlay
  useEffect(() => {
    if (type !== null) {
      // Clear any existing timer when type changes
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Set new timer to call onDone
      timerRef.current = setTimeout(() => {
        onDoneRef.current?.();
      }, durationMs);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [type, durationMs]);

  // Don't render if no type
  if (type === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        role="status"
        aria-live="polite"
        className={`px-8 py-6 rounded-3xl text-center shadow-xl ${
          type === 'correct'
            ? 'bg-correct/92 text-white'
            : 'bg-incorrect/92 text-white'
        }`}
      >
        <div className="text-4xl mb-2">
          {type === 'correct' ? '✓' : '✗'}
        </div>
        <div
          className={`text-lg font-bold ${prefersReducedMotion ? '' : type === 'correct' ? 'animate-bounce-in' : 'animate-shake'}`}
          style={{ fontFamily: 'var(--font-fredoka)' }}
        >
          {type === 'correct' ? 'Nice!' : 'Not quite'}
        </div>
        {message && (
          <div className="text-sm mt-1 opacity-90 max-w-xs">{message}</div>
        )}
      </div>
    </div>
  );
}
