import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  FileSearch,
  History,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <div>

        <div className="brand">

          <h1>SentinelAI</h1>

        </div>

        <p className="section-title">
          MAIN
        </p>

        <nav className="sidebar-nav">

          <NavLink to="/dashboard">
            <LayoutDashboard size={18}/>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/analysis">
            <FileSearch size={18}/>
            <span>Analysis</span>
          </NavLink>

          <NavLink to="/history">
            <History size={18}/>
            <span>History</span>
          </NavLink>

          <NavLink to="/reports">
            <BarChart3 size={18}/>
            <span>Reports</span>
          </NavLink>

        </nav>

        <p className="section-title system">
          SYSTEM
        </p>

        <nav className="sidebar-nav">

          <NavLink to="/settings">
            <Settings size={18}/>
            <span>Settings</span>
          </NavLink>

        </nav>

      </div>

      <div className="version">

        Version 1.0

      </div>

    </aside>
  );
}