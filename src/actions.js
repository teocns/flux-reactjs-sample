import store from "./store";
import dispatcher from "./dispatcher";
import ActionTypes from "./constants/ActionTypes";


import BackendStatus from "./Models/BackendStatus"

const statusReceived = (status) => {
  dispatcher.dispatch({
    actionType: ActionTypes.STATUS_RECEIVED,
    data: { status: new BackendStatus(status)},
  });
};

export default { statusReceived };
