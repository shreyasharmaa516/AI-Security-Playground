import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import Button from "./Button";
import "./ResultSummaryBar.css";

const RISK_CONFIG = {
  safe: {
    icon: ShieldCheck,
    className: "result-summary--safe",
    verdict: "Passed — No threats found",
  },

  low: {
    icon: ShieldCheck,
    className: "result-summary--safe",
    verdict: "Passed — No threats found",
  },

  warning: {
    icon: ShieldAlert,
    className: "result-summary--warning",
    verdict: "Review — Potential risk detected",
  },

  medium: {
    icon: ShieldAlert,
    className: "result-summary--warning",
    verdict: "Review — Potential risk detected",
  },

  high: {
    icon: ShieldX,
    className: "result-summary--critical",
    verdict: "Blocked — High Risk Detected",
  },

  critical: {
    icon: ShieldX,
    className: "result-summary--critical",
    verdict: "Blocked — Critical Risk Detected",
  },
};

/**
 * ResultSummaryBar
 * Horizontal verdict strip shown after a scan completes: risk score,
 * verdict text, and result actions. Shared by the Analysis result panel
 * and the History detail drawer, so the "what happened" presentation stays
 * identical wherever a scan result is viewed.
 */
export default function ResultSummaryBar({
  riskScore,
  riskLevel,
  onExport,
  onAddToReport,
  onRerun,
}) {
  const config =
    RISK_CONFIG[(riskLevel || "").toLowerCase()] ?? RISK_CONFIG.safe;
  const Icon = config.icon;

  return (
    <div className={`result-summary ${config.className}`}>
      <div className="result-summary__verdict">
        <Icon size={20} strokeWidth={1.75} className="result-summary__icon" />
        <div className="result-summary__verdict-text">
          <span className="text-metric result-summary__score">{riskScore}</span>
          <span className="text-body-sm result-summary__label">
            {config.verdict}
          </span>
        </div>
      </div>

      <div className="result-summary__actions">
        {onExport && (
          <Button variant="secondary" onClick={onExport}>
            Export Result
          </Button>
        )}
        {onAddToReport && (
          <Button variant="secondary" onClick={onAddToReport}>
            Add to Report
          </Button>
        )}
        {onRerun && (
          <Button variant="primary" onClick={onRerun}>
            Re-run
          </Button>
        )}
      </div>
    </div>
  );
}
