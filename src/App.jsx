import { useEffect, useState } from "react";
import liff from "@line/liff";
import Login from './components/Login'
import Logout from './components/Logout'
import CustomAction from './components/CustomAction'
import Scan from './components/Scan'
import ServiceMessage from './components/ServiceMessage'
import ShareTargetPicker from './components/ShareTargetPicker'
import Stamps from "./components/Stamps";
import ScanButton from "./components/ScanButton";
import "./App.css";
import "./index.css";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [scanCounter, setScanCounter] = useState(0)

  const increment = () => {
    setScanCounter(scanCounter + 1)
  }
  console.log(scanCounter)

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
      })
      .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  });

  return (
    <div className="App">
      <div className="original-app">
        <h1>create-liff-app</h1>
        {message && <p>{message}</p>}
        {error && (
          <p>
            <code>{error}</code>
          </p>
        )}
        <a
          href="https://developers.line.biz/ja/docs/liff/"
          target="_blank"
          rel="noreferrer"
        >
          LIFF Documentation
        </a>

      </div>
      <div id="userIdDisplay"></div>
      <div className="test">
        <h2>Stamp A Weasel</h2>
        <Stamps scanCounter={scanCounter} />
        <div className="btn-list">
          <button className="" onClick={Login}>
          Login
          </button>
          <button className="" onClick={Logout}>
          Logout
          </button>
          <button className="" onClick={ShareTargetPicker}>
          Share Target Picker
          </button>
          <ScanButton onPress={increment} scanCounter={scanCounter} />
          <button className="" onClick={CustomAction}>
          Custom Action
          </button>
          <button className="" onClick={ServiceMessage}>
          Service Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
