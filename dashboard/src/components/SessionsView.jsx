export default function SessionsView({
  sessions,
  selectedSessionId,
  onSelectSession,
  sessionEvents,
  loadingSessions,
  loadingEvents,
  onRefresh
}) {
  return (
    <div>
      <div className="page-header">
        <h1>User Sessions</h1>
        <button className="refresh-btn" onClick={onRefresh}>
          Refresh
        </button>
      </div>

      <div className="sessions-layout">
        {/* Session List Table */}
        <div className="session-list">
          <div className="panel-header">
            All Sessions ({sessions.length})
          </div>
          {loadingSessions ? (
            <div className="empty-state">Loading sessions...</div>
          ) : sessions.length === 0 ? (
            <div className="empty-state">
              No sessions recorded yet.<br />
              Open the demo page and click around to generate events!
            </div>
          ) : (
            sessions.map((s) => (
              <div
                key={s.sessionId}
                className={`session-item ${selectedSessionId === s.sessionId ? 'selected' : ''}`}
                onClick={() => onSelectSession(s.sessionId)}
              >
                <div className="session-row">
                  <span className="session-id">{s.sessionId}</span>
                  <span className="event-count-badge">{s.totalEvents} events</span>
                </div>
                <div className="session-time">
                  {new Date(s.lastSeen || s.lastTime).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* User Journey Timeline */}
        <div className="journey-panel">
          <div className="panel-header">
            User Journey {selectedSessionId ? `— ${selectedSessionId}` : ''}
          </div>
          <div className="journey-timeline">
            {loadingEvents ? (
              <div className="empty-state">Loading user journey...</div>
            ) : sessionEvents.length === 0 ? (
              <div className="empty-state">Select a session from the left to view events.</div>
            ) : (
              sessionEvents.map((evt, idx) => {
                const coordX = evt.coordinates ? evt.coordinates.x : evt.x;
                const coordY = evt.coordinates ? evt.coordinates.y : evt.y;
                return (
                  <div key={evt._id || idx} className="timeline-item">
                    <div className="timeline-line"></div>
                    <div className={`timeline-dot dot-${evt.eventType}`}></div>
                    <div className="event-card">
                      <div className="event-header">
                        <span className={`event-badge badge-${evt.eventType}`}>
                          {evt.eventType === 'page_view' ? '📄 Page View' : '🖱️ Click'}
                        </span>
                        <span className="event-time">
                          {new Date(evt.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="event-url">{evt.pageUrl}</div>
                      {evt.eventType === 'click' && coordX != null && (
                        <div className="event-coords">
                          Click Position: X: {coordX}px, Y: {coordY}px
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
