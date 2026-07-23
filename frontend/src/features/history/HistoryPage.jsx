import { useEffect, useMemo, useState } from "react";
import { History as HistoryIcon } from "lucide-react";
import Card from "../../components/ui/Card";
import Pagination from "../../components/ui/Pagination";
import EmptyState from "../../components/ui/EmptyState";
import ErrorBanner from "../../components/ui/ErrorBanner";
import HistoryToolbar from "./components/HistoryToolbar";
import HistoryTable from "./components/HistoryTable";
import HistoryDrawer from "./components/HistoryDrawer";
import { fetchAnalysisHistory } from "./api";
import "./HistoryPage.css";

const PAGE_SIZE = 10;

function downloadJson(record) {
  window.open(`http://localhost:8000/report/${record.id}`, "_blank");
}

function downloadCsv(records) {
  const header = [
    "id",
    "prompt",
    "context",
    "riskScore",
    "riskLevel",
    "analyzedAt",
    "source",
    "model",
  ];

  const rows = records.map((r) =>
    header
      .map((key) => `"${String(r[key] ?? "").replace(/"/g, '""')}"`)
      .join(","),
  );

  const csv = [header.join(","), ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "sentra-history-export.csv";
  link.click();

  URL.revokeObjectURL(url);
}

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [riskLevel, setRiskLevel] = useState("all");
  const [detectionTypes, setDetectionTypes] = useState([]);

  const [sortState, setSortState] = useState({
    sortBy: "analyzedAt",
    sortDir: "desc",
  });

  const [page, setPage] = useState(1);

  const [phase, setPhase] = useState("loading");
  const [allRecords, setAllRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, riskLevel, detectionTypes, sortState]);

  useEffect(() => {
    let cancelled = false;

    setPhase("loading");
    setErrorMessage(null);

    fetchAnalysisHistory()
      .then((res) => {
        if (cancelled) return;

        setAllRecords(res.records);
        setPhase("success");
      })
      .catch((err) => {
        if (cancelled) return;

        setErrorMessage(err.message || "Failed to load history.");
        setPhase("error");
      });

    return () => {
      cancelled = true;
    };
  }, [retryToken]);

  const filteredRecords = useMemo(() => {
    let data = [...allRecords];

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();

      data = data.filter(
        (r) =>
          r.prompt?.toLowerCase().includes(q) ||
          String(r.id).toLowerCase().includes(q),
      );
    }

    if (riskLevel !== "all") {
      data = data.filter((r) => r.riskLevel === riskLevel);
    }

    if (sortState.sortBy === "riskScore") {
      data.sort((a, b) =>
        sortState.sortDir === "asc"
          ? a.riskScore - b.riskScore
          : b.riskScore - a.riskScore,
      );
    } else {
      data.sort((a, b) =>
        sortState.sortDir === "asc"
          ? new Date(a.analyzedAt) - new Date(b.analyzedAt)
          : new Date(b.analyzedAt) - new Date(a.analyzedAt),
      );
    }

    return data;
  }, [allRecords, debouncedSearch, riskLevel, sortState]);

  const records = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRecords.slice(start, start + PAGE_SIZE);
  }, [filteredRecords, page]);

  const total = filteredRecords.length;

  function handleSort(sortKey) {
    setSortState((prev) =>
      prev.sortBy === sortKey
        ? {
            sortBy: sortKey,
            sortDir: prev.sortDir === "asc" ? "desc" : "asc",
          }
        : {
            sortBy: sortKey,
            sortDir: "desc",
          },
    );
  }

  function handleDeleteRow(row) {
    setAllRecords((prev) => prev.filter((r) => r.id !== row.id));
  }

  function handleAddToReport(record) {
    console.log("Add to report:", record);
  }

  const hasActiveFilters =
    debouncedSearch.trim() !== "" ||
    riskLevel !== "all" ||
    detectionTypes.length > 0;

  return (
    <div className="history">
      <HistoryToolbar
        search={search}
        onSearchChange={setSearch}
        riskLevel={riskLevel}
        onRiskLevelChange={setRiskLevel}
        detectionTypes={detectionTypes}
        onDetectionTypesChange={setDetectionTypes}
        onExport={() => downloadCsv(filteredRecords)}
      />

      {phase === "error" && (
        <ErrorBanner
          message={errorMessage}
          onRetry={() => setRetryToken((t) => t + 1)}
        />
      )}

      <Card padded={false} className="history__table-card">
        {phase === "loading" && (
          <div className="history__loading-rows">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="history__skeleton-row" />
            ))}
          </div>
        )}

        {phase === "success" && records.length === 0 && (
          <EmptyState
            icon={HistoryIcon}
            title={
              hasActiveFilters ? "No matching analyses" : "No analyses yet"
            }
            description={
              hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Run your first analysis to start building a history log."
            }
          />
        )}

        {phase === "success" && records.length > 0 && (
          <>
            <HistoryTable
              records={records}
              sortState={sortState}
              onSort={handleSort}
              onRowClick={setSelectedRecord}
              onExportRow={downloadJson}
              onDeleteRow={handleDeleteRow}
            />

            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              total={total}
              onPageChange={setPage}
            />
          </>
        )}
      </Card>

      <HistoryDrawer
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onExport={downloadJson}
        onAddToReport={handleAddToReport}
      />
    </div>
  );
}
