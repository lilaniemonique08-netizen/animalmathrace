import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ANIMALS,
  AnimalProfile,
  CountingItemTheme,
  GamePhase,
  MathQuestion,
  TOTAL_RACE_STEPS,
} from './types/game';
import {
  playCorrectChime,
  playCountMarimba,
  playFriendlyFinish,
  playGentleBoing,
  playTapPop,
  playVictoryFanfare,
  startBackgroundMusic,
  stopBackgroundMusic,
  syncBackgroundMusic,
} from './utils/sound';
import { getRandomPraise, numberToWord, speakWarmly, stopSpeaking } from './utils/speech';
import { CharacterSelect } from './components/CharacterSelect';
import { RaceTrack } from './components/RaceTrack';
import { MathBoard } from './components/MathBoard';
import { VictoryScreen } from './components/VictoryScreen';

const THEMES: CountingItemTheme[] = ['apple', 'star', 'paw', 'strawberry'];

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateQuestion(
  questionId: number,
  prevPair?: { left: number; right: number }
): MathQuestion {
  let left = Math.floor(Math.random() * 5) + 1;
  let right = Math.floor(Math.random() * 5) + 1;

  if (prevPair && prevPair.left === left && prevPair.right === right) {
    left = (left % 5) + 1;
  }

  const answer = left + right;
  const candidateOffsets = shuffleArray([-2, -1, 1, 2, -3, 3]);
  const distractors: number[] = [];

  for (const offset of candidateOffsets) {
    const candidate = answer + offset;
    if (candidate >= 2 && candidate <= 10 && candidate !== answer && !distractors.includes(candidate)) {
      distractors.push(candidate);
      if (distractors.length === 2) break;
    }
  }

  while (distractors.length < 2) {
    const fallback = Math.floor(Math.random() * 9) + 2;
    if (fallback !== answer && !distractors.includes(fallback)) {
      distractors.push(fallback);
    }
  }

  return {
    id: questionId,
    left,
    right,
    answer,
    choices: shuffleArray([answer, distractors[0], distractors[1]]),
    theme: THEMES[questionId % THEMES.length],
  };
}

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('SELECT');
  const [player, setPlayer] = useState<AnimalProfile>(ANIMALS[0]);
  const [opponent, setOpponent] = useState<AnimalProfile>(ANIMALS[1]);

  const [playerStep, setPlayerStep] = useState(0);
  const [opponentStep, setOpponentStep] = useState(0);
  const [playerHopKey, setPlayerHopKey] = useState(0);
  const [opponentHopKey, setOpponentHopKey] = useState(0);
  const [burstKey, setBurstKey] = useState(0);

  const [question, setQuestion] = useState<MathQuestion>(() => generateQuestion(1));
  const [wrongChoices, setWrongChoices] = useState<number[]>([]);
  const [shakingChoice, setShakingChoice] = useState<number | null>(null);
  const [solvedAnswer, setSolvedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const timersRef = useRef<number[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const scheduleTimer = useCallback((fn: () => void, delayMs: number) => {
    const id = window.setTimeout(fn, delayMs);
    timersRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopBackgroundMusic();
      } else if (soundEnabled) {
        startBackgroundMusic(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [soundEnabled]);

  useEffect(() => {
    return () => {
      clearAllTimers();
      stopSpeaking();
      stopBackgroundMusic();
    };
  }, [clearAllTimers]);

  const speakQuestion = useCallback(
    (q: MathQuestion, voiceOn: boolean) => {
      speakWarmly(`What is ${numberToWord(q.left)} plus ${numberToWord(q.right)}?`, voiceOn);
    },
    []
  );

  const handleSelectAnimal = (chosen: AnimalProfile) => {
    clearAllTimers();
    startBackgroundMusic(soundEnabled);
    playTapPop(soundEnabled);

    const others = ANIMALS.filter((a) => a.id !== chosen.id);
    const randomOpponent = others[Math.floor(Math.random() * others.length)];

    const firstQuestion = generateQuestion(1);
    setPlayer(chosen);
    setOpponent(randomOpponent);
    setPlayerStep(0);
    setOpponentStep(0);
    setPlayerHopKey(0);
    setOpponentHopKey(0);
    setBurstKey(0);
    setQuestion(firstQuestion);
    setWrongChoices([]);
    setShakingChoice(null);
    setSolvedAnswer(null);
    setIsLocked(false);
    setPhase('RACING');

    speakWarmly(
      `Go ${chosen.name}! What is ${numberToWord(firstQuestion.left)} plus ${numberToWord(firstQuestion.right)}?`,
      voiceEnabled
    );
  };

  const handleSelectAnswer = (choice: number) => {
    if (isLocked || wrongChoices.includes(choice)) return;

    if (choice === question.answer) {
      setIsLocked(true);
      setSolvedAnswer(choice);

      const nextStep = playerStep + 1;
      setPlayerStep(nextStep);
      setPlayerHopKey((k) => k + 1);
      setBurstKey((k) => k + 1);

      playCorrectChime(soundEnabled);

      if (nextStep >= TOTAL_RACE_STEPS) {
        speakWarmly(`Hooray! Your ${player.name} won the race!`, voiceEnabled);
        scheduleTimer(() => {
          playVictoryFanfare(soundEnabled);
          setPhase('VICTORY');
          setIsLocked(false);
        }, 950);
      } else {
        speakWarmly(getRandomPraise(question.left, question.right, question.answer), voiceEnabled);
        scheduleTimer(() => {
          const nextQ = generateQuestion(question.id + 1, {
            left: question.left,
            right: question.right,
          });
          setQuestion(nextQ);
          setWrongChoices([]);
          setShakingChoice(null);
          setSolvedAnswer(null);
          setIsLocked(false);
          speakQuestion(nextQ, voiceEnabled);
        }, 1250);
      }
    } else {
      playGentleBoing(soundEnabled);
      setShakingChoice(choice);
      setWrongChoices((prev) => [...prev, choice]);

      const nextOpponentStep = opponentStep + 1;
      setOpponentStep(nextOpponentStep);
      setOpponentHopKey((k) => k + 1);

      scheduleTimer(() => {
        setShakingChoice((prev) => (prev === choice ? null : prev));
      }, 460);

      if (nextOpponentStep >= TOTAL_RACE_STEPS) {
        setIsLocked(true);
        speakWarmly(`Ooh, so close! Good try!`, voiceEnabled);
        scheduleTimer(() => {
          playFriendlyFinish(soundEnabled);
          setPhase('VICTORY');
          setIsLocked(false);
        }, 950);
      } else {
        speakWarmly(`Oops! Try another one!`, voiceEnabled);
      }
    }
  };

  const handlePlayAgain = () => {
    clearAllTimers();
    playTapPop(soundEnabled);
    stopSpeaking();
    setPhase('SELECT');
    speakWarmly('Pick your animal friend to race!', voiceEnabled);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    syncBackgroundMusic(next);
    if (next) {
      playTapPop(true);
    }
  };

  const handleToggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    if (!next) {
      stopSpeaking();
    } else {
      playTapPop(soundEnabled);
      if (phase === 'RACING') {
        speakQuestion(question, true);
      }
    }
  };

  if (phase === 'SELECT') {
    return (
      <CharacterSelect
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onSelect={handleSelectAnimal}
        onSpeakPrompt={() => {
          startBackgroundMusic(soundEnabled);
          playTapPop(soundEnabled);
          speakWarmly('Pick your animal friend to race!', true);
        }}
      />
    );
  }

  if (phase === 'VICTORY') {
    return (
      <VictoryScreen
        playerWon={playerStep >= TOTAL_RACE_STEPS}
        player={player}
        opponent={opponent}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-dvh w-full bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-100">
      <RaceTrack
        player={player}
        opponent={opponent}
        playerStep={playerStep}
        opponentStep={opponentStep}
        playerHopKey={playerHopKey}
        opponentHopKey={opponentHopKey}
        burstKey={burstKey}
        soundEnabled={soundEnabled}
        voiceEnabled={voiceEnabled}
        onToggleSound={handleToggleSound}
        onToggleVoice={handleToggleVoice}
        onHome={handlePlayAgain}
      />

      <MathBoard
        question={question}
        wrongChoices={wrongChoices}
        shakingChoice={shakingChoice}
        solvedAnswer={solvedAnswer}
        isLocked={isLocked}
        onSelectAnswer={handleSelectAnswer}
        onRepeatQuestion={() => {
          playTapPop(soundEnabled);
          speakQuestion(question, true);
        }}
        onTapCountingObject={(countIdx) => {
          playCountMarimba(soundEnabled, countIdx);
        }}
      />
    </div>
  );
}
