export default function HeatmapView({
  pages,
  selectedPage,
  onSelectPage,
  clicks,
  loadingClicks,
  onRefresh
}) {
  return (
    <div>
      <div className="page-header">
        <h1>Click Heatmap</h1>
        <button className="refresh-btn" onClick={onRefresh}>
          Refresh
        </button>
      </div>

      <div className="heatmap-container">
        <div className="heatmap-controls">
          <label htmlFor="pageSelect"><strong>Select Page URL:</strong></label>
          <select
            id="pageSelect"
            value={selectedPage}
            onChange={(e) => onSelectPage(e.target.value)}
          >
            <option value="">All Pages</option>
            {pages.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <span className="heatmap-stats">
            Recorded Clicks: <strong>{clicks.length}</strong>
          </span>
        </div>

        {loadingClicks ? (
          <div className="empty-state">Loading click coordinates...</div>
        ) : clicks.length === 0 ? (
          <div className="empty-state">No click events recorded for this URL.</div>
        ) : (
          <div className="heatmap-canvas-wrapper">
            {clicks.map((c, i) => {
              const posX = c.coordinates ? c.coordinates.x : c.x;
              const posY = c.coordinates ? c.coordinates.y : c.y;
              if (posX == null || posY == null) return null;
              return (
                <div
                  key={c._id || i}
                  className="click-dot"
                  style={{ left: `${posX}px`, top: `${posY}px` }}
                  title={`Click #${i + 1} at (${posX}, ${posY}) - ${new Date(c.timestamp).toLocaleTimeString()}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
