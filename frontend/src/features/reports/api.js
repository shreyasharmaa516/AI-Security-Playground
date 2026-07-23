const API_BASE = "http://localhost:8000";

export async function fetchRecentReports() {
  const response = await fetch("http://localhost:8000/history");

  if (!response.ok) {
    throw new Error("Failed to load reports");
  }

  const history = await response.json();

  return {
    reports: history.map((item) => ({
      id: item.id,
      name:
        item.prompt.length > 40
          ? item.prompt.substring(0, 40) + "..."
          : item.prompt,
      generatedAt: item.created_at,
      rangeCovered: "Single Analysis",
      status: "ready",
      postureGrade: item.severity,
      totalIncidents: item.risk_score,
      mostCommonThreat:
        item.detections?.length > 0 ? item.detections[0].name : "None",
    })),
    total: history.length,
  };
}

export async function downloadReport(id) {
  window.open(`${API_BASE}/report/${id}`, "_blank");
}

export const DATE_RANGE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "all", label: "All Time" },
];

export const REPORT_SECTION_OPTIONS = [
  { id: "summary", label: "Executive Summary" },
  { id: "detections", label: "Detection Results" },
  { id: "recommendations", label: "Recommendations" },
  { id: "details", label: "Detailed Findings" },
];
