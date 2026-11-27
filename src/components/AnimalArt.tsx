import React from 'react';
import { AnimalId, CountingItemTheme } from '../types/game';

interface AnimalSvgProps {
  id: AnimalId;
  className?: string;
}

export const AnimalIllustration: React.FC<AnimalSvgProps> = ({ id, className = 'w-24 h-24' }) => {
  switch (id) {
    case 'dog':
      return (
        <svg viewBox="0 0 120 110" className={className} aria-label="Puppy">
          {/* Wagging tail */}
          <path
            d="M18 68 Q6 50 16 38"
            fill="none"
            stroke="#D97706"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Back body */}
          <ellipse cx="48" cy="74" rx="28" ry="20" fill="#FBBF24" stroke="#78350F" strokeWidth="4" />
          {/* Little legs */}
          <rect x="28" y="82" width="12" height="18" rx="6" fill="#F59E0B" stroke="#78350F" strokeWidth="3.5" />
          <rect x="54" y="82" width="12" height="18" rx="6" fill="#FBBF24" stroke="#78350F" strokeWidth="3.5" />
          {/* Red racing collar */}
          <path d="M56 58 Q70 65 78 55" fill="none" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
          <circle cx="75" cy="64" r="5" fill="#FDE047" stroke="#78350F" strokeWidth="2.5" />
          {/* Head */}
          <circle cx="78" cy="44" r="24" fill="#FCD34D" stroke="#78350F" strokeWidth="4" />
          {/* Floppy ear */}
          <ellipse cx="58" cy="46" rx="10" ry="17" transform="rotate(14 58 46)" fill="#B45309" stroke="#78350F" strokeWidth="3.5" />
          {/* Snout */}
          <ellipse cx="94" cy="49" rx="12" ry="9" fill="#FEF3C7" stroke="#78350F" strokeWidth="3" />
          {/* Nose */}
          <ellipse cx="101" cy="45" rx="5.5" ry="4" fill="#451A03" />
          {/* Happy eye */}
          <circle cx="83" cy="37" r="4.5" fill="#1E293B" />
          <circle cx="84.5" cy="35.5" r="1.6" fill="#FFFFFF" />
          {/* Rosy cheek */}
          <circle cx="76" cy="48" r="4.5" fill="#FDA4AF" opacity="0.8" />
          {/* Smile */}
          <path d="M90 53 Q95 57 99 52" fill="none" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'cat':
      return (
        <svg viewBox="0 0 120 110" className={className} aria-label="Kitty">
          {/* Curled tail */}
          <path
            d="M20 75 Q4 62 12 42 Q18 32 26 38"
            fill="none"
            stroke="#FB7185"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Body */}
          <ellipse cx="48" cy="74" rx="26" ry="20" fill="#FDA4AF" stroke="#881337" strokeWidth="4" />
          {/* Belly patch */}
          <ellipse cx="52" cy="77" rx="14" ry="12" fill="#FFF1F2" />
          {/* Paws */}
          <rect x="28" y="83" width="12" height="16" rx="6" fill="#FB7185" stroke="#881337" strokeWidth="3.5" />
          <rect x="54" y="83" width="12" height="16" rx="6" fill="#FDA4AF" stroke="#881337" strokeWidth="3.5" />
          {/* Ears */}
          <polygon points="56,30 62,10 76,24" fill="#FDA4AF" stroke="#881337" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="82,22 95,8 100,29" fill="#FDA4AF" stroke="#881337" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="61,27 64,16 72,24" fill="#FFE4E6" />
          <polygon points="85,22 93,14 96,26" fill="#FFE4E6" />
          {/* Head */}
          <circle cx="79" cy="44" r="23" fill="#FECDD3" stroke="#881337" strokeWidth="4" />
          {/* Eyes */}
          <circle cx="74" cy="40" r="4.2" fill="#1E293B" />
          <circle cx="91" cy="40" r="4.2" fill="#1E293B" />
          <circle cx="75.5" cy="38.5" r="1.5" fill="#FFFFFF" />
          <circle cx="92.5" cy="38.5" r="1.5" fill="#FFFFFF" />
          {/* Pink nose */}
          <polygon points="81,46 87,46 84,50" fill="#E11D48" />
          {/* Smile */}
          <path d="M77 52 Q81 55 84 51 Q87 55 91 52" fill="none" stroke="#881337" strokeWidth="2.8" strokeLinecap="round" />
          {/* Whiskers */}
          <line x1="56" y1="45" x2="67" y2="47" stroke="#881337" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="56" y1="51" x2="67" y2="51" stroke="#881337" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="97" y1="47" x2="108" y2="45" stroke="#881337" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="97" y1="51" x2="108" y2="51" stroke="#881337" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );

    case 'turtle':
      return (
        <svg viewBox="0 0 120 110" className={className} aria-label="Turtle">
          {/* Little legs */}
          <rect x="24" y="78" width="14" height="19" rx="7" fill="#4ADE80" stroke="#065F46" strokeWidth="3.5" />
          <rect x="58" y="78" width="14" height="19" rx="7" fill="#4ADE80" stroke="#065F46" strokeWidth="3.5" />
          {/* Little tail */}
          <polygon points="16,74 6,68 18,64" fill="#4ADE80" stroke="#065F46" strokeWidth="3" strokeLinejoin="round" />
          {/* Neck & Head */}
          <path d="M68 65 Q86 58 88 46" fill="none" stroke="#4ADE80" strokeWidth="16" strokeLinecap="round" />
          <circle cx="91" cy="44" r="18" fill="#86EFAC" stroke="#065F46" strokeWidth="4" />
          {/* Big bright shell */}
          <path d="M16 74 C16 40, 74 40, 74 74 Z" fill="#10B981" stroke="#065F46" strokeWidth="4" strokeLinejoin="round" />
          {/* Shell rim */}
          <rect x="13" y="70" width="64" height="11" rx="5.5" fill="#FDE047" stroke="#065F46" strokeWidth="3.5" />
          {/* Shell spots */}
          <circle cx="34" cy="57" r="6" fill="#A7F3D0" stroke="#065F46" strokeWidth="2.5" />
          <circle cx="52" cy="55" r="7" fill="#A7F3D0" stroke="#065F46" strokeWidth="2.5" />
          {/* Eye */}
          <circle cx="96" cy="39" r="4.2" fill="#1E293B" />
          <circle cx="97.5" cy="37.5" r="1.5" fill="#FFFFFF" />
          {/* Rosy cheek */}
          <circle cx="89" cy="49" r="4" fill="#FDA4AF" opacity="0.85" />
          {/* Happy smile */}
          <path d="M93 52 Q100 56 105 50" fill="none" stroke="#065F46" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'cheetah':
      return (
        <svg viewBox="0 0 120 110" className={className} aria-label="Cheetah">
          {/* Speedy tail */}
          <path
            d="M18 70 Q4 52 16 36"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="16" cy="36" r="4" fill="#451A03" />
          {/* Sleek body */}
          <ellipse cx="48" cy="73" rx="28" ry="18" fill="#FACC15" stroke="#713F12" strokeWidth="4" />
          {/* Cheetah spots on body */}
          <circle cx="38" cy="68" r="3.5" fill="#713F12" />
          <circle cx="50" cy="65" r="3" fill="#713F12" />
          <circle cx="44" cy="77" r="3.2" fill="#713F12" />
          {/* Running legs */}
          <rect x="26" y="81" width="11" height="19" rx="5.5" fill="#EAB308" stroke="#713F12" strokeWidth="3.5" />
          <rect x="57" y="81" width="11" height="19" rx="5.5" fill="#FACC15" stroke="#713F12" strokeWidth="3.5" />
          {/* Rounded ears */}
          <circle cx="62" cy="24" r="8" fill="#FACC15" stroke="#713F12" strokeWidth="3.5" />
          <circle cx="92" cy="22" r="8" fill="#FACC15" stroke="#713F12" strokeWidth="3.5" />
          {/* Head */}
          <circle cx="79" cy="43" r="23" fill="#FDE047" stroke="#713F12" strokeWidth="4" />
          {/* Racing headband */}
          <path d="M58 34 Q79 27 100 34" fill="none" stroke="#3B82F6" strokeWidth="7" strokeLinecap="round" />
          {/* Muzzle */}
          <ellipse cx="89" cy="50" rx="11" ry="8" fill="#FEF9C3" stroke="#713F12" strokeWidth="2.8" />
          {/* Nose */}
          <polygon points="88,45 95,45 91.5,49" fill="#451A03" />
          {/* Eyes */}
          <circle cx="80" cy="40" r="4" fill="#1E293B" />
          <circle cx="94" cy="40" r="4" fill="#1E293B" />
          <circle cx="81.2" cy="38.5" r="1.4" fill="#FFFFFF" />
          <circle cx="95.2" cy="38.5" r="1.4" fill="#FFFFFF" />
          {/* Cheetah tear marks */}
          <path d="M77 44 Q74 49 74 52" fill="none" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
          {/* Grin */}
          <path d="M84 53 Q90 57 96 52" fill="none" stroke="#713F12" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );
  }
};

