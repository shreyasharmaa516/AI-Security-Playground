import "./Settings.css";

import { Shield, Brain, Database, FileText, CheckCircle } from "lucide-react";

export default function Settings() {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <p className="settings-subtitle">
        Platform configuration and system information.
      </p>

      <div className="settings-grid">
        <div className="settings-card">
          <Shield size={22} />
          <div>
            <h3>Security Engine</h3>
            <p>Rule Engine + Gemini AI</p>
          </div>
        </div>

        <div className="settings-card">
          <Brain size={22} />
          <div>
            <h3>AI Provider</h3>
            <p>Google Gemini</p>
          </div>
        </div>

        <div className="settings-card">
          <Database size={22} />
          <div>
            <h3>Database</h3>
            <p>SQLite</p>
          </div>
        </div>

        <div className="settings-card">
          <FileText size={22} />
          <div>
            <h3>Report Format</h3>
            <p>Enterprise PDF</p>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2>Platform Status</h2>

        <div className="status-row">
          <CheckCircle size={18} />
          <span>Rule-based detection enabled</span>
        </div>

        <div className="status-row">
          <CheckCircle size={18} />
          <span>AI-assisted analysis enabled</span>
        </div>

        <div className="status-row">
          <CheckCircle size={18} />
          <span>Analysis history enabled</span>
        </div>

        <div className="status-row">
          <CheckCircle size={18} />
          <span>PDF report generation enabled</span>
        </div>
      </div>

      <div className="settings-section">
        <h2>Application</h2>

        <table className="info-table">
          <tbody>
            <tr>
              <td>Platform</td>
              <td>Sentra</td>
            </tr>

            <tr>
              <td>Version</td>
              <td>v1.0</td>
            </tr>

            <tr>
              <td>Framework</td>
              <td>React + FastAPI</td>
            </tr>

            <tr>
              <td>Database</td>
              <td>SQLite</td>
            </tr>

            <tr>
              <td>Analysis Engine</td>
              <td>Rule Engine + Gemini AI</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
