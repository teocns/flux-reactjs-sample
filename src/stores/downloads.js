import dispatcher from "../dispatcher";
import ActionTypes from "../Constants/ActionTypes";
import Download from "../Models/Download";

import { EventEmitter } from "events";
import { prettyTimelapse } from "../helpers";

class DownloadsStore extends EventEmitter {
  /**
   * @type {Download[]}
   */
  #downloads;
  /**
   * @type {boolean}
   */
  #downloadsSyncing;
  constructor(params) {
    super(params);
    this.#downloadsSyncing = false;
    this.#downloads = [];
  }
  addChangeListener(event, callback) {
    this.on(event, callback);
  }

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }

  emitChange(event, data) {
    this.emit(event, data);
  }

  setDownloadsSyncing(isWaiting) {
    this.#downloadsSyncing = isWaiting;
  }
  getDownloadsSyncing() {
    return this.#downloadsSyncing;
  }

  /**
   * @param {Download[]} downloads
   */
  setAvailableDownloads(downloads) {
    this.#downloads = downloads;
  }

  getTable() {
    return this.#downloads.map((s) => {
      return {
        id: s.uuid,
        description: s.description,
        size: s.size,
        url: s.url,
        age: prettyTimelapse(s.age._seconds),
      };
    });
  }
}

const downloadsStore = new DownloadsStore();

downloadsStore.dispatchToken = dispatcher.register((event) => {
  let willEmitChange = true;
  switch (event.actionType) {
    case ActionTypes.DOWNLOADS_WAITING_FOR_SYNC:
      downloadsStore.setDownloadsSyncing(event.data.isWaiting);
      break;
    case ActionTypes.DOWNLOADS_SYNC_RECEIVED:
      downloadsStore.setDownloadsSyncing(false);
      downloadsStore.setAvailableDownloads(event.data.downloads);
      break;
    case ActionTypes.FRONTEND_STATUS_RECEIVED:
      downloadsStore.setAvailableDownloads(event.data.status.downloads);
      break;
    default:
      willEmitChange = false;
      break; // do nothing
  }

  willEmitChange && downloadsStore.emitChange(event.actionType, event.data);
});

export default downloadsStore;
