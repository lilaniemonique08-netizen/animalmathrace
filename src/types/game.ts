export type AnimalId = 'dog' | 'cat' | 'turtle' | 'cheetah';

export type CountingItemTheme = 'apple' | 'star' | 'paw' | 'strawberry';

export type GamePhase = 'SELECT' | 'RACING' | 'VICTORY';

export interface AnimalProfile {
  id: AnimalId;
  name: string;
  soundWord: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  accentColor: string;
}

export interface MathQuestion {
  id: number;
  left: number;
  right: number;
  answer: number;
  choices: number[];
  theme: CountingItemTheme;
}

export interface PoopEvent {
  id: number;
  lane: 'player' | 'opponent';
  pct: number;
}

export const TOTAL_RACE_STEPS = 6;

export const ANIMALS: AnimalProfile[] = [
  {
    id: 'dog',
    name: 'Puppy',
    soundWord: 'Woof',
    cardBg: 'bg-amber-100',
    cardBorder: 'border-amber-500',
    cardShadow: 'shadow-[0_8px_0_#D97706]',
    accentColor: '#F59E0B',
  },
  {
    id: 'cat',
    name: 'Kitty',
    soundWord: 'Meow',
    cardBg: 'bg-rose-100',
    cardBorder: 'border-rose-400',
    cardShadow: 'shadow-[0_8px_0_#E11D48]',
    accentColor: '#FB7185',
  },
  {
    id: 'turtle',
    name: 'Turtle',
    soundWord: 'Zoom',
    cardBg: 'bg-emerald-100',
    cardBorder: 'border-emerald-500',
    cardShadow: 'shadow-[0_8px_0_#059669]',
    accentColor: '#10B981',
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    soundWord: 'Roar',
    cardBg: 'bg-yellow-100',
    cardBorder: 'border-orange-400',
    cardShadow: 'shadow-[0_8px_0_#EA580C]',
    accentColor: '#F97316',
  },
];
