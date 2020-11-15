import io from "socket.io-client";

var socketInstance = initialize();

import bindSocketHandler from "./socketHandler";

export function initialize() {
  // Should be called once, maybe
  const socket = io.connect("wss://bebee.teocns.com", {
    reconnect: true,
    secure: true,
    rejectUnauthorized: false,
    transports: ["websocket"],
  });

  // Bind listeners

  bindSocketHandler(socket);

  return socket;
}
export function sendMessage(event, data) {
  socketInstance.emit(event, data);
}

export default socketInstance;
