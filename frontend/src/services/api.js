const API_URL = "http://127.0.0.1:8000";

export async function analyzePrompt(prompt) {
  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze prompt.");
  }

  return response.json();
}