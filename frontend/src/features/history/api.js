const API = "http://localhost:8000";

export async function fetchAnalysisHistory() {
  const res = await fetch(`${API}/history`);

  if (!res.ok) throw new Error("Failed to load history");

  const data = await res.json();

  return {
    records: data.map((item) => ({
      id: item.id,
      prompt: item.prompt,
      context: "Prompt",
      riskScore: item.risk_score,
      riskLevel: (item.severity || "safe").toLowerCase(),
      detections: item.detections || [],
      analyzedAt: item.created_at,
      source: "Sentra",
      model: "Gemini",
    })),
    total: data.length,
  };
}

export const RISK_LEVEL_OPTIONS = [
  { value: "all", label: "All Levels" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];