interface CountingObjectProps {
  theme: CountingItemTheme;
  className?: string;
}

export const CountingObjectSvg: React.FC<CountingObjectProps> = ({ theme, className = 'w-10 h-10 md:w-12 md:h-12' }) => {
  switch (theme) {
    case 'apple':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path d="M32 14 Q34 6 42 6" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="40" cy="11" rx="7" ry="4" transform="rotate(-25 40 11)" fill="#22C55E" stroke="#14532D" strokeWidth="2.5" />
          <path
            d="M32 18 C20 14, 10 24, 12 38 C14 52, 24 58, 32 55 C40 58, 50 52, 52 38 C54 24, 44 14, 32 18 Z"
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="3.5"
          />
          <ellipse cx="22" cy="29" rx="3.5" ry="6" transform="rotate(-20 22 29)" fill="#FCA5A5" opacity="0.75" />
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <polygon
            points="32,6 39,22 57,24 44,36 47,54 32,45 17,54 20,36 7,24 25,22"
            fill="#FACC15"
            stroke="#B45309"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="27" cy="29" r="2.3" fill="#78350F" />
          <circle cx="37" cy="29" r="2.3" fill="#78350F" />
          <path d="M28 35 Q32 39 36 35" fill="none" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );

    case 'paw':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <ellipse cx="16" cy="24" rx="5.5" ry="7.5" transform="rotate(-15 16 24)" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="3" />
          <ellipse cx="27" cy="15" rx="5.5" ry="7.5" transform="rotate(-5 27 15)" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="3" />
          <ellipse cx="39" cy="15" rx="5.5" ry="7.5" transform="rotate(5 39 15)" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="3" />
          <ellipse cx="49" cy="24" rx="5.5" ry="7.5" transform="rotate(15 49 24)" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="3" />
          <path
            d="M20 40 C20 31, 44 31, 44 40 C48 49, 41 55, 32 53 C23 55, 16 49, 20 40 Z"
            fill="#A78BFA"
            stroke="#4C1D95"
            strokeWidth="3.2"
          />
        </svg>
      );

    case 'strawberry':
      return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
          <path
            d="M16 24 C16 16, 48 16, 48 24 C50 38, 39 56, 32 56 C25 56, 14 38, 16 24 Z"
            fill="#FB7185"
            stroke="#9F1239"
            strokeWidth="3.5"
          />
          <path d="M22 18 L32 10 L42 18 L36 22 L28 22 Z" fill="#22C55E" stroke="#14532D" strokeWidth="2.8" strokeLinejoin="round" />
          <circle cx="26" cy="31" r="2" fill="#FEF08A" />
          <circle cx="38" cy="31" r="2" fill="#FEF08A" />
          <circle cx="32" cy="39" r="2" fill="#FEF08A" />
          <circle cx="26" cy="45" r="2" fill="#FEF08A" />
          <circle cx="37" cy="45" r="2" fill="#FEF08A" />
        </svg>
      );
  }
};

export const TrophyIllustration: React.FC<{ className?: string }> = ({ className = 'w-32 h-32' }) => (
  <svg viewBox="0 0 120 120" className={className} aria-label="Golden Trophy">
    {/* Handles */}
    <path d="M30 28 C12 28, 12 56, 32 56" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
    <path d="M90 28 C108 28, 108 56, 88 56" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
    {/* Cup */}
    <path
      d="M28 22 H92 V48 C92 70, 76 82, 60 82 C44 82, 28 70, 28 48 Z"
      fill="#FACC15"
      stroke="#B45309"
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
    {/* Shine */}
    <path d="M38 30 V48 C38 58, 43 65, 48 69" fill="none" stroke="#FEF9C3" strokeWidth="5" strokeLinecap="round" />
    {/* Star in center */}
    <polygon
      points="60,34 64,44 75,45 67,52 69,63 60,57 51,63 53,52 45,45 56,44"
      fill="#FFFBEB"
      stroke="#B45309"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Stem & Base */}
    <rect x="52" y="82" width="16" height="14" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
    <rect x="34" y="96" width="52" height="14" rx="6" fill="#D97706" stroke="#78350F" strokeWidth="4" />
  </svg>
);
