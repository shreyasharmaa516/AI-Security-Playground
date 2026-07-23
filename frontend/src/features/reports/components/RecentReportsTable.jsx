import { Download, FileText, Loader2, XCircle } from 'lucide-react';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import { formatRelativeTime } from '../../../utils/formatRelativeTime';
import './RecentReportsTable.css';

const STATUS_CONFIG = {
  ready: { variant: 'safe', label: 'Ready' },
  generating: { variant: 'info', label: 'Generating' },
  failed: { variant: 'critical', label: 'Failed' },
};

/**
 * RecentReportsTable
 * Reports-only: reuses the shared Table. Each row's Download action is
 * disabled until the report's status is "ready" — generating/failed
 * reports have nothing to download yet.
 */
export default function RecentReportsTable({ reports, onView, onDownload }) {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (row) => (
        <div className="recent-reports__name-cell">
          <FileText size={14} strokeWidth={1.75} className="recent-reports__file-icon" />
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      key: 'generatedAt',
      header: 'Date Generated',
      render: (row) => (
        <span className="text-body-sm" title={new Date(row.generatedAt).toLocaleString()}>
          {formatRelativeTime(row.generatedAt)}
        </span>
      ),
    },
    { key: 'rangeCovered', header: 'Range Covered', render: (row) => <span className="text-body-sm">{row.rangeCovered}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        const config = STATUS_CONFIG[row.status] ?? STATUS_CONFIG.ready;
        const Icon = row.status === 'generating' ? Loader2 : row.status === 'failed' ? XCircle : null;
        return (
          <Badge variant={config.variant} dot={!Icon}>
            {Icon && <Icon size={11} strokeWidth={2} className={row.status === 'generating' ? 'recent-reports__spin' : ''} />}
            {config.label}
          </Badge>
        );
      },
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (row) => (
        <div className="recent-reports__actions">
          <button
            type="button"
            className="recent-reports__link"
            onClick={() => onView(row)}
            disabled={row.status !== 'ready'}
          >
            View
          </button>
          <button
            type="button"
            className="recent-reports__icon-btn"
            onClick={() => onDownload(row)}
            disabled={row.status !== 'ready'}
            aria-label={`Download ${row.name}`}
          >
            <Download size={15} strokeWidth={1.75} />
          </button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} rows={reports} getRowKey={(row) => row.id} />;
}
