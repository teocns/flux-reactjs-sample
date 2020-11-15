const keyMirror = require("keymirror");

const ActionTypes = keyMirror({
  SCRAPER_CONNECTED: null,
  CONTENT_SCRAPED: null,
  SPAWN_SCRAPER: null,
  STOP_SCRAPERS: null,
  BACKEND_STATUS_RECEIVED: null,
});

export default ActionTypes;
