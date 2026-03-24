'use client';

import { useState, useCallback, useEffect } from 'react';
import type { ProgressState } from '@/lib/types';
import { DEFAULT_PROGRESS, loadProgress, saveProgress, isModuleUnlocked } from '@/lib/progress';
import { MODULE_ORDER } from '@/lib/constants';

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS;
    return loadProgress();
  });
  const [loaded, setLoaded] = useState(() => typeof window !== 'undefined');

  // Handle SSR hydration
  useEffect(() => {
    if (!loaded) {
      const saved = loadProgress();
      setState(saved);
      setLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback((next: ProgressState) => {
    setState(next);
    saveProgress(next);
  }, []);

  const advanceStep = useCallback((slug: string) => {
    setState(prev => {
      const currentStep = prev.moduleStepIndex[slug] ?? 0;
      const next = {
        ...prev,
        currentModule: slug,
        moduleStepIndex: {
          ...prev.moduleStepIndex,
          [slug]: currentStep + 1,
        },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const completeModule = useCallback((slug: string, stars: number = 1) => {
    setState(prev => {
      const alreadyCompleted = prev.completedModules.includes(slug);
      const next = {
        ...prev,
        completedModules: alreadyCompleted
          ? prev.completedModules
          : [...prev.completedModules, slug],
        totalStars: prev.totalStars + (alreadyCompleted ? 0 : stars),
        currentModule: null,
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const recordScore = useCallback((moduleSlug: string, score: number) => {
    setState(prev => {
      const best = Math.max(prev.quizScores[moduleSlug] ?? 0, score);
      const next = {
        ...prev,
        quizScores: { ...prev.quizScores, [moduleSlug]: best },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const incrementStreak = useCallback(() => {
    setState(prev => {
      const next = { ...prev, streakCount: prev.streakCount + 1 };
      saveProgress(next);
      return next;
    });
  }, []);

  const resetStreak = useCallback(() => {
    setState(prev => {
      const next = { ...prev, streakCount: 0 };
      saveProgress(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    update(DEFAULT_PROGRESS);
  }, [update]);

  const isUnlocked = useCallback((slug: string) => {
    return isModuleUnlocked(slug, state.completedModules);
  }, [state.completedModules]);

  const isCompleted = useCallback((slug: string) => {
    return state.completedModules.includes(slug);
  }, [state.completedModules]);

  const getStepIndex = useCallback((slug: string) => {
    return state.moduleStepIndex[slug] ?? 0;
  }, [state.moduleStepIndex]);

  const resetModule = useCallback((slug: string) => {
    setState(prev => {
      const next = {
        ...prev,
        moduleStepIndex: { ...prev.moduleStepIndex, [slug]: 0 },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  return {
    ...state,
    loaded,
    advanceStep,
    completeModule,
    recordScore,
    incrementStreak,
    resetStreak,
    resetProgress,
    resetModule,
    isUnlocked,
    isCompleted,
    getStepIndex,
    moduleOrder: MODULE_ORDER,
  };
}
