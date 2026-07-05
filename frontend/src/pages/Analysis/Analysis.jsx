import { useState } from "react";

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

      await Promise.all([
        refreshDashboard(),
        refreshHistory(),
      ]);

    }

    catch (error) {

      console.error(error);

      alert("Analysis failed.");

    }

    finally {

      setLoading(false);

    }

  }

  return (
    <div className="analysis">

      <h1>New Analysis</h1>

      <p>
        Paste an AI prompt below and analyze it for security risks.
      </p>

      <textarea
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Prompt"}
      </button>

      <ResultCard result={result} />

    </div>
  );
}