import "./Dashboard.css";

import StatCard from "../../components/StatCard/StatCard";
import RecentTable from "../../components/Dashboard/RecentTable";
import ActivityCard from "../../components/Dashboard/ActivityCard";
import ThreatChart from "../../components/Dashboard/ThreatChart";

export default function Dashboard() {
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
          value="126"
          subtitle="+12% from last week"
          accent="var(--primary)"
        />

        <StatCard
          title="High Risk"
          value="18"
          subtitle="+5% from last week"
          accent="var(--warning)"
        />

        <StatCard
          title="Critical"
          value="5"
          subtitle="+2% from last week"
          accent="var(--danger)"
        />

        <StatCard
          title="Safe Prompts"
          value="103"
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