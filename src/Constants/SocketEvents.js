const keyMirror = require("keymirror");

const SocketEvents = keyMirror({
  STATUS: null,
  SCRAPER_CONNECTED: null,
  CONTENT_SCRAPED: null,
  SPAWN_SCRAPER: null,
  STOP_SCRAPERS: null,
});

export default SocketEvents;
