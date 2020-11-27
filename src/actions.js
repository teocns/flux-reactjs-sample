import store from "./store";
import dispatcher from "./dispatcher";
import ActionTypes from "./Constants/ActionTypes";

import FrontendStatus from "./Models/FrontendStatus";
import ScraperStatus from "./Models/ScraperStatus";

import SocketEvents from "./Constants/SocketEvents";
import socket from "./socket";
import Download from "./Models/Download";

const sessIdReceived = () => {
  requestStatus();
};

const statusReceived = (status) => {
  dispatcher.dispatch({
    actionType: ActionTypes.FRONTEND_STATUS_RECEIVED,
    data: { status },
  });
};

const scrapeLocationByTerm = (term) => {
  socket.sendMessage(SocketEvents.SCRAPE_LOCATION_BY_TERM, term);
};

const requestStatus = () => {
  socket.sendMessage(SocketEvents.FRONTEND_STATUS);
};

/**
 *
 * @param {ScraperStatus} scraperStatus
 */
const scraperStatusChanged = (scraperStatus) => {
  dispatcher.dispatch({
    actionType: ActionTypes.SCRAPER_STATUS_CHANGED,
    data: { scraperStatus },
  });
};

const syncDownloads = () => {
  socket.sendMessage(SocketEvents.DOWNLOADS_SYNC_REQUESTED);
  dispatcher.dispatch({
    actionType: ActionTypes.DOWNLOADS_WAITING_FOR_SYNC,
    data: { isWaiting: true },
  });

  // In 5 seconds, stop waiting in despite of data received or not
  setTimeout(() => {
    dispatcher.dispatch({
      actionType: ActionTypes.DOWNLOADS_WAITING_FOR_SYNC,
      data: { isWaiting: false },
    });
  }, 5000);
};

/**
 * @param {Download[]} downloads
 */
const downloadsSyncReceived = (downloads) => {
  dispatcher.dispatch({
    actionType: ActionTypes.DOWNLOADS_SYNC_RECEIVED,
    data: { downloads },
  });
};

const jobsBatchScraped = (jobsBatch) => {
  dispatcher.dispatch({
    actionType: ActionTypes.JOBS_BATCH_SCRAPED,
    data: { jobsBatch },
  });
};

const backendStatusChanged = ({ backendConnected }) => {
  dispatcher.dispatch({
    actionType: ActionTypes.BACKEND_STATUS_CHANGED,
    data: { backendConnected },
  });
};

const locationUpdated = (location) => {
  dispatcher.dispatch({
    actionType: ActionTypes.LOCATION_UPDATED,
    data: { location },
  });
};

const scrapingSpeedDataReceived = (speedData) => {
  dispatcher.dispatch({
    actionType: ActionTypes.SCRAPING_SPEED_DATA_UPDATED,
    data: { speedData },
  });
};
const group = {
  statusReceived,
  requestStatus,
  sessIdReceived,
  scraperStatusChanged,
  syncDownloads,
  downloadsSyncReceived,
  backendStatusChanged,
  jobsBatchScraped,
  locationUpdated,
  scrapeLocationByTerm,
  scrapingSpeedDataReceived,
};
export default group;
