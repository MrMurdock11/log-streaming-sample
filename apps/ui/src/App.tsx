import { useCallback, useState } from "react";
import { useEventSource } from "./common/hooks/useEventSource";
import "./App.css";

const App = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const handleMessage = useCallback((event: MessageEvent) => {
    setLogs((prevLogs) => [...prevLogs, event.data]);
  }, []);

  useEventSource("http://localhost:3000/logs/stream", {
    onMessage: handleMessage,
  });

  return (
    <div className="log-list-container">
      <h2 className="log-list-header">Log Messages</h2>
      {logs.length > 0 ? (
        <ul className="log-list">
          {logs.map((log, index) => (
            <li key={index} className="log-item">
              <span className="log-message">{log}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>No logs yet.</div>
      )}
    </div>
  );
};

export default App;
