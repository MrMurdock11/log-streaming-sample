import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/logs/stream");

    eventSource.onmessage = (event) => {
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="log-list-container">
      <h2 className="log-list-header">Log Messages</h2>
      {logs.length > 0 ? (
        <ul className="log-list">
          {logs.map((log, index) => (
            <li key={index} className="log-item">
              {/* <span className="log-date">{log}</span> -{" "} */}
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
