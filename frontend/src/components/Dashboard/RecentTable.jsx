import "./RecentTable.css";

export default function RecentTable() {
  return (
    <div className="recent-table">

      <div className="table-header">

        <h2>Recent Analyses</h2>

        <span>Last 24 Hours</span>

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

          <tr>

            <td>Ignore previous instructions...</td>

            <td>95</td>

            <td>
              <span className="status critical">Critical</span>
            </td>

          </tr>

          <tr>

            <td>Generate SQL query...</td>

            <td>48</td>

            <td>
              <span className="status medium">Medium</span>
            </td>

          </tr>

          <tr>

            <td>Tell me a joke.</td>

            <td>5</td>

            <td>
              <span className="status low">Low</span>
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}