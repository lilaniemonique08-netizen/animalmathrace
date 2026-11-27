import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ANIMALS, AnimalProfile } from '../types/game';
import { AnimalIllustration } from './AnimalArt';

interface CharacterSelectProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSelect: (animal: AnimalProfile) => void;
  onSpeakPrompt: () => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({
  soundEnabled,
  onToggleSound,
  onSelect,
  onSpeakPrompt,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-between min-h-dvh w-full overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-200 px-4 py-6 md:py-10">
      {/* Top-right Sound & Music toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Mute music and sounds' : 'Turn on music and sounds'}
          title={soundEnabled ? 'Sounds On' : 'Sounds Off'}
          className={`flex items-center justify-center w-12 h-12 rounded-2xl border-4 transition-all cursor-pointer active:translate-y-0.5 ${
            soundEnabled
              ? 'bg-amber-200 border-amber-500 shadow-[0_4px_0_#D97706]'
              : 'bg-slate-200 border-slate-400 shadow-[0_4px_0_#64748B]'
          }`}
        >
          {soundEnabled ? (
            <Volume2 className="w-6 h-6 text-amber-950" strokeWidth={2.6} />
          ) : (
            <VolumeX className="w-6 h-6 text-slate-600" strokeWidth={2.6} />
          )}
        </button>
      </div>

      {/* Sunny sky decorations */}
      <div className="pointer-events-none absolute top-4 left-6 md:top-8 md:left-12" aria-hidden="true">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-yellow-300 border-4 border-amber-400 shadow-[0_0_40px_rgba(253,224,71,0.75)] animate-sun-pulse" />
      </div>

      <div className="pointer-events-none absolute top-8 right-20 md:right-28 opacity-90 animate-cloud-drift" aria-hidden="true">
        <div className="flex items-end">
          <div className="w-14 h-10 bg-white rounded-full -mr-4" />
          <div className="w-20 h-14 bg-white rounded-full -mr-4" />
          <div className="w-12 h-9 bg-white rounded-full" />
        </div>
      </div>

      {/* Grassy horizon */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-28 md:h-36 bg-gradient-to-t from-green-500 to-green-400 border-t-4 border-green-600/40"
        aria-hidden="true"
      />

      {/* Top welcoming header */}
      <div className="relative z-10 flex flex-col items-center text-center mt-10 sm:mt-4 md:mt-2">
        <div className="flex items-center justify-center gap-3">
          <h1 className="font-bubble text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 tracking-tight drop-shadow-[0_3px_0_rgba(255,255,255,0.9)]">
            Pick Your Racer!
          </h1>
          <button
            type="button"
            onClick={onSpeakPrompt}
            aria-label="Hear instructions"
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-300 hover:bg-amber-200 border-4 border-amber-600 shadow-[0_5px_0_#D97706] active:translate-y-1 active:shadow-[0_1px_0_#D97706] transition-all cursor-pointer"
          >
            <Volume2 className="w-8 h-8 text-amber-950" strokeWidth={2.8} />
          </button>
        </div>
      </div>

      {/* 4 Big Tactile Animal Cards */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl my-auto py-6">
        {ANIMALS.map((animal, idx) => (
          <button
            key={animal.id}
            type="button"
            onClick={() => onSelect(animal)}
            aria-label={`Race as ${animal.name}`}
            className={`group flex flex-col items-center justify-center rounded-3xl border-4 p-4 sm:p-6 transition-transform duration-150 hover:-translate-y-1.5 active:translate-y-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500 ${animal.cardBg} ${animal.cardBorder} ${animal.cardShadow} active:shadow-none`}
          >
            <div
              className="animate-float-slow transition-transform duration-200 group-hover:scale-110"
              style={{ animationDelay: `${idx * 0.25}s` }}
            >
              <AnimalIllustration
                id={animal.id}
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 drop-shadow-sm"
              />
            </div>
            <span className="mt-2 font-bubble text-2xl sm:text-3xl font-bold text-slate-800 tracking-wide">
              {animal.name}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom spacer for grassy balance */}
      <div className="relative z-10 h-6" aria-hidden="true" />
    </div>
  );
};
