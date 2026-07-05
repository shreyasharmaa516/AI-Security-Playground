import "./History.css";

import { useMemo, useState } from "react";

import { useHistory } from "../../context/HistoryContext";
import { useSearch } from "../../context/SearchContext/SearchContext";

import AnalysisModal from "../../components/AnalysisModal/AnalysisModal";

export default function History() {

  const { history } = useHistory();

  const { search, setSearch } = useSearch();

  const [severity, setSeverity] = useState("All");

  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const filteredHistory = useMemo(() => {

    return history.filter((item) => {

      const matchesSearch =
        item.prompt.toLowerCase().includes(search.toLowerCase());

      const matchesSeverity =
        severity === "All" ||
        item.severity === severity;

      return matchesSearch && matchesSeverity;

    });

  }, [history, search, severity]);

  return (
    <div className="history-page">

      <div className="history-header">

        <div>

          <h1>Analysis History</h1>

          <p>All prompt analyses stored in SentinelAI</p>

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
            <option>High</option>
            <option>Critical</option>

          </select>

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
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            {filteredHistory.map((item) => (

              <tr
                key={item.id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedAnalysis(item)}
              >

                <td>{item.id}</td>

                <td>{item.prompt}</td>

                <td>{item.risk_score}</td>

                <td>

                  <span
                    className={`status ${item.severity.toLowerCase()}`}
                  >
                    {item.severity}
                  </span>

                </td>

                <td>

                  {new Date(item.created_at).toLocaleString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}

                </td>

              </tr>

            ))}

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