import "./Dashboard.css";

import { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/api";

import StatCard from "../../components/StatCard/StatCard";
import RecentTable from "../../components/Dashboard/RecentTable";
import ActivityCard from "../../components/Dashboard/ActivityCard";
import ThreatChart from "../../components/Dashboard/ThreatChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    highRisk: 0,
    critical: 0,
    safe: 0,
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboard();
  }, []);

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