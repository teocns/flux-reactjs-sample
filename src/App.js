import "./App.css";
import logo from "./logo.svg";

import MainView from "./Views/Main";
import socket from "./socket";
import SocketEvents from "./Constants/SocketEvents";

function App() {
  return (
    <div className="App">
      <MainView />
    </div>
  );
}

export default App;
