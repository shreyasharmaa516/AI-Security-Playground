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

  const total =
    stats.critical +
    stats.highRisk +
    stats.safe;

  const centerTextPlugin = {
    id: "centerText",

    afterDraw(chart) {

      const { ctx } = chart;

      const meta = chart.getDatasetMeta(0);

      if (!meta.data.length) return;

      const x = meta.data[0].x;
      const y = meta.data[0].y;

      ctx.save();

      ctx.textAlign = "center";

      ctx.fillStyle = "#ffffff";
      ctx.font = "700 34px Inter";

      ctx.fillText(total, x, y - 4);

      ctx.fillStyle = "#94A3B8";
      ctx.font = "500 14px Inter";

      ctx.fillText("Analyses", x, y + 22);

      ctx.restore();

    },

  };

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
          "#EF4444",
          "#F59E0B",
          "#22C55E",
        ],

        borderWidth: 0,

        hoverOffset: 10,

      },
    ],
  };

  const options = {

    responsive: true,

    cutout: "78%",

    plugins: {

      legend: {

        position: "bottom",

        labels: {

          color: "#94A3B8",

          usePointStyle: true,

          pointStyle: "circle",

          padding: 20,

          boxWidth: 10,

          font: {

            size: 13,

          },

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
          plugins={[centerTextPlugin]}
        />

      </div>

    </div>

  );

}