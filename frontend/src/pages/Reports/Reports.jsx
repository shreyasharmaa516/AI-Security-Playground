import "./Reports.css";

import { useMemo } from "react";

import { useDashboard } from "../../context/DashboardContext";
import { useHistory } from "../../context/HistoryContext";

export default function Reports() {
  const { stats } = useDashboard();
  const { history } = useHistory();

  const averageRisk = useMemo(() => {
    if (history.length === 0) return 0;

    const total = history.reduce(
      (sum, item) => sum + item.risk_score,
      0
    );

    return (total / history.length).toFixed(1);
  }, [history]);

  const mostCommonSeverity = useMemo(() => {
    if (history.length === 0) return "-";

    const counts = {};

    history.forEach((item) => {
      counts[item.severity] = (counts[item.severity] || 0) + 1;
    });

    return Object.entries(counts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
  }, [history]);

  const topPrompts = useMemo(() => {
    return [...history]
      .sort((a, b) => b.risk_score - a.risk_score)
      .slice(0, 5);
  }, [history]);

  return (
    <div className="reports">

      <div className="reports-header">
        <h1>Security Reports</h1>
        <p>Overview of all analysed prompts</p>
      </div>

      <div className="reports-grid">

        <div className="report-card">
          <h3>Total Analyses</h3>
          <h2>{stats.totalAnalyses}</h2>
        </div>

        <div className="report-card">
          <h3>Critical Threats</h3>
          <h2>{stats.critical}</h2>
        </div>

        <div className="report-card">
          <h3>High Risk</h3>
          <h2>{stats.highRisk}</h2>
        </div>

        <div className="report-card">
          <h3>Safe Prompts</h3>
          <h2>{stats.safe}</h2>
        </div>

        <div className="report-card">
          <h3>Average Risk Score</h3>
          <h2>{averageRisk}</h2>
        </div>

        <div className="report-card">
          <h3>Most Common Severity</h3>
          <h2>{mostCommonSeverity}</h2>
        </div>

      </div>

      <div className="top-prompts">

        <h2>Top Risk Prompts</h2>

        <table>

          <thead>

            <tr>
              <th>Prompt</th>
              <th>Risk</th>
              <th>Severity</th>
            </tr>

          </thead>

          <tbody>

            {topPrompts.map((item) => (

              <tr key={item.id}>

                <td>{item.prompt}</td>

                <td>{item.risk_score}</td>

                <td>

                  <span
                    className={`status ${item.severity.toLowerCase()}`}
                  >
                    {item.severity}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}