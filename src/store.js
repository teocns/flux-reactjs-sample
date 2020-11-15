import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import ActionTypes from "../constants/ActionTypes";
import { sendMessage } from "../socket";

import Scraper from "./Models/Scraper";

class Store extends EventEmitter {
  /**
   * @type {Scraper[]}
   */
  #scrapers;

  #jobsScraped;

  constructor(params) {
    super(params);
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

  registerStatus({ scrapers, jobsScraped }) {
    this.#scrapers = scrapers;
    this.#jobsScraped = jobsScraped;
  }
}

const store = new Store();

store.dispatchToken = dispatcher.register((event) => {
  let willEmitChange = true;
  switch (event.actionType) {
    case ActionTypes.BACKEND_STATUS_RECEIVED:
      store.registerStatus(event.data.status);
      break;
    default:
      willEmitChange = false;
      break; // do nothing
  }

  willEmitChange && store.emitChange(event.actionType, event.data);
});

export default store;
