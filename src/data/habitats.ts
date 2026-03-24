import type { HabitatType } from '@/lib/types';

export interface HabitatInfo {
  id: HabitatType;
  name: string;
  description: string;
  icon: string;
  biotic: string[];   // organism IDs
  abiotic: string[];   // abiotic factor IDs
  predators: string[];
  prey: string[];
}

export const habitats: HabitatInfo[] = [
  {
    id: 'woods',
    name: 'Woods / Backyard Edge',
    description: 'The oak and cedar forests of the Ozarks. Squirrels run through the canopy, hawks circle overhead, and mushrooms grow on fallen logs.',
    icon: '🌳',
    biotic: [
      'white-oak', 'eastern-cottontail', 'white-tailed-deer', 'field-mouse',
      'coyote', 'red-tailed-hawk', 'great-horned-owl', 'copperhead',
      'garden-spider', 'shelf-fungus', 'earthworm', 'box-turtle', 'raccoon',
      'turkey-vulture',
    ],
    abiotic: ['sunlight', 'soil', 'rocks', 'rain', 'wind', 'temperature', 'air'],
    predators: ['coyote', 'red-tailed-hawk', 'great-horned-owl', 'copperhead', 'garden-spider'],
    prey: ['eastern-cottontail', 'field-mouse', 'white-tailed-deer'],
  },
  {
    id: 'pond-creek',
    name: 'Pond / Creek',
    description: 'Ozarks creeks with rocky bottoms and still ponds edged with cattails. Crayfish hide under rocks, bass patrol the deeper water, and herons stand watch.',
    icon: '🐟',
    biotic: [
      'algae', 'cattail', 'crayfish', 'bullfrog', 'minnow', 'mayfly',
      'largemouth-bass', 'great-blue-heron', 'green-darner', 'raccoon',
    ],
    abiotic: ['water', 'mud', 'rocks', 'sunlight', 'temperature', 'oxygen-in-water', 'air'],
    predators: ['largemouth-bass', 'great-blue-heron', 'bullfrog', 'green-darner'],
    prey: ['minnow', 'mayfly', 'crayfish'],
  },
  {
    id: 'field-prairie',
    name: 'Field / Prairie',
    description: 'Open grasslands with big bluestem grass and wildflowers. Grasshoppers leap through the stems, hawks hunt from above, and snakes wait in the shadows.',
    icon: '🌾',
    biotic: [
      'big-bluestem', 'black-eyed-susan', 'grasshopper', 'field-mouse',
      'eastern-cottontail', 'copperhead', 'red-tailed-hawk', 'coyote',
      'garden-spider', 'green-darner', 'turkey-vulture', 'earthworm',
    ],
    abiotic: ['soil', 'sunlight', 'wind', 'rain', 'temperature', 'air'],
    predators: ['copperhead', 'red-tailed-hawk', 'coyote', 'garden-spider'],
    prey: ['grasshopper', 'field-mouse', 'eastern-cottontail'],
  },
];

export function getHabitat(id: HabitatType): HabitatInfo | undefined {
  return habitats.find(h => h.id === id);
}
