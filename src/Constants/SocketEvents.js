const keyMirror = require("keymirror");

const SocketEvents = keyMirror({
  STATUS: null,
  SCRAPER_CONNECTED: null,
  CONTENT_SCRAPED: null,
  FRONTEND_STATUS: null,
  SPAWN_SCRAPER: null,
  SESSION_ID: null,
  STATUS_RECEIVED: null,
  STOP_SCRAPERS: null,
  SCRAPER_STATUS_CHANGED: null,
  DOWNLOADS_SYNC_REQUESTED: null,
  DOWNLOADS_SYNC_RECEIVED: null,
  BACKEND_STATUS_CHANGED: null,
  JOBS_BATCH_SCRAPED: null,
  LOCATION_UPDATED: null,
  SCRAPE_LOCATION_BY_TERM: null,
});

export default SocketEvents;
