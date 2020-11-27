import dispatcher from "../dispatcher";
import ActionTypes from "../Constants/ActionTypes";
import Download from "../Models/Download";
import JobsBatch from "../Models/JobsBatch";
import Location from "../Models/Location";
import { EventEmitter } from "events";
import { prettyTimelapse } from "../helpers";

class SnapshotConfigs extends EventEmitter {
  /**
   * @type {SnapshotConfigs[]}
   */
  #snapshotConfigs;

  constructor(params) {
    super(params);

    this.#snapshotConfigs = [];
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

  setSnapshotConfigs(locations) {
    this.#snapshotConfigs = locations;
  }

  locationUpdated(location) {
    const ind = this.#snapshotConfigs.findIndex(
      (loc) => loc.locationId === location.locationId
    );
    this.#snapshotConfigs[ind] = location;
  }
  getTable() {
    return (this.#snapshotConfigs || []).map((s) => {
      let el = s;
      s.id = s.uuid;
      return el;
    });
  }
}

const snapshotConfigStore = new SnapshotConfigs();

snapshotConfigStore.dispatchToken = dispatcher.register((event) => {
  let willEmitChange = true;
  switch (event.actionType) {
    case ActionTypes.FRONTEND_STATUS_RECEIVED:
      snapshotConfigStore.setSnapshotConfigs(event.data.status.snapshotConfigs);
      break;
    default:
      willEmitChange = false;
      break; // do nothing
  }

  willEmitChange &&
    snapshotConfigStore.emitChange(event.actionType, event.data);
});

export default snapshotConfigStore;
