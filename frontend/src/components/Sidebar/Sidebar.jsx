import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">SentinelAI</h2>

      <nav>
        <ul>
          <li className="active">Dashboard</li>
          <li>New Analysis</li>
          <li>Reports</li>
          <li>History</li>
          <li>Settings</li>
        </ul>
      </nav>
    </aside>
  );
}