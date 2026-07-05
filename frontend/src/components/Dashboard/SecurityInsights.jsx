import "./SecurityInsights.css";

import { ShieldCheck, AlertTriangle, Activity } from "lucide-react";

import { useDashboard } from "../../context/DashboardContext";

export default function SecurityInsights() {

  const { stats } = useDashboard();

  return (

    <div className="insights-card">

      <h2>Security Insights</h2>

      <div className="insight">

        <ShieldCheck size={18}/>

        <div>

          <strong>Overall Status</strong>

          <p>System Secure</p>

        </div>

      </div>

      <div className="insight">

        <Activity size={18}/>

        <div>

          <strong>Average Risk</strong>

          <p>30</p>

        </div>

      </div>

      <div className="insight">

        <AlertTriangle size={18}/>

        <div>

          <strong>Critical Threats</strong>

          <p>{stats.critical}</p>

        </div>

      </div>

    </div>

  );

}