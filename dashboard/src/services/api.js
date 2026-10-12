// In production / unified mode, API calls go directly to the same host
const API_BASE = '/api';

export const fetchSessions = async () => {
  const res = await fetch(`${API_BASE}/sessions`);
  return res.json();
};

export const fetchSessionEvents = async (sessionId) => {
  const res = await fetch(`${API_BASE}/sessions/${sessionId}`);
  return res.json();
};

export const fetchHeatmap = async (pageUrl) => {
  const url = pageUrl ? `${API_BASE}/heatmap?pageUrl=${encodeURIComponent(pageUrl)}` : `${API_BASE}/heatmap`;
  const res = await fetch(url);
  return res.json();
};

export const fetchPages = async () => {
  const res = await fetch(`${API_BASE}/pages`);
  return res.json();
};
