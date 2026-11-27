import React from 'react';
import { RotateCcw, Star } from 'lucide-react';
import { AnimalProfile } from '../types/game';
import { AnimalIllustration, TrophyIllustration } from './AnimalArt';
import { ConfettiOverlay } from './ConfettiOverlay';

interface VictoryScreenProps {
  playerWon: boolean;
  player: AnimalProfile;
  opponent: AnimalProfile;
  onPlayAgain: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  playerWon,
  player,
  opponent,
  onPlayAgain,
}) => {
  const winnerAnimal = playerWon ? player : opponent;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-dvh w-full overflow-hidden bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-200 px-4 py-8">
      <ConfettiOverlay active={true} />

      {/* Center Celebration Card */}
      <div className="relative z-20 flex flex-col items-center text-center bg-white/95 rounded-[2.5rem] border-4 border-amber-400 shadow-[0_12px_0_#F59E0B] px-6 py-8 sm:px-12 sm:py-10 max-w-lg w-full">
        {/* Big Trophy */}
        <div className="animate-trophy-bounce -mt-16 sm:-mt-20 mb-2">
          <TrophyIllustration className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-md" />
        </div>

        <h1 className="font-bubble text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">
          {playerWon ? 'You Won!' : 'Great Try!'}
        </h1>

        {/* Winning Racer Display */}
        <div className="relative my-5 flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-7 h-7 text-amber-400 fill-amber-400" />
            <Star className="w-9 h-9 text-amber-400 fill-amber-400 -mt-2" />
            <Star className="w-7 h-7 text-amber-400 fill-amber-400" />
          </div>
          <div className="animate-float-slow">
            <AnimalIllustration
              id={winnerAnimal.id}
              className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-md"
            />
          </div>
        </div>

        {/* Giant Unmistakable Play Again Button with Circular Arrow Icon */}
        <button
          type="button"
          onClick={onPlayAgain}
          className="w-full flex items-center justify-center gap-4 px-8 py-5 sm:py-6 rounded-3xl bg-emerald-400 hover:bg-emerald-300 border-4 border-emerald-700 shadow-[0_8px_0_#047857] active:translate-y-1.5 active:shadow-[0_2px_0_#047857] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600"
        >
          <RotateCcw className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-950" strokeWidth={3} />
          <span className="font-bubble text-3xl sm:text-4xl font-bold text-emerald-950 whitespace-nowrap">
            Play Again
          </span>
        </button>
      </div>
    </div>
  );
};
