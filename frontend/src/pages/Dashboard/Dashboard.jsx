import "./Dashboard.css";

import { useDashboard } from "../../context/DashboardContext";

import StatCard from "../../components/StatCard/StatCard";
import RecentTable from "../../components/Dashboard/RecentTable";
import ActivityCard from "../../components/Dashboard/ActivityCard";
import ThreatChart from "../../components/Dashboard/ThreatChart";

export default function Dashboard() {

  const { stats } = useDashboard();

  return (
    <div className="dashboard">

      <header className="dashboard-header">

        <div>
          <h1>Dashboard</h1>

          <p>AI Prompt Security Monitoring Overview</p>
        </div>

      </header>

      <section className="stats-grid">

        <StatCard
          title="Total Analyses"
          value={stats.totalAnalyses}
          subtitle="+12% from last week"
          accent="var(--primary)"
        />

        <StatCard
          title="High Risk"
          value={stats.highRisk}
          subtitle="+5% from last week"
          accent="var(--warning)"
        />

        <StatCard
          title="Critical"
          value={stats.critical}
          subtitle="+2% from last week"
          accent="var(--danger)"
        />

        <StatCard
          title="Safe Prompts"
          value={stats.safe}
          subtitle="+15% from last week"
          accent="var(--success)"
        />

      </section>

      <section className="dashboard-grid">

        <div className="left-column">

          <RecentTable />

          <ActivityCard />

        </div>

        <div className="right-column">

          <ThreatChart />

        </div>

      </section>

    </div>
  );
}