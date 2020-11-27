import io from "socket.io-client";
import bindSocketHandler from "./socketHandler";

const initialize = () => {
  // Should be called once, maybe
  const sock = io("wss://backendbebee.teocns.com:443", {
    secure: true,
    reconnect: true,
    rejectUnauthorized: false,
    transports: ["websocket"],
    withCredentials: true,
  });

  bindSocketHandler(sock);
  // sock.on("connect", () => {
  //   console.log("connected ", sock.id);
  // });
  // Bind listeners

  return sock;
};

const socketInstance = initialize();

const sendMessage = (event, data) => {
  socketInstance.emit(event, data);
};

export default { socketInstance, sendMessage };
