import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export function useKonamiCode() {
  const [isTriggered, setIsTriggered] = useState(false);
  const sequenceRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() === 'b' ? 'b' : e.key.toLowerCase() === 'a' ? 'a' : e.key;
      
      sequenceRef.current = [...sequenceRef.current, key].slice(-KONAMI_CODE.length);
      
      const matches = sequenceRef.current.every((val, idx) => {
        const expected = KONAMI_CODE[idx];
        return val.toLowerCase() === expected.toLowerCase();
      });

      if (matches && sequenceRef.current.length === KONAMI_CODE.length) {
        triggerCelebration();
        sequenceRef.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  const triggerCelebration = () => {
    setIsTriggered(true);

    // Multi-burst confetti
    try {
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55, colors: ['#10b981', '#34d399', '#059669'] });
      fire(0.2, { spread: 60, colors: ['#6ee7b7', '#a7f3d0', '#047857'] });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#10b981', '#06b6d4', '#3b82f6'] });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#10b981', '#f59e0b'] });
      fire(0.1, { spread: 120, startVelocity: 45, colors: ['#34d399', '#ffffff'] });
    } catch {
      // Graceful fallback
    }
  };

  const resetKonami = () => {
    setIsTriggered(false);
  };

  return { isTriggered, triggerCelebration, resetKonami };
}
