import "./ThreatChart.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function ThreatChart() {
  const data = {
    labels: [
      "Critical",
      "High",
      "Safe",
    ],
    datasets: [
      {
        data: [5, 18, 103],

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

          padding: 18,

          usePointStyle: true,

          pointStyle: "circle",
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
          data={data}
          options={options}
        />
      </div>

    </div>
  );
}