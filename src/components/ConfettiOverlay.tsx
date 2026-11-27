import React from 'react';

interface ConfettiOverlayProps {
  active: boolean;
}

const CONFETTI_PIECES = Array.from({ length: 42 }, (_, idx) => {
  const colors = ['#FACC15', '#FB7185', '#38BDF8', '#4ADE80', '#A78BFA', '#FB923C'];
  return {
    id: idx,
    left: `${(idx * 2.4 + (idx % 3) * 1.7) % 98}%`,
    color: colors[idx % colors.length],
    delay: `${(idx % 12) * 0.22}s`,
    duration: `${2.8 + (idx % 5) * 0.45}s`,
    size: idx % 2 === 0 ? 'w-3.5 h-3.5 rounded-sm' : 'w-3 h-5 rounded-full',
  };
});

export const ConfettiOverlay: React.FC<ConfettiOverlayProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {CONFETTI_PIECES.map((piece) => (
        <span
          key={piece.id}
          className={`absolute -top-6 animate-confetti-fall ${piece.size}`}
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
          }}
        />
      ))}
    </div>
  );
};
