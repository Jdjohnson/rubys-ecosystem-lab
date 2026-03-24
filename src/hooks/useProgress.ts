'use client';

import { useState, useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import type { ProgressState } from '@/lib/types';
import { DEFAULT_PROGRESS, loadProgress, saveProgress, isModuleUnlocked } from '@/lib/progress';
import { MODULE_ORDER } from '@/lib/constants';

// Simple external store for hydration tracking
let isHydrated = false;
const hydrationListeners = new Set<() => void>();
function subscribeToHydration(callback: () => void) {
  hydrationListeners.add(callback);
  return () => hydrationListeners.delete(callback);
}
function getHydrationSnapshot() { return isHydrated; }
function getServerSnapshot() { return false; }

export function useProgress() {
  // Track hydration using useSyncExternalStore to avoid setState-in-effect
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getServerSnapshot
  );

  // Set hydrated on mount (runs once after first render)
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      if (!isHydrated) {
        isHydrated = true;
        hydrationListeners.forEach(cb => cb());
      }
    }
  }, []);

  // Load state: default on server, localStorage on client
  const [state, setState] = useState<ProgressState>(() => {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS;
    return loadProgress();
  });

  const loaded = hydrated;

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
        moduleStepIndex: {
          ...prev.moduleStepIndex,
          [slug]: 0,
        },
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
