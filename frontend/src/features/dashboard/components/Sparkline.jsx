import { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';
import { getCssVar } from '../../../utils/getCssVar';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

const TONE_VAR = {
  neutral: '--accent-blue',
  safe: '--signal-safe',
  warning: '--signal-warning',
  critical: '--signal-critical',
};

/**
 * Sparkline
 * A minimal 40px-tall trend line with no axes/gridlines/tooltip — just
 * enough to show direction at a glance inside a StatCard.
 */
export default function Sparkline({ data, tone = 'neutral' }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const color = getCssVar(TONE_VAR[tone] ?? TONE_VAR.neutral);

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [
          {
            data,
            borderColor: color,
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.35,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
          x: { display: false },
          y: { display: false },
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [data, tone]);

  return <canvas ref={canvasRef} role="img" aria-label="Trend sparkline" />;
}
