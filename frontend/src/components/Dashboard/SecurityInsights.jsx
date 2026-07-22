import "./SecurityInsights.css";

import { ShieldCheck, AlertTriangle, Activity } from "lucide-react";

import { useDashboard } from "../../context/DashboardContext";

export default function SecurityInsights() {
  const { stats } = useDashboard();

  const overallStatus =
    stats.critical > 0 ? "Critical" : stats.highRisk > 0 ? "Warning" : "Secure";

  const total = stats.totalAnalyses || 0;

  const risky = stats.critical + stats.highRisk;

  const averageRisk = total > 0 ? Math.round((risky / total) * 100) : 0;

  return (
    <div className="insights-card">
      <h2>Security Insights</h2>

      <div className="insight">
        <ShieldCheck size={18} />

        <div>
          <strong>Overall Status</strong>

          <p>{overallStatus}</p>
        </div>
      </div>

      <div className="insight">
        <Activity size={18} />

        <div>
          <strong>Risk Exposure</strong>

          <p>{averageRisk}%</p>
        </div>
      </div>

      <div className="insight">
        <AlertTriangle size={18} />

        <div>
          <strong>Critical Threats</strong>

          <p>{stats.critical}</p>
        </div>
      </div>
    </div>
  );
}
