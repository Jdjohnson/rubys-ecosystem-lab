'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { quizBank } from '@/data/quiz-bank';
import { modules } from '@/data/modules';
import { shuffle } from '@/lib/shuffle';
import { QuizQuestion } from '@/components/interactions/QuizQuestion';
import { useProgress } from '@/hooks/useProgress';

export default function QuizPage() {
  const router = useRouter();
  const { completedModules, loaded } = useProgress();

  // Only include questions from completed modules
  const questionIds = useMemo(() => {
    // Map module slugs to the module numbers (1-indexed)
    const completedSlugs = new Set(completedModules);
    // Also include questions from the first module's topic if it's completed
    const eligibleModules = new Set<string>();
    modules.forEach(m => {
      if (completedSlugs.has(m.slug)) {
        eligibleModules.add(m.slug);
      }
    });

    const eligibleQuestions = quizBank.filter(q => eligibleModules.has(q.module));
    const shuffled = shuffle(eligibleQuestions);
    return shuffled.slice(0, Math.min(10, shuffled.length)).map(q => q.id);
  }, [completedModules]);

  if (!loaded) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-2xl animate-bob">📝</div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col">
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
