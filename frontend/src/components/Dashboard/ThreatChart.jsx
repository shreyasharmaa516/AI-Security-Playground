import "./ThreatChart.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import { useDashboard } from "../../context/DashboardContext";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function ThreatChart() {

  const { stats } = useDashboard();

  const chartData = {
    labels: [
      "Critical",
      "High",
      "Safe",
    ],

    datasets: [
      {
        data: [
          stats.critical,
          stats.highRisk,
          stats.safe,
        ],

        backgroundColor: [
          "#ef4444",
          "#f59e0b",
          "#22c55e",
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,

    cutout: "72%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#94A3B8",

          usePointStyle: true,

          pointStyle: "circle",

          padding: 18,
        },
      },
    },
  };

  return (
    <div className="threat-card">

      <div className="threat-header">
        <h2>Threat Distribution</h2>
      </div>

      <div className="chart-wrapper">

        <Doughnut
          data={chartData}
          options={options}
        />

      </div>

    </div>
  );
}