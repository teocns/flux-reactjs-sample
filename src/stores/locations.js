import dispatcher from "../dispatcher";
import ActionTypes from "../Constants/ActionTypes";
import Download from "../Models/Download";
import JobsBatch from "../Models/JobsBatch";
import Location from "../Models/Location";
import { EventEmitter } from "events";
import { prettyTimelapse } from "../helpers";

class LocationsStore extends EventEmitter {
  /**
   * @type {Location[]}
   */
  #locations;
  /**
   * @type {boolean}
   */
  #LocationsSyncing;

  constructor(params) {
    super(params);
    this.#LocationsSyncing = false;
    this.#locations = [];
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

  setLocationsSyncing(isWaiting) {
    this.#LocationsSyncing = isWaiting;
  }
  getLocationsSyncing() {
    return this.#LocationsSyncing;
  }

  setLocations(locations) {
    this.#locations = locations;
  }

  locationUpdated(location) {
    const ind = this.#locations.findIndex(
      (loc) => loc.locationId === location.locationId
    );
    this.#locations[ind] = location;
  }
  getTable() {
    return (this.#locations || []).map((s) => {
      let loc = s;
      s.id = s.realId;
      return loc;
    });
  }

  getName(locationId) {
    const loc = this.#locations.find((c) => c.locationId === locationId);
    if (loc) {
      return loc.label;
    }
    return "";
  }
}

const locationsStore = new LocationsStore();

locationsStore.dispatchToken = dispatcher.register((event) => {
  let willEmitChange = true;
  switch (event.actionType) {
    case ActionTypes.FRONTEND_STATUS_RECEIVED:
      locationsStore.setLocations(event.data.status.locations);
      break;
    case ActionTypes.JOBS_BATCH_SCRAPED:
      locationsStore.jobsBatchScraped(event.data.jobsBatch);
      break;
    case ActionTypes.LOCATION_UPDATED:
      locationsStore.locationUpdated(event.data.location);
      break;
    default:
      willEmitChange = false;
      break; // do nothing
  }

  willEmitChange && locationsStore.emitChange(event.actionType, event.data);
});

export default locationsStore;
