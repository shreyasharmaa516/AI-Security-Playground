import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';

function riskVariant(score) {
  if (score >= 70) return 'critical';
  if (score >= 35) return 'warning';
  return 'safe';
}

const columns = [
  { key: 'source', header: 'Source', render: (row) => <span className="text-mono">{row.source}</span> },
  { key: 'count', header: 'Analyses', align: 'right', render: (row) => row.count.toLocaleString() },
  {
    key: 'avgRiskScore',
    header: 'Avg Risk Score',
    align: 'right',
    render: (row) => <Badge variant={riskVariant(row.avgRiskScore)}>{row.avgRiskScore}</Badge>,
  },
];

/**
 * TopRiskSourcesTable
 * Reports-only: thin wrapper around the shared Table, same pattern used by
 * Dashboard's RecentAnalysesTable and History's HistoryTable.
 */
export default function TopRiskSourcesTable({ sources }) {
  return <Table columns={columns} rows={sources} getRowKey={(row) => row.source} />;
}
