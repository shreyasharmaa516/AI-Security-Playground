import './CharacterCounter.css';

/**
 * CharacterCounter
 * Shows "current / max", turning amber near the limit and red past it.
 * Reusable anywhere an input has a length constraint (prompt editor now;
 * report titles, webhook payloads, etc. later).
 */
export default function CharacterCounter({ current, max }) {
  const ratio = max > 0 ? current / max : 0;
  const state = ratio > 1 ? 'over' : ratio >= 0.9 ? 'warning' : 'default';

  return (
    <span className={`character-counter character-counter--${state}`}>
      {current.toLocaleString()} / {max.toLocaleString()}
    </span>
  );
}
