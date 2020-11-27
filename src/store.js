import dispatcher from "./dispatcher";
import ActionTypes from "./Constants/ActionTypes";
import Scraper from "./Models/Scraper";
import { sendMessage } from "./socket";
import { EventEmitter } from "events";
import SnapshotConfig from "./Models/SnapshotConfig";

class Store extends EventEmitter {
  /**
   * @type {bool}
   */
  #backendConnected;
  /**
   * @type {Scraper[]}
   */
  #scrapers;

  #jobsScraped;

  #scrapingSpeed;

  /**
   * @type {SnapshotConfig}
   */
  #snapshotConfigs;

  downloadsSyncing;

  addChangeListener(event, callback) {
    this.on(event, callback);
  }

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }

  emitChange(event, data) {
    this.emit(event, data);
  }

  setScrapingSpeedData({ age, scraped }) {
    let now = parseInt(new Date() / 1000);
    this.#scrapingSpeed = parseInt(scraped / ((now - age) / 60));
  }
  getScrapingSpeedData() {
    return this.#scrapingSpeed || 0;
  }

  registerStatus({ scrapers, jobsScraped, backendConnected, snapshotConfigs }) {
    this.#scrapers = scrapers;
    this.#jobsScraped = jobsScraped;
    this.#snapshotConfigs = snapshotConfigs;
    this.#backendConnected = backendConnected;
  }

  getScrapersTable() {
    return (this.#scrapers || []).map((s) => {
      let session = s.sessionData;
      try {
        session = JSON.stringify(s.sessionData);
      } catch (e) {}

      return {
        id: s.uuid,
        currentTask: s.currentTask,
        session,
        statusPretty: s.statusPretty,
      };
    });
  }
  setDownloadsSyncing(isWaiting) {
    this.downloadSyncing = isWaiting;
  }
  getDownloadsSyncing() {
    return this.downloadSyncing;
  }

  getBackendConnected() {
    return this.#backendConnected;
  }
  setBackendConnected(backendConnected) {
    console.log(backendConnected);
    this.#backendConnected = backendConnected;
  }
}

const store = new Store();

store.dispatchToken = dispatcher.register((event) => {
  let willEmitChange = true;
  switch (event.actionType) {
    case ActionTypes.FRONTEND_STATUS_RECEIVED:
      store.registerStatus(event.data.status);
      break;
    case ActionTypes.BACKEND_STATUS_CHANGED:
      store.setBackendConnected(event.data.backendConnected);
      break;
    case ActionTypes.SCRAPING_SPEED_DATA_UPDATED:
      store.setScrapingSpeedData(event.data.speedData);
      break;
    default:
      willEmitChange = false;
      break; // do nothing
  }

  willEmitChange && store.emitChange(event.actionType, event.data);
});

export default store;
