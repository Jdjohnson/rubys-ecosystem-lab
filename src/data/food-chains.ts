import type { FoodChain } from '@/lib/types';

export const foodChains: FoodChain[] = [
  {
    id: 'creek-chain',
    name: 'Creek Chain',
    habitat: 'pond-creek',
    // Sun → Algae → Mayfly → Minnow → Largemouth Bass → Great Blue Heron
    steps: ['algae', 'mayfly', 'minnow', 'largemouth-bass', 'great-blue-heron'],
  },
  {
    id: 'woods-chain',
    name: 'Woods Chain',
    habitat: 'woods',
    // Sun → White Oak (acorns) → Field Mouse → Copperhead Snake → Red-tailed Hawk
    steps: ['white-oak', 'field-mouse', 'copperhead', 'red-tailed-hawk'],
  },
  {
    id: 'prairie-chain',
    name: 'Prairie Chain',
    habitat: 'field-prairie',
    // Sun → Big Bluestem Grass → Field Mouse → Copperhead → Red-Tailed Hawk
    steps: ['big-bluestem', 'field-mouse', 'copperhead', 'red-tailed-hawk'],
  },
];

export function getFoodChain(id: string): FoodChain | undefined {
  return foodChains.find(c => c.id === id);
}
