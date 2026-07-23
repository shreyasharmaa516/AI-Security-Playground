import { Search, ChevronDown, Download } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import DropdownMenu from '../../../components/ui/DropdownMenu';
import { DETECTION_CATEGORIES } from '../../../constants/detection';
import { RISK_LEVEL_OPTIONS } from '../api';
import './HistoryToolbar.css';

/**
 * HistoryToolbar
 * History-only: search + filter row + export action. Fully controlled by
 * AnalysisPage's sibling, HistoryPage.
 */
export default function HistoryToolbar({
  search,
  onSearchChange,
  riskLevel,
  onRiskLevelChange,
  detectionTypes,
  onDetectionTypesChange,
  onExport,
}) {
  const riskLabel = RISK_LEVEL_OPTIONS.find((o) => o.value === riskLevel)?.label ?? 'All Levels';

  function toggleDetectionType(id) {
    if (detectionTypes.includes(id)) {
      onDetectionTypesChange(detectionTypes.filter((t) => t !== id));
    } else {
      onDetectionTypesChange([...detectionTypes, id]);
    }
  }

  return (
    <div className="history-toolbar">
      <Input
        icon={Search}
        placeholder="Search prompts, IDs\u2026"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="history-toolbar__search"
      />

      <DropdownMenu
        trigger={(toggle, open) => (
          <button type="button" className={`filter-trigger ${riskLevel !== 'all' ? 'filter-trigger--active' : ''}`} onClick={toggle}>
            Risk Level: {riskLabel}
            <ChevronDown size={13} strokeWidth={1.75} className={open ? 'filter-trigger__chevron--open' : ''} />
          </button>
        )}
      >
        {(close) =>
          RISK_LEVEL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className="dropdown-menu__item"
              onClick={() => {
                onRiskLevelChange(opt.value);
                close();
              }}
            >
              {opt.label}
            </button>
          ))
        }
      </DropdownMenu>

      <DropdownMenu
        trigger={(toggle, open) => (
          <button
            type="button"
            className={`filter-trigger ${detectionTypes.length > 0 ? 'filter-trigger--active' : ''}`}
            onClick={toggle}
          >
            Detection Type{detectionTypes.length > 0 ? `: ${detectionTypes.length}` : ''}
            <ChevronDown size={13} strokeWidth={1.75} className={open ? 'filter-trigger__chevron--open' : ''} />
          </button>
        )}
      >
        {DETECTION_CATEGORIES.map((cat) => (
          <label key={cat.id} className="dropdown-menu__checkbox-row">
            <input
              type="checkbox"
              checked={detectionTypes.includes(cat.id)}
              onChange={() => toggleDetectionType(cat.id)}
            />
            {cat.label}
          </label>
        ))}
      </DropdownMenu>

      <div className="history-toolbar__spacer" />

      <Button variant="secondary" icon={Download} onClick={onExport}>
        Export CSV
      </Button>
    </div>
  );
}
