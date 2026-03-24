'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { quizBank } from '@/data/quiz-bank';
import { shuffle } from '@/lib/shuffle';
import { QuizQuestion } from '@/components/interactions/QuizQuestion';

export default function QuizPage() {
  const router = useRouter();

  // Grab 10 random questions from the full bank
  const questionIds = useMemo(() => {
    const shuffled = shuffle(quizBank);
    return shuffled.slice(0, 10).map(q => q.id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 pt-4 pb-3 flex items-center gap-3">
        <button
          onClick={() => router.push('/')}
          className="touch-target w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-dim active:scale-95 transition-transform"
        >
          ←
        </button>
        <h1 className="text-lg font-bold" style={{ fontFamily: 'var(--font-fredoka)' }}>
          Quick Quiz
        </h1>
      </header>

      <div className="flex-1 flex flex-col overflow-hidden">
        <QuizQuestion
          questionIds={questionIds}
          showScore
          onComplete={() => router.push('/')}
        />
      </div>
    </div>
  );
}
