// Web Audio API synthesizer for gentle, cheerful toddler-friendly sound effects

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playTapPop(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(420, now);
  osc.frequency.exponentialRampToValueAtTime(620, now + 0.08);

  gain.gain.setValueAtTime(0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

const COUNT_NOTES = [523.25, 587.33, 659.25, 783.99, 880.0]; // C5 D5 E5 G5 A5

export function playCountMarimba(enabled: boolean, index: number) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freq = COUNT_NOTES[index % COUNT_NOTES.length];
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.24);
}

export function playCorrectChime(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

  notes.forEach((freq, idx) => {
    const start = now + idx * 0.08;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(0.001, start);
    gain.gain.linearRampToValueAtTime(0.2, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + 0.4);
  });
}

export function playGentleBoing(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Playful spring boing curve - silly and soft, never harsh
  osc.type = 'sine';
  osc.frequency.setValueAtTime(210, now);
  osc.frequency.exponentialRampToValueAtTime(360, now + 0.11);
  osc.frequency.exponentialRampToValueAtTime(230, now + 0.22);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.32);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.38);
}

export function playVictoryFanfare(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const melody = [
    { freq: 523.25, delay: 0, dur: 0.16 },     // C5
    { freq: 659.25, delay: 0.12, dur: 0.16 },  // E5
    { freq: 783.99, delay: 0.24, dur: 0.16 },  // G5
    { freq: 1046.5, delay: 0.38, dur: 0.35 },  // C6
    { freq: 783.99, delay: 0.58, dur: 0.14 },  // G5
    { freq: 1046.5, delay: 0.74, dur: 0.6 },   // C6!
  ];

  melody.forEach(({ freq, delay, dur }) => {
    const start = now + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(0.001, start);
    gain.gain.linearRampToValueAtTime(0.22, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + dur + 0.04);
  });
}

export function playFriendlyFinish(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 440, delay: 0, dur: 0.18 },
    { freq: 523.25, delay: 0.14, dur: 0.18 },
    { freq: 659.25, delay: 0.28, dur: 0.45 },
  ];

  notes.forEach(({ freq, delay, dur }) => {
    const start = now + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(0.001, start);
    gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + dur + 0.04);
  });
}

// Gentle, looping C-major pentatonic music-box melody for background play
const MELODY_LOOP: (number | null)[] = [
  523.25, 659.25, 783.99, 659.25, // C5 E5 G5 E5
  880.0, 783.99, 659.25, null,    // A5 G5 E5 -
  587.33, 659.25, 783.99, 587.33, // D5 E5 G5 D5
  659.25, 587.33, 523.25, null,   // E5 D5 C5 -
];

const BASS_LOOP: (number | null)[] = [
  261.63, null, null, null, // C4
  174.61, null, null, null, // F3
  196.0, null, null, null,  // G3
  261.63, null, null, null, // C4
];

const STEP_MS = 430;

let musicIntervalId: number | null = null;
let musicStepIndex = 0;
let musicMasterGain: GainNode | null = null;

function ensureMusicGain(ctx: AudioContext): GainNode {
  if (!musicMasterGain || musicMasterGain.context !== ctx) {
    musicMasterGain = ctx.createGain();
    musicMasterGain.gain.setValueAtTime(1, ctx.currentTime);
    musicMasterGain.connect(ctx.destination);
  }
  return musicMasterGain;
}

function scheduleMusicStep() {
  if (typeof document !== 'undefined' && document.hidden) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  const master = ensureMusicGain(ctx);
  const now = ctx.currentTime;
  const idx = musicStepIndex % MELODY_LOOP.length;
  musicStepIndex = (musicStepIndex + 1) % MELODY_LOOP.length;

  const melodyFreq = MELODY_LOOP[idx];
  if (melodyFreq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(melodyFreq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.042, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.44);
  }

  const bassFreq = BASS_LOOP[idx];
  if (bassFreq) {
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(bassFreq, now);

    bassGain.gain.setValueAtTime(0.0001, now);
    bassGain.gain.linearRampToValueAtTime(0.028, now + 0.05);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    bassOsc.connect(bassGain);
    bassGain.connect(master);
    bassOsc.start(now);
    bassOsc.stop(now + 0.95);
  }
}

export function startBackgroundMusic(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const master = ensureMusicGain(ctx);
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setTargetAtTime(1, ctx.currentTime, 0.05);

  if (musicIntervalId === null) {
    scheduleMusicStep();
    musicIntervalId = window.setInterval(scheduleMusicStep, STEP_MS);
  }
}

export function stopBackgroundMusic() {
  if (musicIntervalId !== null) {
    window.clearInterval(musicIntervalId);
    musicIntervalId = null;
  }
  if (audioCtx && musicMasterGain) {
    const now = audioCtx.currentTime;
    musicMasterGain.gain.cancelScheduledValues(now);
    musicMasterGain.gain.setTargetAtTime(0, now, 0.04);
  }
}

export function syncBackgroundMusic(enabled: boolean) {
  if (enabled) {
    startBackgroundMusic(true);
  } else {
    stopBackgroundMusic();
  }
}

