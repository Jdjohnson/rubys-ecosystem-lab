export const STORAGE_KEY = 'ecosystem-lab-progress';

export const MODULE_COLORS: Record<string, string> = {
  'whats-alive': '#4ade80',
  'biotic-abiotic': '#60a5fa',
  'living-needs': '#f59e0b',
  'predator-traits': '#ef4444',
  'predator-prey': '#a855f7',
  'food-chains': '#14b8a6',
  'food-webs': '#ec4899',
  'springfield-explorer': '#84cc16',
  'changes': '#f97316',
  'final-challenge': '#eab308',
};

export const MODULE_ORDER = [
  'whats-alive',
  'biotic-abiotic',
  'living-needs',
  'predator-traits',
  'predator-prey',
  'food-chains',
  'food-webs',
  'springfield-explorer',
  'changes',
  'final-challenge',
];

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  celebration: 800,
};

export const STREAK_THRESHOLDS = {
  nice: 3,
  great: 5,
  amazing: 8,
  perfect: 10,
};
