import "./AnalysisModal.css";

export default function AnalysisModal({
  open,
  analysis,
  onClose,
}) {
  if (!open || !analysis) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="analysis-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">

          <h2>Analysis Details</h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <div className="modal-body">

          <div className="detail-group">
            <label>Prompt</label>

            <div className="prompt-box">
              {analysis.prompt}
            </div>
          </div>

          <div className="detail-row">

            <div className="detail-group">
              <label>Risk Score</label>
              <h3>{analysis.risk_score}</h3>
            </div>

            <div className="detail-group">
              <label>Severity</label>

              <span
                className={`status ${analysis.severity.toLowerCase()}`}
              >
                {analysis.severity}
              </span>

            </div>

          </div>

          <div className="detail-group">

            <label>Result</label>

            <div className="message-box">
              {analysis.message}
            </div>

          </div>

          <div className="detail-group">

            <label>Analysed At</label>

            <p>
              {new Date(
                analysis.created_at
              ).toLocaleString("en-IN")}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}