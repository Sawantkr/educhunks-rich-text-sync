import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const frameA = useRef(null);
  const frameB = useRef(null);

  const [logs, setLogs] = useState([]);
  const [sync, setSync] = useState(false);

  const ALLOWED_ORIGIN = window.location.origin;

  const addLog = (source, target, action) => {
    const time = new Date().toLocaleTimeString();

    setLogs((prev) => [
      {
        time,
        source,
        target,
        action,
      },
      ...prev,
    ].slice(0, 50));
  };

  useEffect(() => {
    let syncTimer;

    const handleMessage = (event) => {
      if (event.origin !== ALLOWED_ORIGIN) return;

      const payload = event.data;

      if (!payload || payload.type !== "FORMAT_SYNC") {
        return;
      }

      if (
        frameA.current &&
        frameB.current &&
        event.source === frameA.current.contentWindow
      ) {
        frameB.current.contentWindow.postMessage(
          payload,
          ALLOWED_ORIGIN
        );

        if (payload.action !== "typing") {
          addLog(
            "Frame A",
            "Frame B",
            payload.action
          );
        }
      } 
      else if (
        frameA.current &&
        frameB.current &&
        event.source === frameB.current.contentWindow
      ) {
        frameA.current.contentWindow.postMessage(
          payload,
          ALLOWED_ORIGIN
        );

        if (payload.action !== "typing") {
          addLog(
            "Frame B",
            "Frame A",
            payload.action
          );
        }
      }

      setSync(true);

      clearTimeout(syncTimer);

      syncTimer = setTimeout(() => {
        setSync(false);
      }, 600);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      clearTimeout(syncTimer);
      window.removeEventListener(
        "message",
        handleMessage
      );
    };
  }, []);

  return (
    <div className="container">
      <h1>Bidirectional Rich Text Sync</h1>

      <p className="subtitle">
        Real-time bidirectional rich text synchronization
        using iframe communication and the postMessage API.
      </p>

      {sync && (
        <div className="sync">
          🟢 Sync Event Fired
        </div>
      )}

      <div className="frames">
        <div className="frame-card">
          <div className="frame-title">
            Frame A
          </div>

          <iframe
            title="Frame A"
            ref={frameA}
            src="/editor.html"
          />
        </div>

        <div className="frame-card">
          <div className="frame-title">
            Frame B
          </div>

          <iframe
            title="Frame B"
            ref={frameB}
            src="/editor.html"
          />
        </div>
      </div>

      <div className="logs">
        <h2>Action Log</h2>

        <div className="log-container">
          {logs.length === 0 ? (
            <div className="no-log">
              No formatting events yet
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                className="log-item"
              >
                <strong>{log.time}</strong>

                <br />

                {log.source}
                {" → "}
                {log.target}
                {" | "}
                <strong>{log.action}</strong>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;