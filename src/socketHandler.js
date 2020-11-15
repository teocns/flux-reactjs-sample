import dispatcher from "../dispatcher";

import actions from "./actions";

import SocketEvents from "./constants/SocketEvents";

const bindSessionSocketHandler = (socket) => {
  socket.on(SocketEvents.STATUS_RECEIVED, (backendStatus) => {
    actions.statusReceived(backendStatus);
  });
};

export default bindSessionSocketHandler;
