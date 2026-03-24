import type { ModuleDef } from '@/lib/types';

// Module definitions with step configurations
// Each module follows: teach → practice → check

export const modules: ModuleDef[] = [
  {
    slug: 'whats-alive',
    number: 1,
    title: "What's Alive Here?",
    subtitle: 'Explore a local ecosystem',
    icon: '🌿',
    color: '#4ade80',
    steps: [
      {
        type: 'teach',
        title: 'Welcome to the Ozarks!',
        content: 'Look around. You\'re standing near a pond in the Ozarks, close to Springfield.\n\nEverything you see is part of an **ecosystem** — a place where living and nonliving things affect each other.\n\nSome things here are alive. Some are not. Both matter.',
        keyLine: 'An ecosystem is made of living and nonliving things.',
      },
      {
        type: 'teach',
        title: 'Biotic and Abiotic',
        content: 'Scientists have names for these two groups.\n\n**Biotic** means living things — plants, animals, fungi, bacteria.\n\n**Abiotic** means nonliving things — water, rocks, sunlight, air, temperature.\n\nBoth are part of every ecosystem.',
        keyLine: 'Living things are biotic. Nonliving things are abiotic.',
      },
      {
        type: 'practice',
        title: 'Tap What\'s Alive',
        interaction: 'TapToClassify',
        props: {
          instructions: 'Tap each item and decide: is it biotic (alive) or abiotic (not alive)?',
          items: [
            { id: 'white-oak', label: 'Oak Tree', answer: 'biotic' },
            { id: 'eastern-cottontail', label: 'Rabbit', answer: 'biotic' },
            { id: 'sunlight', label: 'Sunlight', answer: 'abiotic' },
            { id: 'rocks', label: 'Rock', answer: 'abiotic' },
            { id: 'bullfrog', label: 'Frog', answer: 'biotic' },
            { id: 'water', label: 'Water', answer: 'abiotic' },
            { id: 'shelf-fungus', label: 'Mushroom', answer: 'biotic' },
            { id: 'red-tailed-hawk', label: 'Hawk', answer: 'biotic' },
            { id: 'soil', label: 'Soil', answer: 'abiotic' },
            { id: 'largemouth-bass', label: 'Bass', answer: 'biotic' },
            { id: 'wind', label: 'Wind', answer: 'abiotic' },
            { id: 'algae', label: 'Algae', answer: 'biotic' },
          ],
        },
      },
      {
        type: 'check',
        title: 'Check Your Understanding',
        interaction: 'QuizQuestion',
        props: { questionIds: ['q-sunlight-class', 'q-plants-class', 'q-abiotic-not-animal'] },
      },
    ],
  },
  {
    slug: 'biotic-abiotic',
    number: 2,
    title: 'Biotic vs Abiotic',
    subtitle: 'Sort living from nonliving',
    icon: '🔬',
    color: '#60a5fa',
    steps: [
      {
        type: 'teach',
        title: 'The Rule Is Simple',
        content: '**Biotic** = living things. Plants, animals, fungi, bacteria — if it\'s alive (or was alive), it\'s biotic.\n\n**Abiotic** = nonliving things. Water, rocks, sunlight, air, temperature — these were never alive.\n\nHere\'s something kids get wrong a lot: **abiotic does not mean animal.** It means not alive. Animals are always biotic.',
        keyLine: 'Abiotic does not mean animal. It means not alive.',
      },
      {
        type: 'practice',
        title: 'Card Sort',
        interaction: 'CardSort',
        props: {
          instructions: 'Sort each card into the right category.',
          categories: ['Biotic', 'Abiotic'],
          cards: [
            { id: 'c-oak', label: 'Oak Tree', category: 'Biotic', hint: 'Trees grow, reproduce, and need energy.' },
            { id: 'c-grass', label: 'Grass', category: 'Biotic', hint: 'Grass is a living plant.' },
            { id: 'c-algae', label: 'Algae', category: 'Biotic', hint: 'Algae is alive — it makes its own food.' },
            { id: 'c-rabbit', label: 'Rabbit', category: 'Biotic', hint: 'Animals are always biotic.' },
            { id: 'c-frog', label: 'Frog', category: 'Biotic', hint: 'Frogs are living animals.' },
            { id: 'c-hawk', label: 'Hawk', category: 'Biotic', hint: 'Hawks are living animals.' },
            { id: 'c-bass', label: 'Bass', category: 'Biotic', hint: 'Fish are living animals.' },
            { id: 'c-mushroom', label: 'Mushroom', category: 'Biotic', hint: 'Fungi are biotic — they\'re alive.' },
            { id: 'c-bacteria', label: 'Bacteria', category: 'Biotic', hint: 'Bacteria are tiny living things.' },
            { id: 'c-sunlight', label: 'Sunlight', category: 'Abiotic', hint: 'Sunlight is energy, not a living thing.' },
            { id: 'c-water', label: 'Water', category: 'Abiotic', hint: 'Water is a nonliving substance.' },
            { id: 'c-air', label: 'Air', category: 'Abiotic', hint: 'Air is a mixture of gases.' },
            { id: 'c-soil', label: 'Soil', category: 'Abiotic', hint: 'Soil is nonliving material.' },
            { id: 'c-rocks', label: 'Rocks', category: 'Abiotic', hint: 'Rocks were never alive.' },
            { id: 'c-temp', label: 'Temperature', category: 'Abiotic', hint: 'Temperature is a condition, not a living thing.' },
            { id: 'c-rain', label: 'Rain', category: 'Abiotic', hint: 'Rain is water falling from clouds.' },
            { id: 'c-wind', label: 'Wind', category: 'Abiotic', hint: 'Wind is moving air.' },
          ],
        },
      },
      {
        type: 'teach',
        title: 'Tricky Cases',
        content: 'Some things are harder to classify.\n\nA **dead leaf** was once part of a living tree. Scientists still call it biotic because it came from a living thing.\n\nA **shell** came from a living snail. Biotic.\n\nA **feather** came from a living bird. Biotic.\n\nA **bone** came from a living animal. Biotic.\n\nThe rule: if it came from something alive, it\'s biotic — even after that thing dies.',
        keyLine: 'If it came from something alive, it\'s biotic.',
      },
      {
        type: 'practice',
        title: 'Tricky Cases',
        interaction: 'CardSort',
        props: {
          instructions: 'These are trickier! Think carefully about where each came from.',
          categories: ['Biotic', 'Abiotic'],
          cards: [
            { id: 'tc-dead-leaf', label: 'Dead Leaf', category: 'Biotic', hint: 'It came from a living tree.' },
            { id: 'tc-shell', label: 'Snail Shell', category: 'Biotic', hint: 'Made by a living snail.' },
            { id: 'tc-feather', label: 'Feather', category: 'Biotic', hint: 'Grew from a living bird.' },
            { id: 'tc-bone', label: 'Bone', category: 'Biotic', hint: 'Part of a living animal.' },
            { id: 'tc-fallen-log', label: 'Fallen Log', category: 'Biotic', hint: 'It was a living tree.' },
            { id: 'tc-river-rock', label: 'River Rock', category: 'Abiotic', hint: 'Rocks were never alive.' },
            { id: 'tc-ice', label: 'Ice', category: 'Abiotic', hint: 'Ice is just frozen water.' },
            { id: 'tc-sand', label: 'Sand', category: 'Abiotic', hint: 'Sand is tiny rock particles.' },
          ],
        },
      },
      {
        type: 'check',
        title: 'Check Your Understanding',
        interaction: 'QuizQuestion',
        props: { questionIds: ['q-mushroom-class', 'q-abiotic-not-animal'] },
      },
    ],
  },
  {
    slug: 'living-needs',
    number: 3,
    title: 'What Living Things Need',
    subtitle: 'Connect biotic and abiotic',
    icon: '💧',
    color: '#f59e0b',
    steps: [
      {
        type: 'teach',
        title: 'Living Things Depend on Nonliving Things',
        content: 'Living things can\'t survive without the right abiotic conditions.\n\n**Plants need:** sunlight, water, air, nutrients from soil, and space to grow.\n\n**Animals need:** water, air, food, shelter, space, and the right temperature.\n\nAbiotic factors help decide what can live in a habitat.',
        keyLine: 'Abiotic factors help decide what can live in a habitat.',
      },
      {
        type: 'teach',
        title: 'Local Examples',
        content: 'A **largemouth bass** needs water with enough dissolved oxygen. If the pond gets too warm, oxygen drops and the bass struggles.\n\nA **white oak** needs sunlight and water to grow. In a drought, the tree produces fewer acorns — which means less food for mice and squirrels.\n\nA **copperhead snake** is cold-blooded. It needs warm temperatures to hunt and cold shelter to cool down.',
        keyLine: 'A fish needs water with enough oxygen. A plant needs sunlight and water to grow.',
      },
      {
        type: 'practice',
        title: 'Match the Needs',
        interaction: 'MatchingGame',
        props: {
          instructions: 'Connect each organism to what it needs most.',
          pairs: [
            { organismId: 'largemouth-bass', organismLabel: 'Largemouth Bass', needId: 'oxygen-water', needLabel: 'Oxygen in water' },
            { organismId: 'white-oak', organismLabel: 'White Oak', needId: 'sunlight', needLabel: 'Sunlight' },
            { organismId: 'bullfrog', organismLabel: 'Bullfrog', needId: 'pond-water', needLabel: 'Pond water' },
            { organismId: 'copperhead', organismLabel: 'Copperhead', needId: 'warmth', needLabel: 'Warm temperature' },
            { organismId: 'earthworm', organismLabel: 'Earthworm', needId: 'moist-soil', needLabel: 'Moist soil' },
            { organismId: 'algae', organismLabel: 'Algae', needId: 'nutrients', needLabel: 'Nutrients in water' },
          ],
        },
      },
      {
        type: 'check',
        title: 'Check Your Understanding',
        interaction: 'QuizQuestion',
        props: { questionIds: ['q-abiotic-pond'] },
      },
    ],
  },
  {
    slug: 'predator-traits',
    number: 4,
    title: 'What Makes a Predator?',
    subtitle: 'Hunters of the Ozarks',
    icon: '🦅',
    color: '#ef4444',
    steps: [
      {
        type: 'teach',
        title: 'What Is a Predator?',
        content: 'A **predator** is an animal that hunts, catches, and eats other animals.\n\nPredators have special traits that help them hunt:\n\n• **Sharp teeth or beak** — for catching and tearing\n• **Claws or talons** — for grabbing\n• **Speed** — for chasing\n• **Camouflage** — for hiding before striking\n• **Strong senses** — for finding prey\n• **Teamwork** — some hunt in packs\n• **Venom** — injected through bite or sting',
        keyLine: 'Predators hunt other animals.',
      },
      {
        type: 'teach',
        title: 'Ozarks Predators',
        content: 'Not all predators are big. Some are tiny.\n\n**Red-tailed Hawk** — sharp talons, keen eyesight, dives at high speed.\n**Coyote** — strong nose, speed, hunts in family groups.\n**Garden Spider** — builds webs, senses vibrations, uses venom.\n**Copperhead** — camouflage, heat-sensing pits, venom.\n**Largemouth Bass** — ambush hunter, huge mouth, fast strike.\n**Bullfrog** — sticky tongue, lightning-fast strike.\n**Dragonfly** — catches prey mid-flight at 95% success rate.',
        keyLine: 'Not all predators are top predators. Some animals are both predator and prey.',
      },
      {
        type: 'teach',
        title: 'Both Predator and Prey',
        content: 'Here\'s something important: **some animals are both predator and prey.**\n\nA **bullfrog** eats insects — so it\'s a predator.\nBut a **bass** eats the bullfrog — so the frog is also prey.\n\nA **copperhead** hunts mice — predator.\nBut a **hawk** hunts the copperhead — prey.\n\nAn animal\'s role depends on who else is in the food chain.',
        keyLine: 'Some animals are both predator and prey.',
      },
      {
        type: 'practice',
        title: 'Spot the Predator Traits',
        interaction: 'CardSort',
        props: {
          instructions: 'Which of these are predator traits?',
          categories: ['Predator Trait', 'Not a Predator Trait'],
          cards: [
            { id: 'pt-talons', label: 'Sharp Talons', category: 'Predator Trait', hint: 'Think about what this helps an animal do.' },
            { id: 'pt-camouflage', label: 'Camouflage for Hunting', category: 'Predator Trait', hint: 'Does this help catch prey or avoid predators?' },
            { id: 'pt-venom', label: 'Venom', category: 'Predator Trait', hint: 'What does an animal use this for?' },
            { id: 'pt-speed', label: 'Speed to Chase Prey', category: 'Predator Trait', hint: 'The card itself tells you what this is for.' },
            { id: 'pt-web', label: 'Web Building', category: 'Predator Trait', hint: 'What does a spider use its web for?' },
            { id: 'pt-keen-eyes', label: 'Keen Eyesight', category: 'Predator Trait', hint: 'Good vision helps hunters spot their targets.' },
            { id: 'pt-photosynthesis', label: 'Photosynthesis', category: 'Not a Predator Trait', hint: 'This is how plants make food from sunlight.' },
            { id: 'pt-roots', label: 'Deep Roots', category: 'Not a Predator Trait', hint: 'What kind of organism has roots?' },
            { id: 'pt-bark', label: 'Thick Bark', category: 'Not a Predator Trait', hint: 'This protects trees, not helps them hunt.' },
            { id: 'pt-seeds', label: 'Spreading Seeds', category: 'Not a Predator Trait', hint: 'This is how plants reproduce.' },
          ],
        },
      },
      {
        type: 'check',
        title: 'Check Your Understanding',
        interaction: 'QuizQuestion',
        props: { questionIds: ['q-predator-def', 'q-both-roles'] },
      },
    ],
  },
  {
    slug: 'predator-prey',
    number: 5,
    title: 'Predator, Prey, and Other Eaters',
    subtitle: 'Not everything hunts',
    icon: '🐾',
    color: '#a855f7',
    steps: [
      {
        type: 'teach',
        title: 'Different Ways to Eat',
        content: 'Not every animal that eats meat is a predator. There are many roles:\n\n**Predator** — hunts and kills other animals.\n**Prey** — gets hunted and eaten.\n**Herbivore** — eats only plants.\n**Omnivore** — eats both plants and animals.\n**Scavenger** — eats dead animals it did not kill.\n**Decomposer** — breaks down dead plants and animals.',
        keyLine: 'An animal that eats meat is not always a predator. Some are scavengers.',
      },
      {
        type: 'teach',
        title: 'Local Examples',
        content: '**Rabbit** = prey + herbivore. Eats plants. Gets hunted by hawks and coyotes.\n\n**Hawk** = predator. Hunts mice, rabbits, and snakes.\n\n**Raccoon** = omnivore. Eats crayfish, berries, and whatever it can find.\n\n**Turkey Vulture** = scavenger. Eats dead animals it finds. Does not hunt.\n\n**Shelf Fungus** = decomposer. Breaks down dead wood on the forest floor.\n\nPrey isn\'t weak — rabbits are fast, deer can jump 8 feet, and crayfish pinch.',
        keyLine: 'Prey has survival traits too.',
      },
      {
        type: 'practice',
        title: 'Classify the Role',
        interaction: 'CardSort',
        props: {
          instructions: 'Sort each animal into its primary role.',
          categories: ['Predator', 'Prey / Herbivore', 'Omnivore', 'Scavenger', 'Decomposer'],
          cards: [
            { id: 'r-hawk', label: 'Red-tailed Hawk', category: 'Predator', hint: 'Does this animal hunt and kill other animals?' },
            { id: 'r-coyote', label: 'Coyote', category: 'Predator', hint: 'Does this animal hunt and kill other animals?' },
            { id: 'r-bass', label: 'Largemouth Bass', category: 'Predator', hint: 'This fish ambushes smaller fish and frogs.' },
            { id: 'r-rabbit', label: 'Cottontail Rabbit', category: 'Prey / Herbivore', hint: 'Does a rabbit hunt, or does it eat plants and get hunted?' },
            { id: 'r-grasshopper', label: 'Grasshopper', category: 'Prey / Herbivore', hint: 'Think about what grasshoppers eat.' },
            { id: 'r-deer', label: 'White-tailed Deer', category: 'Prey / Herbivore', hint: 'Deer browse on plants and get hunted by coyotes.' },
            { id: 'r-raccoon', label: 'Raccoon', category: 'Omnivore', hint: 'Raccoons eat berries, crayfish, and almost anything.' },
            { id: 'r-turtle', label: 'Box Turtle', category: 'Omnivore', hint: 'Box turtles eat mushrooms, berries, and insects.' },
            { id: 'r-vulture', label: 'Turkey Vulture', category: 'Scavenger', hint: 'Vultures circle looking for dead animals to eat.' },
            { id: 'r-fungus', label: 'Shelf Fungus', category: 'Decomposer', hint: 'Fungi break down dead wood and leaves.' },
            { id: 'r-worm', label: 'Earthworm', category: 'Decomposer', hint: 'Worms eat dead plant matter in soil.' },
          ],
        },
      },
      {
        type: 'check',
        title: 'Check Your Understanding',
        interaction: 'QuizQuestion',
        props: { questionIds: ['q-prey-def', 'q-scavenger'] },
      },
    ],
  },
  {
    slug: 'food-chains',
    number: 6,
    title: 'Food Chains',
    subtitle: 'Follow the energy',
    icon: '⛓️',
    color: '#14b8a6',
    steps: [
      {
        type: 'teach',
        title: 'Energy Flows',
        content: 'Energy starts with the **sun**.\n\n**Producers** (plants, algae) use sunlight to make food.\n\n**Consumers** eat producers or other consumers.\n\n**Decomposers** break down what\'s left.\n\nA **food chain** shows this path of energy from one living thing to the next.',
        keyLine: 'The arrow points to the eater because energy moves to the eater.',
      },
      {
        type: 'teach',
        title: 'Ozarks Food Chains',
        content: '**Creek Chain:**\nSun → Algae → Mayfly → Minnow → Bass → Great Blue Heron\n\n**Woods Chain:**\nSun → White Oak → Field Mouse → Copperhead → Red-tailed Hawk\n\n**Prairie Chain:**\nSun → Big Bluestem → Grasshopper → Bullfrog → Coyote\n\nNotice: the arrow → means "is eaten by." Energy flows from food to eater.',
        keyLine: 'The arrow means "is eaten by" — energy moves in that direction.',
      },
      {
        type: 'practice',
        title: 'Build a Food Chain',
        interaction: 'DragToOrder',
        props: {
          instructions: 'Put these in the right order to build a food chain. Start with the producer.',
          chains: [
            {
              id: 'creek-chain',
              name: 'Creek Chain',
              cards: [
                { id: 'dc-algae', label: 'Algae', role: 'Producer', order: 0 },
                { id: 'dc-mayfly', label: 'Mayfly', role: 'Primary Consumer', order: 1 },
                { id: 'dc-minnow', label: 'Minnow', role: 'Secondary Consumer', order: 2 },
                { id: 'dc-bass', label: 'Largemouth Bass', role: 'Tertiary Consumer', order: 3 },
                { id: 'dc-heron', label: 'Great Blue Heron', role: 'Top Predator', order: 4 },
              ],
            },
            {
              id: 'woods-chain',
              name: 'Woods Chain',
              cards: [
                { id: 'dc-oak', label: 'White Oak', role: 'Producer', order: 0 },
                { id: 'dc-mouse', label: 'Field Mouse', role: 'Primary Consumer', order: 1 },
                { id: 'dc-snake', label: 'Copperhead', role: 'Secondary Consumer', order: 2 },
                { id: 'dc-hawk', label: 'Red-tailed Hawk', role: 'Top Predator', order: 3 },
              ],
            },
            {
              id: 'prairie-chain',
              name: 'Prairie Chain',
              cards: [
                { id: 'dc-grass', label: 'Big Bluestem', role: 'Producer', order: 0 },
                { id: 'dc-grasshopper', label: 'Grasshopper', role: 'Primary Consumer', order: 1 },
                { id: 'dc-frog', label: 'Bullfrog', role: 'Secondary Consumer', order: 2 },
                { id: 'dc-coyote', label: 'Coyote', role: 'Top Predator', order: 3 },
              ],
            },
          ],
        },
      },
      {
        type: 'check',
        title: 'Check Your Understanding',
        interaction: 'QuizQuestion',
        props: { questionIds: ['q-arrow-direction', 'q-producer-def', 'q-decomposer'] },
      },
    ],
  },
  {
    slug: 'food-webs',
    number: 7,
    title: 'Food Webs',
    subtitle: 'Everything connects',
    icon: '🕸️',
    color: '#ec4899',
    steps: [
      {
        type: 'teach',
        title: 'Chains Connect Into Webs',
        content: 'Real ecosystems aren\'t one straight chain.\n\nMost animals eat more than one thing. And most organisms are eaten by more than one predator.\n\nWhen you connect many food chains together, you get a **food web**.\n\nFood webs show how living things depend on each other.',
        keyLine: 'Food webs show how living things depend on each other.',
      },
      {
        type: 'teach',
        title: 'How to Read a Food Web',
        content: 'In the food web you\'re about to explore:\n\n• Tap any organism to see its connections.\n• **Green lines** show what it eats.\n• **Red lines** show what eats it.\n• Everything else dims so you can focus.\n\nNotice how many connections each organism has. That\'s why one change can ripple through the whole system.',
        keyLine: 'One organism connects to many others.',
      },
      {
        type: 'practice',
        title: 'Explore the Food Web',
        interaction: 'FoodWebGraph',
        props: {
          instructions: 'Tap any organism to see what it eats and what eats it.',
        },
      },
      {
        type: 'check',
        title: 'Check Your Understanding',
        interaction: 'QuizQuestion',
        props: { questionIds: ['q-food-web'] },
      },
    ],
  },
  {
    slug: 'springfield-explorer',
    number: 8,
    title: 'Springfield Ecosystem Explorer',
    subtitle: 'Three local habitats',
    icon: '🗺️',
    color: '#84cc16',
    steps: [
      {
        type: 'teach',
        title: 'Different Habitats, Different Life',
        content: 'A **habitat** is the place where an organism lives.\n\nSpringfield and the Ozarks have many habitats. We\'ll explore three:\n\n🌳 **Woods / Backyard Edge** — oak forests, fallen logs, hawks above.\n🐟 **Pond / Creek** — rocky creeks, still ponds, fish and frogs.\n🌾 **Field / Prairie** — tall grasses, wildflowers, grasshoppers and snakes.\n\nEach habitat has different biotic and abiotic parts.',
        keyLine: 'Different habitats have different biotic and abiotic parts.',
      },
      {
        type: 'practice',
        title: 'Explore the Habitats',
        interaction: 'HabitatExplorer',
        props: {
          instructions: 'Choose a habitat and tap any organism or abiotic factor to learn about it.',
        },
      },
      {
        type: 'check',
        title: 'Check Your Understanding',
        interaction: 'QuizQuestion',
        props: { questionIds: ['q-habitat-def'] },
      },
    ],
  },
  {
    slug: 'changes',
    number: 9,
    title: 'What Happens When Something Changes?',
    subtitle: 'Ripple effects',
    icon: '🌊',
    color: '#f97316',
    steps: [
      {
        type: 'teach',
        title: 'Ecosystems Are Connected',
        content: 'Everything in an ecosystem is connected. When one thing changes, other things change too.\n\nLess rain → plants struggle → herbivores have less food → predators lose prey.\n\nFewer hawks → more mice and rabbits → more plants get eaten.\n\nDirty water → fewer insects or fish → predators lose food.\n\nThese are called **ripple effects** because one change ripples outward.',
        keyLine: 'A change in one part of an ecosystem can affect many other parts.',
      },
      {
        type: 'practice',
        title: 'Scenario Cards',
        interaction: 'ScenarioCards',
        props: {
          instructions: 'Tap each card to see what happens when something changes in the ecosystem.',
        },
      },
      {
        type: 'check',
        title: 'Check Your Understanding',
        interaction: 'QuizQuestion',
        props: { questionIds: ['q-ecosystem-change'] },
      },
    ],
  },
  {
    slug: 'final-challenge',
    number: 10,
    title: 'Final Challenge',
    subtitle: 'Put it all together',
    icon: '🏆',
    color: '#eab308',
    steps: [
      {
        type: 'teach',
        title: 'You\'ve Learned a Lot',
        content: 'Let\'s see what you remember.\n\nThis challenge mixes everything together:\n\n• Biotic vs abiotic\n• Predators and prey\n• Food chains and food webs\n• Ecosystem changes\n\nTake your time. You\'ve got this.',
        keyLine: 'Everything connects.',
      },
      {
        type: 'practice',
        title: 'Final Quiz',
        interaction: 'QuizQuestion',
        props: {
          questionIds: [
            'q-sunlight-class',
            'q-predator-def',
            'q-both-roles',
            'q-arrow-direction',
            'q-abiotic-pond',
            'q-producer-def',
            'q-scavenger',
            'q-food-web',
            'q-ecosystem-change',
            'q-abiotic-not-animal',
          ],
          showScore: true,
        },
      },
    ],
  },
];

export function getModule(slug: string): ModuleDef | undefined {
  return modules.find(m => m.slug === slug);
}

export function getModuleByNumber(num: number): ModuleDef | undefined {
  return modules.find(m => m.number === num);
}
