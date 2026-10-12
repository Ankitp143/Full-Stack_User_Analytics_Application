(function () {
  const API_URL = '/api/events';
  const STORAGE_KEY = 'analytics_session_id';

  function getSessionId() {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      const match = document.cookie.match(new RegExp('(^| )' + STORAGE_KEY + '=([^;]+)'));
      id = match ? match[2] : null;
    }
    if (!id) {
      id = 'sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      localStorage.setItem(STORAGE_KEY, id);
      document.cookie = `${STORAGE_KEY}=${id}; path=/; max-age=86400`;
    }
    return id;
  }

  function sendEvent(data) {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch(function (err) {
      console.warn('Analytics send failed:', err);
    });
  }

  function trackPageView() {
    sendEvent({
      session_id: getSessionId(),
      event_type: 'page_view',
      page_url: window.location.href,
      timestamp: new Date().toISOString()
    });
  }

  function trackClick(e) {
    sendEvent({
      session_id: getSessionId(),
      event_type: 'click',
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
      x: e.pageX,
      y: e.pageY
    });
  }

  window.addEventListener('load', trackPageView);
  document.addEventListener('click', trackClick, true);

  window.getCurrentAnalyticsSession = getSessionId;
})();
