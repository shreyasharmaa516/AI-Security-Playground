import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import { getCssVar } from '../../../utils/getCssVar';
import './ThreatBreakdownChart.css';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip);

/**
 * ThreatBreakdownChart
 * Reports-only: horizontal bars, one per detection category, sorted
 * descending. Uses a single accent color (count is the only variable here,
 * not severity), consistent with the "color = meaning" rule.
 */
export default function ThreatBreakdownChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const gridColor = getCssVar('--border-subtle');
    const tickColor = getCssVar('--text-tertiary');
    const accent = getCssVar('--accent-blue');
    const tooltipBg = getCssVar('--bg-surface-raised');
    const tooltipBorder = getCssVar('--border-default');
    const textPrimary = getCssVar('--text-primary');

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: data.map((d) => d.label),
        datasets: [
          {
            data: data.map((d) => d.count),
            backgroundColor: accent,
            borderRadius: 4,
            barThickness: 16,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: tickColor, font: { size: 11 }, precision: 0 },
            border: { display: false },
            beginAtZero: true,
          },
          y: {
            grid: { display: false },
            ticks: { color: tickColor, font: { size: 11 } },
            border: { display: false },
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
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [data]);

  return (
    <div className="threat-breakdown-chart">
      <canvas ref={canvasRef} role="img" aria-label="Threat breakdown by category" />
    </div>
  );
}
