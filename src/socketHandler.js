import dispatcher from "./dispatcher";

import actions from "./actions";

import SocketEvents from "./Constants/SocketEvents";

const bindSocketHandler = (socket) => {
  socket.on("connect", () => {
    socket.emit("frontend");
  });
  socket.on(SocketEvents.SESSION_ID, () => {
    actions.sessIdReceived();
  });
  socket.on(SocketEvents.FRONTEND_STATUS, (backendStatus) => {
    actions.statusReceived(backendStatus);
  });

  socket.on(SocketEvents.SCRAPER_STATUS_CHANGED, (scraperStatus) => {
    actions.scraperStatusChanged(scraperStatus);
  });

  socket.on(SocketEvents.BACKEND_STATUS_CHANGED, (status) => {
    actions.backendStatusChanged(status);
  });

  socket.on("JOB_SCRAPED", actions.scrapingSpeedDataReceived);

  socket.on(SocketEvents.LOCATION_UPDATED, (location) => {
    actions.locationUpdated(location);
  });
};

export default bindSocketHandler;
