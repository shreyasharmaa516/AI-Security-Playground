import { useState } from "react";
import { Shield, TriangleAlert, Lock, FileWarning } from "lucide-react";

import "./Analysis.css";

import { analyzePrompt } from "../../services/api";
import ResultCard from "../../components/ResultCard/ResultCard";

import { useDashboard } from "../../context/DashboardContext";
import { useHistory } from "../../context/HistoryContext";

export default function Analysis() {
  const [prompt, setPrompt] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const { refreshDashboard } = useDashboard();

  const { refreshHistory } = useHistory();

  async function handleAnalyze() {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");

      return;
    }

    try {
      setLoading(true);

      const response = await analyzePrompt(prompt);

      setResult(response);

      await Promise.all([refreshDashboard(), refreshHistory()]);
    } catch (error) {
      console.error(error);

      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="analysis-page">
      <header className="analysis-header">
        <small>SENTRA</small>

        <h1>New Analysis</h1>

        <p>Analyze AI prompts for security threats before they reach an LLM.</p>
      </header>

      <div className="analysis-grid">
        <div className="analysis-left">
          <textarea
            placeholder="Paste or type an AI prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="analysis-actions">
            <span className="character-count">
              {prompt.length} / 5000 Characters
            </span>

            <div className="button-group">
              <button
                className="clear-btn"
                onClick={() => {
                  setPrompt("");
                  setResult(null);
                }}
              >
                Clear
              </button>

              <button onClick={handleAnalyze} disabled={loading}>
                {loading ? "Analyzing..." : "Analyze Prompt"}
              </button>
            </div>
          </div>

          <ResultCard result={result} />
        </div>

        <div className="analysis-right">
          <div className="info-card">
            <h3>Detection Engine</h3>

            <p className="info-subtitle">
              Every submitted prompt is scanned before analysis using Sentra's
              security detection pipeline.
            </p>

            <div className="info-item">
              <Shield size={18} />

              <span>Prompt Injection</span>
            </div>

            <div className="info-item">
              <TriangleAlert size={18} />

              <span>Jailbreak Attempts</span>
            </div>

            <div className="info-item">
              <Lock size={18} />

              <span>Sensitive Information</span>
            </div>

            <div className="info-item">
              <FileWarning size={18} />

              <span>Role Manipulation</span>

              <div className="engine-status">
                <span className="status-dot"></span>

                <div>
                  <strong>Engine Status</strong>

                  <p>Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
