import './StatCard.css';

const DELTA_DIRECTION_CLASS = {
  up: 'stat-card__delta--up',
  down: 'stat-card__delta--down',
  flat: 'stat-card__delta--flat',
};

/**
 * StatCard
 * A single KPI tile: label, icon, big metric, and an optional delta/context
 * row. `tone` colors the metric itself (only when the number's value is
 * inherently meaningful, e.g. 0 critical threats stays neutral, not red).
 * `chart` accepts a small inline sparkline element (e.g. Chart.js Line).
 */
export default function StatCard({
  label,
  icon: Icon,
  value,
  suffix,
  tone = 'neutral',
  valueSize = 'lg',
  delta,
  deltaDirection = 'flat',
  chart,
  className = '',
}) {
  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-card__top">
        <span className="text-h3-label">{label}</span>
        {Icon && <Icon size={16} strokeWidth={1.75} className="stat-card__icon" />}
      </div>

      <div className="stat-card__value-row">
        <span
          className={`stat-card__value stat-card__value--${tone} ${
            valueSize === 'md' ? 'stat-card__value--md' : 'text-metric'
          }`}
        >
          {value}
        </span>
        {suffix && <span className="stat-card__suffix">{suffix}</span>}
      </div>

      <div className="stat-card__bottom">
        {delta && (
          <span className={`stat-card__delta ${DELTA_DIRECTION_CLASS[deltaDirection]}`}>
            {delta}
          </span>
        )}
        {chart && <div className="stat-card__chart">{chart}</div>}
      </div>
    </div>
  );
}
