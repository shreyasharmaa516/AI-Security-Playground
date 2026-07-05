import "./Dashboard.css";

import { useDashboard } from "../../context/DashboardContext";

import StatCard from "../../components/StatCard/StatCard";
import RecentTable from "../../components/Dashboard/RecentTable";
import ActivityCard from "../../components/Dashboard/ActivityCard";
import ThreatChart from "../../components/Dashboard/ThreatChart";
import SecurityInsights from "../../components/Dashboard/SecurityInsights";

export default function Dashboard() {

  const { stats } = useDashboard();

  return (
    <div className="dashboard">

      <header className="dashboard-header">

        <div>

          <small className="dashboard-label">
            SENTINELAI
          </small>

          <h1>Security Dashboard</h1>

          <p>
            Monitor AI prompt security, detect threats and review recent analyses.
          </p>

        </div>

      </header>

      <section className="stats-grid">

        <StatCard
          title="Total Analyses"
          value={stats.totalAnalyses}
          subtitle="Live"
          accent="var(--primary)"
        />

        <StatCard
          title="Critical Threats"
          value={stats.critical}
          subtitle="Live"
          accent="var(--danger)"
        />

        <StatCard
          title="Safe Prompts"
          value={stats.safe}
          subtitle="Live"
          accent="var(--success)"
        />

      </section>

      <section className="dashboard-grid">

        <div className="left-column">

          <RecentTable/>

          <SecurityInsights />

        </div>

        <div className="right-column">

          <ThreatChart/>

        </div>

      </section>

    </div>
  );

}