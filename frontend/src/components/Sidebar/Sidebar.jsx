import "./Sidebar.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">SentinelAI</h2>

      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/analysis"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              New Analysis
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Reports
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              History
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}