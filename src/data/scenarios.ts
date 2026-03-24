import type { Scenario } from '@/lib/types';

export const scenarios: Scenario[] = [
  {
    id: 'less-rain',
    title: 'What if there was less rain?',
    habitat: 'field-prairie',
    change: 'A drought hits the Ozarks. Rain drops by half for the whole summer.',
    effects: [
      {
        organism: 'big-bluestem',
        effect: 'Grass struggles to grow without enough water.',
        direction: 'decrease',
      },
      {
        organism: 'grasshopper',
        effect: 'Less grass means less food for grasshoppers.',
        direction: 'decrease',
      },
      {
        organism: 'field-mouse',
        effect: 'Less grass means fewer seeds for mice to eat.',
        direction: 'decrease',
      },
      {
        organism: 'coyote',
        effect: 'With less prey available, coyotes have to range farther to find food.',
        direction: 'decrease',
      },
    ],
  },
  {
    id: 'fewer-hawks',
    title: 'What if hawks disappeared?',
    habitat: 'woods',
    change: 'A disease wipes out most red-tailed hawks in the area.',
    effects: [
      {
        organism: 'field-mouse',
        effect: 'With fewer hawks hunting them, mouse populations grow.',
        direction: 'increase',
      },
      {
        organism: 'eastern-cottontail',
        effect: 'Rabbits have one less predator, so more survive.',
        direction: 'increase',
      },
      {
        organism: 'white-oak',
        effect: 'More mice and rabbits eat more acorns and seedlings. Fewer new trees grow.',
        direction: 'decrease',
      },
      {
        organism: 'copperhead',
        effect: 'Snakes that hawks used to eat now have more freedom to hunt.',
        direction: 'increase',
      },
    ],
  },
  {
    id: 'dirty-water',
    title: 'What if the creek got polluted?',
    habitat: 'pond-creek',
    change: 'Runoff from a nearby field carries chemicals into the creek.',
    effects: [
      {
        organism: 'algae',
        effect: 'Extra nutrients cause algae to grow out of control at first.',
        direction: 'increase',
      },
      {
        organism: 'minnow',
        effect: 'Pollution lowers oxygen in the water. Fish struggle to breathe.',
        direction: 'decrease',
      },
      {
        organism: 'crayfish',
        effect: 'Crayfish are sensitive to pollution. Many leave or die.',
        direction: 'decrease',
      },
      {
        organism: 'great-blue-heron',
        effect: 'Less fish and crayfish means less food for the heron.',
        direction: 'decrease',
      },
    ],
  },
  {
    id: 'hotter-weather',
    title: 'What if temperatures rose 5 degrees?',
    habitat: 'pond-creek',
    change: 'Climate change makes summers 5 degrees hotter in the Ozarks.',
    effects: [
      {
        organism: 'algae',
        effect: 'Warmer water helps algae bloom. Ponds turn green.',
        direction: 'increase',
      },
      {
        organism: 'largemouth-bass',
        effect: 'Warmer water holds less oxygen. Bass have to work harder to breathe.',
        direction: 'decrease',
      },
      {
        organism: 'bullfrog',
        effect: 'Bullfrogs handle heat okay, but their ponds might dry up faster.',
        direction: 'decrease',
      },
      {
        organism: 'green-darner',
        effect: 'Warmer weather means more active time for cold-blooded dragonflies.',
        direction: 'increase',
      },
    ],
  },
  {
    id: 'more-algae',
    title: 'What if algae took over a pond?',
    habitat: 'pond-creek',
    change: 'Fertilizer runoff causes a massive algae bloom in a Springfield pond.',
    effects: [
      {
        organism: 'algae',
        effect: 'Algae covers the surface, blocking sunlight for plants below.',
        direction: 'increase',
      },
      {
        organism: 'crayfish',
        effect: 'Crayfish that graze on bottom algae find less food as light can\'t reach the pond floor.',
        direction: 'decrease',
      },
      {
        organism: 'minnow',
        effect: 'When algae dies and decomposes, it uses up oxygen. Fish suffocate.',
        direction: 'decrease',
      },
      {
        organism: 'great-blue-heron',
        effect: 'Fewer fish means the heron has to find food elsewhere.',
        direction: 'decrease',
      },
    ],
  },
  {
    id: 'shelter-loss',
    title: 'What if a forest was cleared?',
    habitat: 'woods',
    change: 'A section of Ozarks forest is cleared for a new development.',
    effects: [
      {
        organism: 'white-oak',
        effect: 'Trees are cut down. The producers of the woods ecosystem are gone.',
        direction: 'decrease',
      },
      {
        organism: 'white-tailed-deer',
        effect: 'Deer lose shelter and food sources. They move away.',
        direction: 'decrease',
      },
      {
        organism: 'great-horned-owl',
        effect: 'Owls lose nesting sites in old trees.',
        direction: 'decrease',
      },
      {
        organism: 'shelf-fungus',
        effect: 'No dead trees means no home for shelf fungus. Decomposers disappear.',
        direction: 'decrease',
      },
    ],
  },
];
