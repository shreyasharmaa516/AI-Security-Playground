import "./History.css";

import { useEffect, useState } from "react";

import { getAnalysisHistory } from "../../services/api";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getAnalysisHistory();
        setHistory(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadHistory();
  }, []);

  return (
    <div className="history-page">

      <div className="history-header">
        <h1>Analysis History</h1>
        <p>All prompt analyses stored in SentinelAI</p>
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

            {history.map((item) => (

              <tr key={item.id}>

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
                  {new Date(item.created_at).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}