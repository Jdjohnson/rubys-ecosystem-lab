import type { WebNode, WebEdge } from '@/lib/types';

// Positions in a 1000x800 SVG coordinate space
// Grouped roughly by trophic level: producers at bottom, top predators at top
export const webNodes: WebNode[] = [
  // Producers (bottom row)
  { id: 'algae', x: 150, y: 700, radius: 28 },
  { id: 'cattail', x: 350, y: 720, radius: 26 },
  { id: 'white-oak', x: 550, y: 700, radius: 30 },
  { id: 'big-bluestem', x: 750, y: 720, radius: 28 },
  { id: 'black-eyed-susan', x: 900, y: 700, radius: 24 },

  // Primary consumers (lower-mid)
  { id: 'mayfly', x: 100, y: 540, radius: 20 },
  { id: 'crayfish', x: 250, y: 520, radius: 24 },
  { id: 'minnow', x: 180, y: 440, radius: 22 },
  { id: 'grasshopper', x: 800, y: 540, radius: 22 },
  { id: 'eastern-cottontail', x: 600, y: 530, radius: 26 },
  { id: 'field-mouse', x: 700, y: 480, radius: 22 },
  { id: 'white-tailed-deer', x: 480, y: 560, radius: 28 },
  { id: 'earthworm', x: 650, y: 650, radius: 18 },

  // Secondary consumers (upper-mid)
  { id: 'bullfrog', x: 300, y: 380, radius: 26 },
  { id: 'green-darner', x: 450, y: 400, radius: 22 },
  { id: 'garden-spider', x: 850, y: 400, radius: 22 },
  { id: 'largemouth-bass', x: 200, y: 300, radius: 28 },
  { id: 'copperhead', x: 650, y: 340, radius: 26 },
  { id: 'raccoon', x: 380, y: 300, radius: 26 },
  { id: 'box-turtle', x: 550, y: 440, radius: 24 },

  // Top predators (top row)
  { id: 'red-tailed-hawk', x: 500, y: 140, radius: 32 },
  { id: 'great-blue-heron', x: 200, y: 160, radius: 30 },
  { id: 'coyote', x: 700, y: 160, radius: 30 },
  { id: 'great-horned-owl', x: 380, y: 100, radius: 30 },
  { id: 'turkey-vulture', x: 850, y: 200, radius: 26 },

  // Decomposers (side)
  { id: 'shelf-fungus', x: 900, y: 600, radius: 22 },
];

// Edges: from = prey, to = predator (arrow points toward eater)
export const webEdges: WebEdge[] = [
  // Algae → primary consumers
  { from: 'algae', to: 'mayfly' },
  { from: 'algae', to: 'minnow' },
  { from: 'algae', to: 'crayfish' },

  // Cattail
  // (mainly habitat, limited direct consumption in this web)

  // White oak → herbivores
  { from: 'white-oak', to: 'field-mouse' },
  { from: 'white-oak', to: 'eastern-cottontail' },
  { from: 'white-oak', to: 'white-tailed-deer' },

  // Big bluestem → herbivores
  { from: 'big-bluestem', to: 'grasshopper' },
  { from: 'big-bluestem', to: 'eastern-cottontail' },
  { from: 'big-bluestem', to: 'field-mouse' },

  // Black-eyed susan
  { from: 'black-eyed-susan', to: 'grasshopper' },

  // Mayfly → secondary
  { from: 'mayfly', to: 'minnow' },
  { from: 'mayfly', to: 'bullfrog' },
  { from: 'mayfly', to: 'green-darner' },

  // Minnow → predators
  { from: 'minnow', to: 'largemouth-bass' },
  { from: 'minnow', to: 'great-blue-heron' },
  { from: 'minnow', to: 'raccoon' },

  // Crayfish → predators
  { from: 'crayfish', to: 'largemouth-bass' },
  { from: 'crayfish', to: 'raccoon' },
  { from: 'crayfish', to: 'great-blue-heron' },

  // Grasshopper → predators
  { from: 'grasshopper', to: 'bullfrog' },
  { from: 'grasshopper', to: 'garden-spider' },
  { from: 'grasshopper', to: 'green-darner' },

  // Eastern cottontail → predators
  { from: 'eastern-cottontail', to: 'red-tailed-hawk' },
  { from: 'eastern-cottontail', to: 'coyote' },
  { from: 'eastern-cottontail', to: 'copperhead' },

  // Field mouse → predators
  { from: 'field-mouse', to: 'copperhead' },
  { from: 'field-mouse', to: 'red-tailed-hawk' },
  { from: 'field-mouse', to: 'coyote' },
  { from: 'field-mouse', to: 'great-horned-owl' },

  // White-tailed deer → predators
  { from: 'white-tailed-deer', to: 'coyote' },

  // Bullfrog → predators
  { from: 'bullfrog', to: 'largemouth-bass' },
  { from: 'bullfrog', to: 'great-blue-heron' },
  { from: 'bullfrog', to: 'copperhead' },

  // Green darner → predators
  { from: 'green-darner', to: 'bullfrog' },
  { from: 'green-darner', to: 'garden-spider' },

  // Garden spider
  { from: 'garden-spider', to: 'great-horned-owl' },

  // Largemouth bass → top
  { from: 'largemouth-bass', to: 'great-blue-heron' },

  // Copperhead → top
  { from: 'copperhead', to: 'red-tailed-hawk' },
  { from: 'copperhead', to: 'great-horned-owl' },

  // Decomposer connections
  { from: 'shelf-fungus', to: 'box-turtle' },
  { from: 'earthworm', to: 'box-turtle' },
  { from: 'earthworm', to: 'bullfrog' },

  // Box turtle → predators
  { from: 'box-turtle', to: 'raccoon' },
];

export function getConnections(organismId: string) {
  const eats = webEdges.filter(e => e.to === organismId).map(e => e.from);
  const eatenBy = webEdges.filter(e => e.from === organismId).map(e => e.to);
  return { eats, eatenBy };
}
