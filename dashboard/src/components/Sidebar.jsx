export default function Sidebar({ currentView, onSelectView }) {
  return (
    <aside className="sidebar">
      <h2>User Analytics</h2>
      <button
        className={`nav-item ${currentView === 'sessions' ? 'active' : ''}`}
        onClick={() => onSelectView('sessions')}
      >
        <span>👥</span> Sessions View
      </button>
      <button
        className={`nav-item ${currentView === 'heatmap' ? 'active' : ''}`}
        onClick={() => onSelectView('heatmap')}
      >
        <span>🔥</span> Heatmap View
      </button>

      <a
        href="http://localhost:5000/tracker/index.html"
        target="_blank"
        rel="noreferrer"
        className="demo-link"
      >
        Open Demo Page &rarr;
      </a>
    </aside>
  );
}
