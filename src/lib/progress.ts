import { STORAGE_KEY, MODULE_ORDER } from './constants';
import type { ProgressState } from './types';

export const DEFAULT_PROGRESS: ProgressState = {
  completedModules: [],
  currentModule: null,
  moduleStepIndex: {},
  quizScores: {},
  totalStars: 0,
  streakCount: 0,
};

export function loadProgress(): ProgressState {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_PROGRESS, ...JSON.parse(saved) } : DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable — fail silently
  }
}

export function isModuleUnlocked(slug: string, completedModules: string[]): boolean {
  const idx = MODULE_ORDER.indexOf(slug);
  if (idx === 0) return true; // first module always unlocked
  return completedModules.includes(MODULE_ORDER[idx - 1]);
}

export function getNextModule(currentSlug: string): string | null {
  const idx = MODULE_ORDER.indexOf(currentSlug);
  if (idx < 0 || idx >= MODULE_ORDER.length - 1) return null;
  return MODULE_ORDER[idx + 1];
}
