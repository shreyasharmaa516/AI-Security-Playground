import "./Sidebar.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="logo">SentinelAI</h1>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>

        <NavLink to="/analysis">New Analysis</NavLink>

        <NavLink to="/reports">Reports</NavLink>

        <NavLink to="/history">History</NavLink>

        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}