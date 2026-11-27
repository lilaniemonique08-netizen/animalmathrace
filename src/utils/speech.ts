// Warm Web Speech API voiceover helper for toddler-friendly prompts

const NUMBER_WORDS: Record<number, string> = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
};

export function numberToWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

function getPreferredVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const english = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
  if (!english.length) return voices[0];

  const preferredNames = ['samantha', 'karen', 'victoria', 'google us english', 'aria', 'jenny', 'zira'];
  for (const name of preferredNames) {
    const match = english.find((v) => v.name.toLowerCase().includes(name));
    if (match) return match;
  }

  return english.find((v) => v.localService) ?? english[0];
}

export function speakWarmly(text: string, enabled: boolean) {
  if (!enabled) return;
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getPreferredVoice();
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = 0.9;
    utterance.pitch = 1.12;
    utterance.volume = 0.95;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Gracefully ignore if browser speech synthesis is blocked
  }
}

export function stopSpeaking() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    // Ignore
  }
}

export function getRandomPraise(left: number, right: number, answer: number): string {
  const phrases = [
    `Great job! ${numberToWord(left)} plus ${numberToWord(right)} is ${numberToWord(answer)}!`,
    `Yay! You got ${numberToWord(answer)}!`,
    `Awesome! ${numberToWord(answer)} is right!`,
    `Super star! Keep going!`,
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}
