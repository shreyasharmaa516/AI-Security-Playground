import "./RecentTable.css";

import { useHistory } from "../../context/HistoryContext";

export default function RecentTable() {

  const { history } = useHistory();

  const recent = history.slice(0, 5);

  return (
    <div className="recent-table">

      <div className="table-header">

        <h2>Recent Analyses</h2>

        <span>Latest 5</span>

      </div>

      <table>

        <thead>

          <tr>

            <th>Prompt</th>
            <th>Risk</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {recent.map((item) => (

            <tr key={item.id}>

              <td>

                {item.prompt.length > 45
                  ? item.prompt.substring(0, 45) + "..."
                  : item.prompt}

              </td>

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
  );
}