import Drawer from '../../../components/ui/Drawer';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { formatRelativeTime } from '../../../utils/formatRelativeTime';
import './ReportPreviewDrawer.css';

const STATUS_VARIANT = { ready: 'safe', generating: 'info', failed: 'critical' };

/**
 * ReportPreviewDrawer
 * Read-only rendered preview of a report before download, reusing the same
 * Drawer slide-in pattern as History's row detail view.
 */
export default function ReportPreviewDrawer({ report, onClose, onDownload }) {
  if (!report) return null;

  return (
    <Drawer open={Boolean(report)} onClose={onClose} title={report.name}>
      <section className="report-preview__meta">
        <div className="report-preview__meta-item">
          <span className="text-h3-label">Status</span>
          <Badge variant={STATUS_VARIANT[report.status]}>{report.status}</Badge>
        </div>
        <div className="report-preview__meta-item">
          <span className="text-h3-label">Range Covered</span>
          <span className="text-body-sm">{report.rangeCovered}</span>
        </div>
        <div className="report-preview__meta-item">
          <span className="text-h3-label">Generated</span>
          <span className="text-body-sm" title={new Date(report.generatedAt).toLocaleString()}>
            {formatRelativeTime(report.generatedAt)}
          </span>
        </div>
        <div className="report-preview__meta-item">
          <span className="text-h3-label">Format</span>
          <span className="text-mono">{report.format.toUpperCase()}</span>
        </div>
      </section>

      <section className="report-preview__summary">
        <div className="report-preview__summary-row">
          <span className="text-body-sm">Overall Risk Posture</span>
          <span className="text-mono report-preview__summary-value">{report.postureGrade}</span>
        </div>
        <div className="report-preview__summary-row">
          <span className="text-body-sm">Total Incidents</span>
          <span className="text-mono report-preview__summary-value">{report.totalIncidents?.toLocaleString()}</span>
        </div>
        <div className="report-preview__summary-row">
          <span className="text-body-sm">Most Common Threat</span>
          <span className="text-mono report-preview__summary-value">{report.mostCommonThreat}</span>
        </div>
      </section>

      <Button variant="primary" onClick={() => onDownload(report)}>
        Download PDF
      </Button>
    </Drawer>
  );
}
