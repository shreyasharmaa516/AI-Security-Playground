import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  FileSearch,
  History,
  BarChart3,
  Settings,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <ShieldCheck size={32} />
          <div>
            <h1>Sentra</h1>
            <span className="brand-subtitle">AI Prompt Security Platform</span>
          </div>
        </div>

        <p className="section-title">MAIN</p>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/analysis">
            <FileSearch size={18} />
            <span>Analysis</span>
          </NavLink>

          <NavLink to="/history">
            <History size={18} />
            <span>History</span>
          </NavLink>

          <NavLink to="/reports">
            <BarChart3 size={18} />
            <span>Reports</span>
          </NavLink>
        </nav>

        <p className="section-title system">SYSTEM</p>

        <nav className="sidebar-nav">
          <NavLink to="/settings">
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="version-title">Sentra</div>
        <div className="version-number">v1.0.0</div>
        <div className="version-desc">AI Prompt Security Platform</div>
      </div>
    </aside>
  );
}
