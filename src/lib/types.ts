export type OrganismType = 'producer' | 'consumer' | 'decomposer';

export type EcologicalRole =
  | 'predator'
  | 'prey'
  | 'herbivore'
  | 'omnivore'
  | 'scavenger'
  | 'decomposer'
  | 'producer';

export type Classification = 'biotic' | 'abiotic';

export type HabitatType = 'woods' | 'pond-creek' | 'field-prairie';

export interface Organism {
  id: string;
  name: string;
  image: string;
  classification: 'biotic';
  type: OrganismType;
  roles: EcologicalRole[];
  habitats: HabitatType[];
  needs: string[];
  predatorTraits?: string[];
  eats: string[];
  eatenBy: string[];
  funFact: string;
}

export interface AbioticFactor {
  id: string;
  name: string;
  image: string;
  classification: 'abiotic';
  habitats: HabitatType[];
  description: string;
}

export type EcosystemItem = Organism | AbioticFactor;

export interface FoodChain {
  id: string;
  name: string;
  habitat: HabitatType;
  steps: string[]; // organism IDs in order: producer → top consumer
}

export interface ScenarioEffect {
  organism: string;
  effect: string;
  direction: 'increase' | 'decrease' | 'unchanged';
}

export interface Scenario {
  id: string;
  title: string;
  habitat: HabitatType;
  change: string;
  effects: ScenarioEffect[];
}

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  module: string;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options: QuizOption[];
  explanation: string;
  image?: string;
}

export interface ModuleStep {
  type: 'teach' | 'practice' | 'check';
  title: string;
  content?: string;
  keyLine?: string;
  interaction?: string;
  props?: Record<string, unknown>;
}

export interface ModuleDef {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  steps: ModuleStep[];
}

export interface ProgressState {
  completedModules: string[];
  currentModule: string | null;
  moduleStepIndex: Record<string, number>;
  quizScores: Record<string, number>;
  totalStars: number;
  streakCount: number;
}

// Food web graph types
export interface WebNode {
  id: string;
  x: number;
  y: number;
  radius: number;
}

export interface WebEdge {
  from: string; // prey ID
  to: string;   // predator ID (arrow points from → to, energy flows this way)
}

// Interaction prop types
export interface TapItem {
  id: string;
  label: string;
  answer: Classification;
  x: number;
  y: number;
}

export interface SortCard {
  id: string;
  label: string;
  category: string;
  hint?: string;
}

export interface MatchPair {
  organismId: string;
  organismLabel: string;
  needId: string;
  needLabel: string;
}

export interface ChainCard {
  id: string;
  label: string;
  role: string;
  order: number;
}
