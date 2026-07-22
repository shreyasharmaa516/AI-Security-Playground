import "./History.css";

import { useMemo, useState } from "react";

import { useHistory } from "../../context/HistoryContext";
import { useSearch } from "../../context/SearchContext/SearchContext";

import AnalysisModal from "../../components/AnalysisModal/AnalysisModal";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function History() {
  const { history, loading } = useHistory();

  const { search, setSearch } = useSearch();

  const [severity, setSeverity] = useState("All");

  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch = item.prompt
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSeverity = severity === "All" || item.severity === severity;

      return matchesSearch && matchesSeverity;
    });
  }, [history, search, severity]);

  const exportCSV = () => {
    const headers = [
      "ID",
      "Prompt",
      "Risk Score",
      "Severity",
      "AI Confidence",
      "Analysis Engine",
      "OWASP",
      "Date",
    ];

    const rows = filteredHistory.map((item) => [
      item.id,
      `"${item.prompt.replace(/"/g, '""')}"`,
      item.risk_score,
      item.severity,
      item.ai_confidence != null
        ? `${Math.round(item.ai_confidence * 100)}%`
        : "--",
      item.analysis_engine || "--",
      item.detections?.[0]?.owasp || "--",
      new Date(item.created_at).toLocaleString("en-IN"),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `sentra_history_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <LoadingScreen message="Loading Analysis History..." />;
  }

  return (
    <div className="history-page">
      <div className="history-header">
        <div>
          <h1>Analysis History</h1>

          <p>
            Review previously analyzed prompts and their security assessments.
          </p>
        </div>

        <div className="history-controls">
          <input
            className="history-search"
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="history-filter"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <button className="export-btn" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
      </div>

      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Prompt</th>
              <th>Risk</th>
              <th>Severity</th>
              <th>AI Confidence</th>
              <th>Engine</th>
              <th>OWASP</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan="8">
                  <div className="empty-state">
                    <div className="empty-icon">🛡️</div>

                    <h3>No analyses found</h3>

                    <p>
                      Analyze your first AI prompt to build your security
                      history.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredHistory.map((item) => (
                <tr
                  key={item.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedAnalysis(item)}
                >
                  <td>{item.id}</td>

                  <td>
                    {item.prompt.length > 70
                      ? item.prompt.slice(0, 70) + "..."
                      : item.prompt}
                  </td>

                  <td>{item.risk_score}</td>

                  <td>
                    <span className={`status ${item.severity.toLowerCase()}`}>
                      {item.severity}
                    </span>
                  </td>

                  <td>
                    {item.ai_confidence != null
                      ? `${Math.round(item.ai_confidence * 100)}%`
                      : "--"}
                  </td>

                  <td>{item.analysis_engine || "--"}</td>

                  <td>{item.detections?.[0]?.owasp || "--"}</td>

                  <td>
                    {new Date(item.created_at).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnalysisModal
        open={selectedAnalysis !== null}
        analysis={selectedAnalysis}
        onClose={() => setSelectedAnalysis(null)}
      />
    </div>
  );
}
