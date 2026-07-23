import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';
import { getCssVar } from '../../../utils/getCssVar';
import { threatDistribution } from '../mockData';
import './ThreatDistributionChart.css';

Chart.register(DoughnutController, ArcElement, Tooltip);

/**
 * ThreatDistributionChart
 * Donut breakdown of detections by category. Uses the muted qualitative
 * palette (category-1..5) rather than signal colors, since these are types
 * of threat, not severities.
 */
export default function ThreatDistributionChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const colors = threatDistribution.map((d) => getCssVar(d.colorVar));
    const tooltipBg = getCssVar('--bg-surface-raised');
    const tooltipBorder = getCssVar('--border-default');
    const textPrimary = getCssVar('--text-primary');
    const textTertiary = getCssVar('--text-tertiary');

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: threatDistribution.map((d) => d.label),
        datasets: [
          {
            data: threatDistribution.map((d) => d.value),
            backgroundColor: colors,
            borderColor: getCssVar('--bg-surface'),
            borderWidth: 2,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            borderColor: tooltipBorder,
            borderWidth: 1,
            titleColor: textPrimary,
            bodyColor: textTertiary,
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="threat-distribution">
      <div className="threat-distribution__chart">
        <canvas ref={canvasRef} role="img" aria-label="Threat distribution by category" />
      </div>
      <ul className="threat-distribution__legend">
        {threatDistribution.map((item) => (
          <li key={item.label} className="threat-distribution__legend-item">
            <span
              className="threat-distribution__dot"
              style={{ backgroundColor: `var(${item.colorVar})` }}
            />
            <span className="threat-distribution__legend-label">{item.label}</span>
            <span className="text-mono threat-distribution__legend-value">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
