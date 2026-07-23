import './SegmentedControl.css';

/**
 * SegmentedControl
 * A grouped set of mutually exclusive options rendered as a single control.
 * Used for time-range switches (24h / 7d / 30d) — reads as "monitoring tool"
 * rather than a form dropdown.
 */
export default function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="segmented-control" role="tablist">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={opt.value === value}
          className={`segmented-control__item ${
            opt.value === value ? 'segmented-control__item--active' : ''
          }`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
