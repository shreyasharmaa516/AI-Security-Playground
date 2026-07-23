import { useState } from 'react';
import { Circle, CheckCircle2, AlertTriangle, AlertOctagon, ChevronDown, Loader2 } from 'lucide-react';
import './DetectionEnginePanel.css';

const STATUS_CONFIG = {
  idle: { icon: Circle, className: 'engine-row--idle', statusText: 'Ready' },
  scanning: { icon: Loader2, className: 'engine-row--scanning', statusText: 'Scanning\u2026' },
  clear: { icon: CheckCircle2, className: 'engine-row--clear', statusText: 'Clear' },
  'flagged-warning': { icon: AlertTriangle, className: 'engine-row--warning', statusText: 'Flagged' },
  'flagged-critical': { icon: AlertOctagon, className: 'engine-row--critical', statusText: 'Flagged' },
};

/**
 * DetectionEnginePanel
 * Renders each detection category as a checklist row: idle before a scan,
 * a pulsing indicator while that engine is running, then a final clear/
 * flagged state with an expandable details drawer showing confidence and
 * matched-pattern reasoning. Shared by Analysis (live scan) and the History
 * detail drawer (viewing a past result) — status/detail data is passed in,
 * this component owns no scan logic itself.
 */
export default function DetectionEnginePanel({ categories, statuses, details = {} }) {
  const [expandedId, setExpandedId] = useState(null);

  function toggle(id) {
    const status = statuses[id];
    const canExpand = status === 'clear' || status === 'flagged-warning' || status === 'flagged-critical';
    if (!canExpand) return;
    setExpandedId((current) => (current === id ? null : id));
  }

  return (
    <ul className="engine-panel">
      {categories.map((category) => {
        const status = statuses[category.id] ?? 'idle';
        const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.idle;
        const Icon = config.icon;
        const isExpanded = expandedId === category.id;
        const detail = details[category.id];
        const isExpandable = status !== 'idle' && status !== 'scanning';

        return (
          <li key={category.id} className={`engine-row ${config.className}`}>
            <button
              type="button"
              className="engine-row__header"
              onClick={() => toggle(category.id)}
              disabled={!isExpandable}
            >
              <Icon
                size={16}
                strokeWidth={1.75}
                className={`engine-row__icon ${status === 'scanning' ? 'engine-row__icon--spin' : ''}`}
              />
              <span className="text-body-sm engine-row__label">{category.label}</span>
              <span className="engine-row__status">
                {detail?.confidence != null && isExpandable ? `${detail.confidence}%` : config.statusText}
              </span>
              {isExpandable && (
                <ChevronDown
                  size={14}
                  strokeWidth={1.75}
                  className={`engine-row__chevron ${isExpanded ? 'engine-row__chevron--open' : ''}`}
                />
              )}
            </button>

            {isExpanded && detail && (
              <div className="engine-row__details">
                <span className="text-caption engine-row__details-label">Reasoning</span>
                <p className="text-mono engine-row__details-text">{detail.reasoning}</p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
