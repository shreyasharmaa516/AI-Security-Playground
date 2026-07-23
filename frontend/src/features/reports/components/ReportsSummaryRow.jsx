import { Gauge, AlertTriangle, Target } from 'lucide-react';
import StatCard from '../../../components/ui/StatCard';
import './ReportsSummaryRow.css';

const GRADE_TONE = {
  A: 'safe',
  'B+': 'safe',
  B: 'warning',
  C: 'warning',
  D: 'critical',
};

/**
 * ReportsSummaryRow
 * Reports-only: 3 headline cards built on the shared StatCard, same
 * component the Dashboard KPI row uses.
 */
export default function ReportsSummaryRow({ overview }) {
  return (
    <div className="reports-summary-row">
      <StatCard
        label="Overall Risk Posture"
        icon={Gauge}
        value={overview.postureGrade}
        tone={GRADE_TONE[overview.postureGrade] ?? 'neutral'}
      />
      <StatCard
        label="Total Incidents"
        icon={AlertTriangle}
        value={overview.totalIncidents.toLocaleString()}
        tone="neutral"
      />
      <StatCard
        label="Most Common Threat"
        icon={Target}
        value={overview.mostCommonThreat}
        tone="neutral"
        className="reports-summary-row__text-card"
      />
    </div>
  );
}
