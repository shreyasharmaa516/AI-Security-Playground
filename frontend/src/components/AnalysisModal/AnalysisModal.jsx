import "./AnalysisModal.css";

export default function AnalysisModal({ open, analysis, onClose }) {
  if (!open || !analysis) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="analysis-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Analysis Details</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="detail-group">
            <label>Prompt</label>

            <div className="prompt-box">{analysis.prompt}</div>
          </div>

          <div className="detail-row">
            <div className="detail-group">
              <label>Risk Score</label>

              <h3>{analysis.risk_score}/100</h3>
            </div>

            <div className="detail-group">
              <label>Severity</label>

              <span className={`status ${analysis.severity.toLowerCase()}`}>
                {analysis.severity}
              </span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-group">
              <label>AI Confidence</label>

              <p>
                {analysis.ai_confidence != null
                  ? `${Math.round(analysis.ai_confidence * 100)}%`
                  : "--"}
              </p>
            </div>

            <div className="detail-group">
              <label>Analysis Engine</label>

              <p>{analysis.analysis_engine || "--"}</p>
            </div>
          </div>

          <div className="detail-group">
            <label>AI Assessment</label>

            <div className="message-box">{analysis.message}</div>
          </div>

          <div className="detail-group">
            <label>Detected Threats</label>

            {analysis.detections?.length ? (
              analysis.detections.map((d, index) => (
                <div
                  key={index}
                  className="message-box"
                  style={{ marginBottom: "12px" }}
                >
                  <strong>{d.name}</strong>

                  <p>
                    <strong>Severity:</strong> {d.severity}
                  </p>

                  <p>
                    <strong>OWASP:</strong> {d.owasp || "--"}
                  </p>

                  <p>
                    <strong>Source:</strong>{" "}
                    {d.rule === "Gemini" ? "Gemini AI" : "Rule Engine"}
                  </p>

                  <p>{d.description}</p>

                  <p>
                    <strong>Recommendation:</strong> {d.recommendation}
                  </p>
                </div>
              ))
            ) : (
              <p>No threats detected.</p>
            )}
          </div>

          <div className="detail-group">
            <label>Analysed At</label>

            <p>{new Date(analysis.created_at).toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
