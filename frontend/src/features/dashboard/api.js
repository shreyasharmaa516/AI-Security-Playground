const API_URL = "http://localhost:8000";

export async function getDashboard() {
  const response = await fetch(`${API_URL}/dashboard`);

  if (!response.ok) {
    throw new Error("Failed to load dashboard.");
  }

  return response.json();
}

export async function getHistory() {
  const response = await fetch(`${API_URL}/history`);

  if (!response.ok) {
    throw new Error("Failed to load history.");
  }

  return response.json();
}
