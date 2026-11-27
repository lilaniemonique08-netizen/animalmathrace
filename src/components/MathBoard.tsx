import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { MathQuestion } from '../types/game';
import { CountingObjectSvg } from './AnimalArt';

interface MathBoardProps {
  question: MathQuestion;
  wrongChoices: number[];
  shakingChoice: number | null;
  solvedAnswer: number | null;
  isLocked: boolean;
  onSelectAnswer: (choice: number) => void;
  onRepeatQuestion: () => void;
  onTapCountingObject: (countIndex: number) => void;
}

const CHOICE_STYLES = [
  {
    bg: 'bg-amber-300 hover:bg-amber-200',
    border: 'border-amber-600',
    shadow: 'shadow-[0_8px_0_#D97706]',
    text: 'text-amber-950',
  },
  {
    bg: 'bg-sky-300 hover:bg-sky-200',
    border: 'border-sky-600',
    shadow: 'shadow-[0_8px_0_#0284C7]',
    text: 'text-sky-950',
  },
  {
    bg: 'bg-rose-300 hover:bg-rose-200',
    border: 'border-rose-600',
    shadow: 'shadow-[0_8px_0_#E11D48]',
    text: 'text-rose-950',
  },
];

export const MathBoard: React.FC<MathBoardProps> = ({
  question,
  wrongChoices,
  shakingChoice,
  solvedAnswer,
  isLocked,
  onSelectAnswer,
  onRepeatQuestion,
  onTapCountingObject,
}) => {
  const [poppedObjectKey, setPoppedObjectKey] = useState<string | null>(null);

  const handleObjectTap = (group: 'left' | 'right', idx: number) => {
    const key = `${group}-${idx}`;
    setPoppedObjectKey(key);
    onTapCountingObject(idx);
    setTimeout(() => {
      setPoppedObjectKey((prev) => (prev === key ? null : prev));
    }, 260);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 gap-5 sm:gap-7">
      {/* Visual Equation Card */}
      <div className="relative w-full bg-white rounded-[2rem] border-4 border-sky-400 shadow-[0_10px_0_#38BDF8] px-4 py-5 sm:px-8 sm:py-7">
        {/* Repeat voiceover speaker button */}
        <button
          type="button"
          onClick={onRepeatQuestion}
          aria-label="Read math question aloud"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-100 hover:bg-sky-200 border-3 border-sky-400 shadow-[0_4px_0_#0284C7] active:translate-y-0.5 active:shadow-[0_1px_0_#0284C7] transition-all cursor-pointer"
        >
          <Volume2 className="w-6 h-6 text-sky-800" strokeWidth={2.8} />
        </button>

        {/* Equation Row with Visual Counting Aids directly underneath each number */}
        <div className="flex items-start justify-center gap-2 sm:gap-6 md:gap-8 pr-6 sm:pr-0">
          {/* LEFT NUMBER + COUNTABLE OBJECTS */}
          <div className="flex flex-col items-center min-w-[96px] sm:min-w-[150px]">
            <span className="font-bubble tabular-nums text-5xl sm:text-7xl font-bold text-slate-800 leading-none">
              {question.left}
            </span>
            <div
              className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-[150px] sm:max-w-[200px]"
              aria-label={`${question.left} items to count`}
            >
              {Array.from({ length: question.left }, (_, idx) => {
                const key = `left-${idx}`;
                const isPopped = poppedObjectKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleObjectTap('left', idx)}
                    aria-label={`Count ${idx + 1}`}
                    className={`p-0.5 rounded-xl transition-transform duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isPopped ? 'scale-125 -translate-y-1.5' : 'hover:scale-110 active:scale-125'
                    }`}
                  >
                    <CountingObjectSvg
                      theme={question.theme}
                      className="w-8 h-8 sm:w-11 sm:h-11 drop-shadow-sm"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* PLUS SIGN */}
          <div className="pt-1 sm:pt-2">
            <span className="font-bubble text-5xl sm:text-6xl font-bold text-emerald-500 select-none">
              +
            </span>
          </div>

          {/* RIGHT NUMBER + COUNTABLE OBJECTS */}
          <div className="flex flex-col items-center min-w-[96px] sm:min-w-[150px]">
            <span className="font-bubble tabular-nums text-5xl sm:text-7xl font-bold text-slate-800 leading-none">
              {question.right}
            </span>
            <div
              className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-[150px] sm:max-w-[200px]"
              aria-label={`${question.right} more items to count`}
            >
              {Array.from({ length: question.right }, (_, idx) => {
                const key = `right-${idx}`;
                const isPopped = poppedObjectKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleObjectTap('right', question.left + idx)}
                    aria-label={`Count ${question.left + idx + 1}`}
                    className={`p-0.5 rounded-xl transition-transform duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isPopped ? 'scale-125 -translate-y-1.5' : 'hover:scale-110 active:scale-125'
                    }`}
                  >
                    <CountingObjectSvg
                      theme={question.theme}
                      className="w-8 h-8 sm:w-11 sm:h-11 drop-shadow-sm"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* EQUALS SIGN */}
          <div className="pt-1 sm:pt-2">
            <span className="font-bubble text-5xl sm:text-6xl font-bold text-sky-500 select-none">
              =
            </span>
          </div>

          {/* ANSWER SLOT */}
          <div className="flex flex-col items-center justify-start pt-0.5">
            <div
              className={`flex items-center justify-center w-16 h-16 sm:w-22 sm:h-22 rounded-3xl border-4 transition-all duration-300 ${
                solvedAnswer !== null
                  ? 'bg-emerald-400 border-emerald-600 scale-110 shadow-[0_6px_0_#059669]'
                  : 'bg-sky-100 border-dashed border-sky-400'
              }`}
            >
              <span
                className={`font-bubble tabular-nums text-4xl sm:text-6xl font-bold ${
                  solvedAnswer !== null ? 'text-white' : 'text-sky-500'
                }`}
              >
                {solvedAnswer !== null ? solvedAnswer : '?'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Huge Colorful Multiple-Choice Buttons */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl">
        {question.choices.map((choice, idx) => {
          const style = CHOICE_STYLES[idx % CHOICE_STYLES.length];
          const isWrong = wrongChoices.includes(choice);
          const isShaking = shakingChoice === choice;
          const isSolved = solvedAnswer === choice;

          return (
            <button
              key={`${question.id}-${choice}`}
              type="button"
              disabled={isLocked || isWrong}
              onClick={() => onSelectAnswer(choice)}
              aria-label={`Answer ${choice}`}
              className={`relative flex items-center justify-center min-h-[88px] sm:min-h-[116px] rounded-[2rem] border-4 transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-800 ${
                isShaking ? 'animate-gentle-wiggle' : ''
              } ${
                isSolved
                  ? 'bg-emerald-400 border-emerald-700 text-white shadow-[0_8px_0_#047857] scale-105'
                  : isWrong
                  ? 'bg-slate-200 border-slate-300 text-slate-400 shadow-[0_3px_0_#CBD5E1] translate-y-1 opacity-65 cursor-not-allowed'
                  : `${style.bg} ${style.border} ${style.shadow} ${style.text} hover:-translate-y-1 active:translate-y-1.5 active:shadow-none cursor-pointer`
              }`}
            >
              <span className="font-bubble tabular-nums text-5xl sm:text-6xl font-bold leading-none">
                {choice}
              </span>
            </button>
          );
        })}
      </div>
    </main>
  );
};
