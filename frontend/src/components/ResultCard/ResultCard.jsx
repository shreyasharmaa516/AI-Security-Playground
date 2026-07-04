import "./ResultCard.css";
import {
  FaShieldAlt,
  FaLightbulb,
  FaExclamationTriangle,
  FaChartBar,
} from "react-icons/fa";

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="result-card">
      <h2>
        <FaShieldAlt />
        AI Security Assessment
      </h2>

      <div className="stats-grid">

        <div className="stat-card">
          <span className="stat-title">Risk Score</span>

          <h3>{result.risk_score}/100</h3>

          <div className="risk-bar">
            <div
              className={`risk-fill ${result.severity.toLowerCase()}`}
              style={{
                width: `${result.risk_score}%`,
              }}
            />
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-title">Threats Found</span>

          <h3>{result.detections.length}</h3>
        </div>

        <div className="stat-card">
          <span className="stat-title">Severity</span>

          <div
            className={`severity-badge ${result.severity.toLowerCase()}`}
          >
            {result.severity}
          </div>
        </div>

      </div>

      <div className="analysis-message">

        <FaChartBar />

        <p>{result.message}</p>

      </div>

      <h3>
        <FaExclamationTriangle />
        Detected Rules
      </h3>

      <div className="detections">
        {result.detections.length === 0 ? (
          <p className="no-detections">
            ✅ No threats detected.
          </p>
        ) : (
          result.detections.map((item, index) => (
            <div
              key={index}
              className="detection-card"
            >
              <div className="detection-header">
                <span className="detection-id">
                  {item.id}
                </span>

                <span
                  className={`severity-badge ${item.severity.toLowerCase()}`}
                >
                  {item.severity}
                </span>
              </div>

              <h4>{item.name}</h4>

              <p>
                <strong>Rule:</strong> {item.rule}
              </p>

              <p>{item.description}</p>

              <p className="recommendation">
                <FaLightbulb />
                <span>{item.recommendation}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}