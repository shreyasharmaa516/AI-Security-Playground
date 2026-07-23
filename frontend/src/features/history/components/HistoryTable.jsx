import { MoreHorizontal, Eye, Download, Trash2 } from "lucide-react";
import Table from "../../../components/ui/Table";
import Badge from "../../../components/ui/Badge";
import DropdownMenu from "../../../components/ui/DropdownMenu";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";
import "./HistoryTable.css";

const RISK_VARIANT = {
  safe: "safe",
  low: "safe",
  medium: "warning",
  warning: "warning",
  high: "critical",
  critical: "critical",
};

function flaggedLabels(record) {
  if (!Array.isArray(record.detections)) return [];

  return record.detections.map(
    (d) => d.name || d.type || d.category || String(d),
  );
}

export default function HistoryTable({
  records,
  sortState,
  onSort,
  onRowClick,
  onExportRow,
  onDeleteRow,
}) {
  const columns = [
    {
      key: "status",
      header: "",
      align: "center",
      render: (row) => (
        <span
          className={`history-table__status-dot history-table__status-dot--${row.riskLevel}`}
        />
      ),
    },
    {
      key: "prompt",
      header: "Prompt Preview",
      render: (row) => (
        <span className="text-mono history-table__prompt">{row.prompt}</span>
      ),
    },
    {
      key: "riskScore",
      header: "Risk Score",
      align: "center",
      sortKey: "riskScore",
      render: (row) => (
        <Badge variant={RISK_VARIANT[row.riskLevel] || "safe"}>
          {row.riskScore}
        </Badge>
      ),
    },
    {
      key: "detections",
      header: "Detections",
      render: (row) => {
        const labels = flaggedLabels(row);

        if (labels.length === 0) {
          return <span className="text-body-sm history-table__none">None</span>;
        }

        const visible = labels.slice(0, 2);
        const overflow = labels.length - visible.length;

        return (
          <div className="history-table__chips">
            {visible.map((label, index) => (
              <span key={`${label}-${index}`} className="history-table__chip">
                {label}
              </span>
            ))}

            {overflow > 0 && (
              <span className="history-table__chip history-table__chip--overflow">
                +{overflow}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "analyzedAt",
      header: "Timestamp",
      align: "right",
      sortKey: "analyzedAt",
      render: (row) => (
        <span
          className="text-body-sm"
          title={new Date(row.analyzedAt).toLocaleString()}
        >
          {formatRelativeTime(row.analyzedAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "center",
      render: (row) => (
        <DropdownMenu
          align="right"
          trigger={(toggle) => (
            <button
              type="button"
              className="history-table__kebab"
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
              aria-label="Row actions"
            >
              <MoreHorizontal size={15} strokeWidth={1.75} />
            </button>
          )}
        >
          {(close) => (
            <div onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="dropdown-menu__item"
                onClick={() => {
                  onRowClick(row);
                  close();
                }}
              >
                <Eye size={14} strokeWidth={1.75} />
                View
              </button>

              <button
                type="button"
                className="dropdown-menu__item"
                onClick={() => {
                  onExportRow(row);
                  close();
                }}
              >
                <Download size={14} strokeWidth={1.75} />
                Export PDF
              </button>

              <div className="dropdown-menu__divider" />

              <button
                type="button"
                className="dropdown-menu__item dropdown-menu__item--danger"
                onClick={() => {
                  onDeleteRow(row);
                  close();
                }}
              >
                <Trash2 size={14} strokeWidth={1.75} />
                Delete
              </button>
            </div>
          )}
        </DropdownMenu>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={records}
      getRowKey={(row) => row.id}
      onRowClick={onRowClick}
      sortState={sortState}
      onSort={onSort}
    />
  );
}
