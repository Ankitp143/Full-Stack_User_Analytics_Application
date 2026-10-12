import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import SessionsView from './components/SessionsView';
import HeatmapView from './components/HeatmapView';
import { fetchSessions, fetchSessionEvents, fetchHeatmap, fetchPages } from './services/api';

export default function App() {
  const [view, setView] = useState('sessions');

  // Sessions state
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [sessionEvents, setSessionEvents] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // Heatmap state
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [clicks, setClicks] = useState([]);
  const [loadingClicks, setLoadingClicks] = useState(false);

  // Load session list
  const loadSessions = async () => {
    setLoadingSessions(true);
    try {
      const data = await fetchSessions();
      setSessions(data);
      if (data.length > 0 && !selectedSessionId) {
        setSelectedSessionId(data[0].sessionId);
      }
    } catch (err) {
      console.error('Failed to load sessions:', err);
    } finally {
      setLoadingSessions(false);
    }
  };

  // Load events for a selected session
  const loadSessionEvents = async (sessionId) => {
    if (!sessionId) return;
    setLoadingEvents(true);
    try {
      const data = await fetchSessionEvents(sessionId);
      setSessionEvents(data);
    } catch (err) {
      console.error('Failed to load session events:', err);
    } finally {
      setLoadingEvents(false);
    }
  };

  // Load distinct page URLs
  const loadPages = async () => {
    try {
      const data = await fetchPages();
      setPages(data);
      if (data.length > 0 && !selectedPage) {
        setSelectedPage(data[0]);
      }
    } catch (err) {
      console.error('Failed to load pages:', err);
    }
  };

  // Load clicks for heatmap
  const loadHeatmapClicks = async (pageUrl) => {
    setLoadingClicks(true);
    try {
      const data = await fetchHeatmap(pageUrl);
      setClicks(data);
    } catch (err) {
      console.error('Failed to load heatmap data:', err);
    } finally {
      setLoadingClicks(false);
    }
  };

  useEffect(() => {
    loadSessions();
    loadPages();
  }, []);

  useEffect(() => {
    if (selectedSessionId) {
      loadSessionEvents(selectedSessionId);
    }
  }, [selectedSessionId]);

  useEffect(() => {
    if (view === 'heatmap') {
      loadHeatmapClicks(selectedPage);
    }
  }, [view, selectedPage]);

  return (
    <div className="app">
      <Sidebar currentView={view} onSelectView={setView} />

      <main className="main-content">
        {view === 'sessions' ? (
          <SessionsView
            sessions={sessions}
            selectedSessionId={selectedSessionId}
            onSelectSession={setSelectedSessionId}
            sessionEvents={sessionEvents}
            loadingSessions={loadingSessions}
            loadingEvents={loadingEvents}
            onRefresh={loadSessions}
          />
        ) : (
          <HeatmapView
            pages={pages}
            selectedPage={selectedPage}
            onSelectPage={setSelectedPage}
            clicks={clicks}
            loadingClicks={loadingClicks}
            onRefresh={() => loadHeatmapClicks(selectedPage)}
          />
        )}
      </main>
    </div>
  );
}
