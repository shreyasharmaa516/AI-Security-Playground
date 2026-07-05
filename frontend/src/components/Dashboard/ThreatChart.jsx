import "./ThreatChart.css";

export default function ThreatChart() {
  return (
    <div className="threat-card">

      <div className="threat-header">
        <h2>Threat Distribution</h2>
      </div>

      <div className="chart-placeholder">

        <div className="circle">
          <span>126</span>
          <small>Total</small>
        </div>

      </div>

      <div className="legend">

        <div>
          <span className="legend-dot critical"></span>
          Critical
        </div>

        <div>
          <span className="legend-dot warning"></span>
          High
        </div>

        <div>
          <span className="legend-dot success"></span>
          Safe
        </div>

      </div>

    </div>
  );
}