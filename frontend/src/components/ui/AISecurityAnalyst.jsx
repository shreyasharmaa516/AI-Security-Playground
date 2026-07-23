import Card from "../../../components/ui/Card";
import "./AISecurityAnalyst.css";

export default function AISecurityAnalyst({
  summary,
  businessImpact,
  attackScenario,
  owasp,
  securePrompt,
  recommendations,
}) {
  return (
    <Card className="ai-security-card">
      <div className="ai-security-header">
        <div>
          <h2>🧠 AI Security Analyst</h2>
          <p>AI-generated security assessment and mitigation guidance</p>
        </div>

        <span className="owasp-badge">{owasp}</span>
      </div>

      <div className="analysis-section">
        <h3>Executive Summary</h3>
        <p>{summary}</p>
      </div>

      <div className="analysis-grid">
        <div className="analysis-box">
          <h3>Business Impact</h3>
          <p>{businessImpact}</p>
        </div>

        <div className="analysis-box">
          <h3>Attack Scenario</h3>
          <p>{attackScenario}</p>
        </div>
      </div>

      <div className="analysis-section">
        <h3>🔒 Secure Prompt Rewrite</h3>

        <div className="secure-prompt">{securePrompt}</div>
      </div>

      <div className="analysis-section">
        <h3>Recommendations</h3>

        <ul className="recommendation-list">
          {recommendations?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
