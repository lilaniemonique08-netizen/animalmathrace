import React from 'react';
import { Home, Volume2, VolumeX, MessageCircle, MessageCircleOff, Star, Flag } from 'lucide-react';
import { AnimalProfile, TOTAL_RACE_STEPS } from '../types/game';
import { AnimalIllustration } from './AnimalArt';

interface RaceTrackProps {
  player: AnimalProfile;
  opponent: AnimalProfile;
  playerStep: number;
  opponentStep: number;
  playerHopKey: number;
  opponentHopKey: number;
  burstKey: number;
  soundEnabled: boolean;
  voiceEnabled: boolean;
  onToggleSound: () => void;
  onToggleVoice: () => void;
  onHome: () => void;
}

const BURST_PARTICLES = [
  { tx: '-38px', ty: '-34px', color: '#FACC15' },
  { tx: '38px', ty: '-36px', color: '#FB7185' },
  { tx: '-44px', ty: '16px', color: '#38BDF8' },
  { tx: '46px', ty: '14px', color: '#A78BFA' },
  { tx: '0px', ty: '-48px', color: '#4ADE80' },
  { tx: '22px', ty: '-42px', color: '#FB923C' },
];

export const RaceTrack: React.FC<RaceTrackProps> = ({
  player,
  opponent,
  playerStep,
  opponentStep,
  playerHopKey,
  opponentHopKey,
  burstKey,
  soundEnabled,
  voiceEnabled,
  onToggleSound,
  onToggleVoice,
  onHome,
}) => {
  const playerPct = (Math.min(playerStep, TOTAL_RACE_STEPS) / TOTAL_RACE_STEPS) * 100;
  const opponentPct = (Math.min(opponentStep, TOTAL_RACE_STEPS) / TOTAL_RACE_STEPS) * 100;

  return (
    <section aria-label="Race Track" className="w-full shrink-0">
      {/* Sunny Sky Top Strip with Simple Icon Controls */}
      <div className="relative flex items-center justify-between px-4 sm:px-6 py-2.5 bg-gradient-to-b from-sky-300 to-sky-200 overflow-hidden">
        {/* Sun + Clouds */}
        <div className="flex items-center gap-3 z-10">
          <button
            type="button"
            onClick={onHome}
            aria-label="Choose a different animal"
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white hover:bg-sky-50 border-4 border-sky-500 shadow-[0_4px_0_#0284C7] active:translate-y-0.5 active:shadow-[0_1px_0_#0284C7] transition-all cursor-pointer"
          >
            <Home className="w-6 h-6 text-sky-700" strokeWidth={2.8} />
          </button>

          {/* Visual step stars (no reading needed) */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-2xl border-2 border-sky-300">
            {Array.from({ length: TOTAL_RACE_STEPS }, (_, idx) => {
              const filled = idx < playerStep;
              return (
                <Star
                  key={`hud-star-${idx}`}
                  className={`w-6 h-6 transition-transform duration-300 ${
                    filled ? 'text-amber-400 fill-amber-400 scale-110' : 'text-sky-200 fill-sky-100'
                  }`}
                  strokeWidth={2.5}
                />
              );
            })}
          </div>
        </div>

        {/* Decorative drifting cloud */}
        <div className="pointer-events-none hidden md:flex items-end opacity-85 animate-cloud-drift" aria-hidden="true">
          <div className="w-10 h-7 bg-white rounded-full -mr-3" />
          <div className="w-16 h-10 bg-white rounded-full -mr-3" />
          <div className="w-10 h-6 bg-white rounded-full" />
        </div>

        {/* Sound & Voice Toggles */}
        <div className="flex items-center gap-2.5 z-10">
          <button
            type="button"
            onClick={onToggleVoice}
            aria-label={voiceEnabled ? 'Mute voiceover' : 'Turn on voiceover'}
            title={voiceEnabled ? 'Voice On' : 'Voice Off'}
            className={`flex items-center justify-center w-12 h-12 rounded-2xl border-4 transition-all cursor-pointer active:translate-y-0.5 ${
              voiceEnabled
                ? 'bg-emerald-200 border-emerald-500 shadow-[0_4px_0_#059669]'
                : 'bg-slate-200 border-slate-400 shadow-[0_4px_0_#64748B]'
            }`}
          >
            {voiceEnabled ? (
              <MessageCircle className="w-6 h-6 text-emerald-900" strokeWidth={2.6} />
            ) : (
              <MessageCircleOff className="w-6 h-6 text-slate-600" strokeWidth={2.6} />
            )}
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Turn on sound effects'}
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
      </div>

      {/* Vibrant Grassy 2-Lane Race Track */}
      <div className="relative w-full bg-green-500 border-y-4 border-green-700 overflow-hidden shadow-inner">
        {/* Alternating mowed grass stripes */}
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #4ADE80 0px, #4ADE80 48px, #22C55E 48px, #22C55E 96px)',
          }}
          aria-hidden="true"
        />

        {/* Checkered Finish Line on the right */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 right-5 sm:right-10 w-7 sm:w-9 z-10 border-x-2 border-slate-900/60"
          style={{
            backgroundImage:
              'conic-gradient(#1E293B 90deg, #FFFFFF 90deg 180deg, #1E293B 180deg 270deg, #FFFFFF 270deg)',
            backgroundSize: '16px 16px',
          }}
          aria-hidden="true"
        >
          <div className="absolute -top-0.5 -right-2 bg-rose-500 text-white p-1 rounded-full border-2 border-white shadow">
            <Flag className="w-3.5 h-3.5 fill-white" />
          </div>
        </div>

        {/* Track Lanes Container */}
        <div className="relative z-20 flex flex-col divide-y-4 divide-dashed divide-white/75">
          {/* TOP LANE: PLAYER */}
          <div className="relative h-24 sm:h-28 md:h-32 flex items-center pl-10 pr-16 sm:pl-14 sm:pr-24">
            <div className="relative w-full h-full flex items-center">
              {/* Stepping dots 0..6 */}
              <div className="w-full flex justify-between items-center pointer-events-none">
                {Array.from({ length: TOTAL_RACE_STEPS + 1 }, (_, stepIdx) => (
                  <div
                    key={`player-dot-${stepIdx}`}
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-colors ${
                      stepIdx <= playerStep
                        ? 'bg-yellow-300 border-amber-600 scale-110'
                        : 'bg-white/45 border-white/70'
                    }`}
                  />
                ))}
              </div>

              {/* Moving Player Animal */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 transition-[left] duration-500 ease-out"
                style={{ left: `${playerPct}%` }}
              >
                {/* Star/Confetti Burst around Player on Correct Answer */}
                {burstKey > 0 && (
                  <div
                    key={`burst-${burstKey}`}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    {BURST_PARTICLES.map((p, i) => (
                      <span
                        key={`burst-star-${i}`}
                        className="absolute animate-star-pop"
                        style={
                          {
                            '--tx': p.tx,
                            '--ty': p.ty,
                          } as React.CSSProperties
                        }
                      >
                        <Star className="w-6 h-6 drop-shadow" style={{ color: p.color, fill: p.color }} />
                      </span>
                    ))}
                  </div>
                )}

                <div
                  key={`player-hop-${playerHopKey}`}
                  className={`relative flex flex-col items-center ${
                    playerHopKey > 0 ? 'animate-animal-hop' : 'animate-animal-idle'
                  }`}
                >
                  {/* Gold star marker showing THIS is your racer */}
                  <span className="-mb-2 px-2 py-0.5 rounded-full bg-yellow-300 border-2 border-amber-600 shadow-sm flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-800 fill-amber-600" />
                  </span>
                  <AnimalIllustration
                    id={player.id}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-[0_4px_2px_rgba(0,0,0,0.22)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM LANE: OPPONENT */}
          <div className="relative h-24 sm:h-28 md:h-32 flex items-center pl-10 pr-16 sm:pl-14 sm:pr-24 bg-green-600/20">
            <div className="relative w-full h-full flex items-center">
              {/* Stepping dots 0..6 */}
              <div className="w-full flex justify-between items-center pointer-events-none">
                {Array.from({ length: TOTAL_RACE_STEPS + 1 }, (_, stepIdx) => (
                  <div
                    key={`opponent-dot-${stepIdx}`}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-colors ${
                      stepIdx <= opponentStep
                        ? 'bg-rose-300 border-rose-600'
                        : 'bg-white/35 border-white/60'
                    }`}
                  />
                ))}
              </div>

              {/* Moving Opponent Animal */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 transition-[left] duration-500 ease-out"
                style={{ left: `${opponentPct}%` }}
              >
                <div
                  key={`opponent-hop-${opponentHopKey}`}
                  className={opponentHopKey > 0 ? 'animate-animal-hop' : 'animate-animal-idle'}
                >
                  <AnimalIllustration
                    id={opponent.id}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-[0_4px_2px_rgba(0,0,0,0.22)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
