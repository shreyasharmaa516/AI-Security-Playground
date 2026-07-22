import "./ResultCard.css";
import {
  FaShieldAlt,
  FaLightbulb,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

export default function ResultCard({ result }) {
  if (!result) return null;

  const hasThreats = result.detections.length > 0;

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
          <span className="stat-title">AI Confidence</span>

          <h3>
            {result.ai_confidence != null
              ? `${Math.round(result.ai_confidence * 100)}%`
              : "--"}
          </h3>
        </div>

        <div className="stat-card">
          <span className="stat-title">Severity</span>

          <div className={`severity-badge ${result.severity.toLowerCase()}`}>
            {result.severity}
          </div>
        </div>
      </div>

      <div className={`analysis-message ${hasThreats ? "danger" : "safe"}`}>
        {hasThreats ? <FaExclamationTriangle /> : <FaCheckCircle />}

        <div className="ai-summary">
          <h3>AI Security Summary</h3>

          <p>{result.message}</p>
        </div>
      </div>

      <h3>
        <FaExclamationTriangle />
        Detected Threats
      </h3>

      <div className="detections">
        {hasThreats ? (
          result.detections.map((item, index) => (
            <div key={index} className="detection-card">
              <div className="detection-header">
                <span className="detection-id">{item.id}</span>

                <span
                  className={`severity-badge ${item.severity.toLowerCase()}`}
                >
                  {item.severity}
                </span>
              </div>

              <div className="detection-title">
                <h4>{item.name}</h4>

                {item.rule === "Gemini" && <span className="ai-badge">AI</span>}
              </div>

              <p>
                <strong>Source:</strong>{" "}
                {item.rule === "Gemini" ? "Gemini AI Analysis" : "Rule Engine"}
              </p>

              <p>
                <strong>OWASP:</strong>{" "}
                {item.owasp || "LLM01: Prompt Injection"}
              </p>

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
        ) : (
          <p className="no-detections">
            <FaCheckCircle />
            No threats detected.
          </p>
        )}
      </div>
    </div>
  );
}
