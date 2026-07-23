import { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from 'chart.js';
import { getCssVar } from '../../../utils/getCssVar';
import { detectionTimeline } from '../mockData';
import './DetectionTimelineChart.css';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

/**
 * DetectionTimelineChart
 * The primary Dashboard chart: detections over time, split by severity
 * (safe / warning / critical), using only the signal color system.
 */
export default function DetectionTimelineChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const gridColor = getCssVar('--border-subtle');
    const tickColor = getCssVar('--text-tertiary');
    const tooltipBg = getCssVar('--bg-surface-raised');
    const tooltipBorder = getCssVar('--border-default');
    const textPrimary = getCssVar('--text-primary');

    const safeColor = getCssVar('--signal-safe');
    const warningColor = getCssVar('--signal-warning');
    const criticalColor = getCssVar('--signal-critical');

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: detectionTimeline.labels,
        datasets: [
          {
            label: 'Safe',
            data: detectionTimeline.safe,
            borderColor: safeColor,
            backgroundColor: `${safeColor}1a`,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 1.5,
            tension: 0.3,
            fill: true,
          },
          {
            label: 'Warning',
            data: detectionTimeline.warning,
            borderColor: warningColor,
            backgroundColor: `${warningColor}1a`,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 1.5,
            tension: 0.3,
            fill: true,
          },
          {
            label: 'Critical',
            data: detectionTimeline.critical,
            borderColor: criticalColor,
            backgroundColor: `${criticalColor}1a`,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 1.5,
            tension: 0.3,
            fill: true,
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
            boxPadding: 4,
            cornerRadius: 6,
            displayColors: true,
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="detection-timeline-chart">
      <canvas ref={canvasRef} role="img" aria-label="Detection timeline by severity" />
      <div className="detection-timeline-chart__legend">
        <span className="detection-timeline-chart__legend-item">
          <span className="detection-timeline-chart__dot detection-timeline-chart__dot--safe" />
          Safe
        </span>
        <span className="detection-timeline-chart__legend-item">
          <span className="detection-timeline-chart__dot detection-timeline-chart__dot--warning" />
          Warning
        </span>
        <span className="detection-timeline-chart__legend-item">
          <span className="detection-timeline-chart__dot detection-timeline-chart__dot--critical" />
          Critical
        </span>
      </div>
    </div>
  );
}
