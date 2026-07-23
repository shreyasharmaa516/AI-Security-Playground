import { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import { getCssVar } from '../../../utils/getCssVar';
import './RiskTrendChart.css';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

/**
 * RiskTrendChart
 * Reports-only: longer-horizon trend line than the Dashboard's timeline,
 * with the two highest points marked as visible spike annotations.
 */
export default function RiskTrendChart({ trend }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const gridColor = getCssVar('--border-subtle');
    const tickColor = getCssVar('--text-tertiary');
    const accent = getCssVar('--accent-blue');
    const critical = getCssVar('--signal-critical');
    const tooltipBg = getCssVar('--bg-surface-raised');
    const tooltipBorder = getCssVar('--border-default');
    const textPrimary = getCssVar('--text-primary');

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: trend.labels,
        datasets: [
          {
            data: trend.data,
            borderColor: accent,
            backgroundColor: `${accent}1a`,
            borderWidth: 1.5,
            tension: 0.3,
            fill: true,
            pointRadius: (ctx) => (trend.markers.includes(ctx.dataIndex) ? 4 : 0),
            pointHoverRadius: 5,
            pointBackgroundColor: (ctx) => (trend.markers.includes(ctx.dataIndex) ? critical : accent),
            pointBorderColor: 'transparent',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: tickColor, font: { size: 11 } },
            border: { color: gridColor },
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: tickColor, font: { size: 11 }, precision: 0 },
            border: { display: false },
            beginAtZero: true,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            borderColor: tooltipBorder,
            borderWidth: 1,
            titleColor: textPrimary,
            bodyColor: tickColor,
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: (ctx) =>
                trend.markers.includes(ctx.dataIndex)
                  ? `${ctx.parsed.y} incidents \u2014 spike`
                  : `${ctx.parsed.y} incidents`,
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [trend]);

  return (
    <div className="risk-trend-chart">
      <canvas ref={canvasRef} role="img" aria-label="Risk trend over time" />
    </div>
  );
}
