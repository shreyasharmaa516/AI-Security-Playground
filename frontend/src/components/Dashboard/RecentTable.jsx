import "./RecentTable.css";

import { useHistory } from "../../context/HistoryContext";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export default function RecentTable() {

  const { history } = useHistory();

  const recent = history.slice(0, 5);

  function getCategory(severity) {

    if (severity === "Critical") {
      return "Prompt Injection";
    }

    if (severity === "High") {
      return "Suspicious";
    }

    return "Safe";
  }

  return (
    <div className="recent-table">

      <div className="table-header">

        <div>

          <h2>Recent Analyses</h2>

          <p>Latest security events</p>

        </div>

        <span>{recent.length} Events</span>

      </div>

      <table>

        <thead>

          <tr>

            <th>Prompt</th>

            <th>Category</th>

            <th>Risk</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {recent.map((item) => (

            <tr key={item.id}>

              <td className="prompt-cell">

                {item.prompt.length > 42
                  ? item.prompt.substring(0, 42) + "..."
                  : item.prompt}

              </td>

              <td>

                <span className="category">

                  {item.severity === "Critical"
                    ? <ShieldAlert size={15}/>
                    : <ShieldCheck size={15}/>}

                  {getCategory(item.severity)}

                </span>

              </td>

              <td>

                <strong>{item.risk_score}</strong>

              </td>

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