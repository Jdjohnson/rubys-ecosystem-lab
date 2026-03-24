import type { QuizQuestion } from '@/lib/types';

export const quizBank: QuizQuestion[] = [
  {
    id: 'q-sunlight-class',
    module: 'biotic-abiotic',
    question: 'Is sunlight biotic or abiotic?',
    type: 'multiple-choice',
    options: [
      { text: 'Biotic', correct: false },
      { text: 'Abiotic', correct: true },
    ],
    explanation: 'Sunlight is abiotic. It is not alive, but living things depend on it for energy.',
  },
  {
    id: 'q-mushroom-class',
    module: 'biotic-abiotic',
    question: 'Is a mushroom biotic or abiotic?',
    type: 'multiple-choice',
    options: [
      { text: 'Biotic', correct: true },
      { text: 'Abiotic', correct: false },
    ],
    explanation: 'Mushrooms are biotic. They are living things — they are decomposers that break down dead material.',
  },
  {
    id: 'q-predator-def',
    module: 'predator-traits',
    question: 'What is a predator?',
    type: 'multiple-choice',
    options: [
      { text: 'An animal that eats only plants', correct: false },
      { text: 'An animal that hunts and eats other animals', correct: true },
      { text: 'An animal that eats dead animals it finds', correct: false },
      { text: 'A plant that catches insects', correct: false },
    ],
    explanation: 'A predator is an animal that hunts and eats other animals.',
  },
  {
    id: 'q-prey-def',
    module: 'predator-prey',
    question: 'What is prey?',
    type: 'multiple-choice',
    options: [
      { text: 'An animal that hunts other animals', correct: false },
      { text: 'An animal that is hunted and eaten by a predator', correct: true },
      { text: 'A plant that animals eat', correct: false },
      { text: 'A nonliving part of an ecosystem', correct: false },
    ],
    explanation: 'Prey is an animal that is hunted and eaten by a predator.',
  },
  {
    id: 'q-plants-class',
    module: 'biotic-abiotic',
    question: 'Are plants biotic or abiotic?',
    type: 'multiple-choice',
    options: [
      { text: 'Biotic — plants are living things', correct: true },
      { text: 'Abiotic — plants don\'t move so they\'re not alive', correct: false },
    ],
    explanation: 'Plants are biotic. They are living things that grow, reproduce, and make their own food.',
  },
  {
    id: 'q-arrow-direction',
    module: 'food-chains',
    question: 'In a food chain, which way does the arrow point?',
    type: 'multiple-choice',
    options: [
      { text: 'Toward the thing being eaten', correct: false },
      { text: 'Toward the eater — energy moves to the eater', correct: true },
      { text: 'Both directions', correct: false },
      { text: 'Toward the sun', correct: false },
    ],
    explanation: 'The arrow points toward the eater because energy moves from the food to the eater.',
  },
  {
    id: 'q-both-roles',
    module: 'predator-prey',
    question: 'Can an animal be both predator and prey?',
    type: 'true-false',
    options: [
      { text: 'Yes', correct: true },
      { text: 'No', correct: false },
    ],
    explanation: 'Yes! A bullfrog eats insects (predator) but can be eaten by a bass or snake (prey).',
  },
  {
    id: 'q-abiotic-pond',
    module: 'living-needs',
    question: 'Which of these is an abiotic factor in a pond?',
    type: 'multiple-choice',
    options: [
      { text: 'Algae', correct: false },
      { text: 'Crayfish', correct: false },
      { text: 'Water temperature', correct: true },
      { text: 'Cattail', correct: false },
    ],
    explanation: 'Water temperature is abiotic — it\'s a nonliving factor that affects what can live in the pond.',
  },
  {
    id: 'q-producer-def',
    module: 'food-chains',
    question: 'What does a producer do?',
    type: 'multiple-choice',
    options: [
      { text: 'Hunts other animals', correct: false },
      { text: 'Breaks down dead material', correct: false },
      { text: 'Makes its own food using sunlight', correct: true },
      { text: 'Eats plants and animals', correct: false },
    ],
    explanation: 'A producer makes its own food. Plants and algae use sunlight to produce energy through photosynthesis.',
  },
  {
    id: 'q-ecosystem-change',
    module: 'changes',
    question: 'What happens to an ecosystem when one part changes?',
    type: 'multiple-choice',
    options: [
      { text: 'Nothing — ecosystems don\'t change', correct: false },
      { text: 'Only that one part is affected', correct: false },
      { text: 'Other parts can change too because everything is connected', correct: true },
      { text: 'The whole ecosystem immediately dies', correct: false },
    ],
    explanation: 'Ecosystems are connected. A change in one part can ripple through and affect many other parts.',
  },
  {
    id: 'q-scavenger',
    module: 'predator-prey',
    question: 'A turkey vulture eats dead animals it finds. What is it called?',
    type: 'multiple-choice',
    options: [
      { text: 'Predator', correct: false },
      { text: 'Herbivore', correct: false },
      { text: 'Scavenger', correct: true },
      { text: 'Producer', correct: false },
    ],
    explanation: 'A scavenger eats dead animals it did not kill. Turkey vultures are scavengers, not predators.',
  },
  {
    id: 'q-decomposer',
    module: 'food-chains',
    question: 'What role does shelf fungus play in an ecosystem?',
    type: 'multiple-choice',
    options: [
      { text: 'Producer', correct: false },
      { text: 'Predator', correct: false },
      { text: 'Decomposer', correct: true },
      { text: 'Prey', correct: false },
    ],
    explanation: 'Shelf fungus is a decomposer. It breaks down dead wood and returns nutrients to the soil.',
  },
  {
    id: 'q-food-web',
    module: 'food-webs',
    question: 'How is a food web different from a food chain?',
    type: 'multiple-choice',
    options: [
      { text: 'A food web is simpler', correct: false },
      { text: 'A food web shows many connected food chains', correct: true },
      { text: 'A food web only has predators', correct: false },
      { text: 'There is no difference', correct: false },
    ],
    explanation: 'A food web is many food chains connected together. It shows how living things depend on each other in complex ways.',
  },
  {
    id: 'q-habitat-def',
    module: 'springfield-explorer',
    question: 'What is a habitat?',
    type: 'multiple-choice',
    options: [
      { text: 'Any place on Earth', correct: false },
      { text: 'The place where an organism lives', correct: true },
      { text: 'A type of food chain', correct: false },
      { text: 'A nonliving thing', correct: false },
    ],
    explanation: 'A habitat is the place where an organism lives. Different habitats have different biotic and abiotic parts.',
  },
  {
    id: 'q-abiotic-not-animal',
    module: 'biotic-abiotic',
    question: 'What does "abiotic" mean?',
    type: 'multiple-choice',
    options: [
      { text: 'A type of animal', correct: false },
      { text: 'Something that is not alive', correct: true },
      { text: 'A plant that doesn\'t move', correct: false },
      { text: 'An animal that lives in water', correct: false },
    ],
    explanation: 'Abiotic means not alive. It refers to nonliving parts of an ecosystem like water, sunlight, air, and rocks. Animals are always biotic.',
  },
];

export function getQuizzesByModule(moduleSlug: string): QuizQuestion[] {
  return quizBank.filter(q => q.module === moduleSlug);
}

export function getQuiz(id: string): QuizQuestion | undefined {
  return quizBank.find(q => q.id === id);
}
