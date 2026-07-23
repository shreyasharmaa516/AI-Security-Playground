import './Spinner.css';

/**
 * Spinner
 * Small ring spinner. Used for in-progress button states and any panel
 * that needs an inline "working" indicator. Reserved for these cases only —
 * skeletons are used for larger loading states (see EmptyState/skeleton
 * patterns on data-heavy pages).
 */
export default function Spinner({ size = 14 }) {
  return (
    <span
      className="spinner"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}
