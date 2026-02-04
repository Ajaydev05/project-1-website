import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [metrics, setMetrics] = useState(null);

  const fetchMetrics = async () => {
    try {
      const res = await fetch("/api/metrics");
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error("Error fetching metrics:", err);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1>🚀 DevOps Live Monitoring Dashboard</h1>

      {!metrics ? (
        <p>Loading metrics...</p>
      ) : (
        <div className="grid">
          <div className="card">
            <h3>🕒 Server Time</h3>
            <p>{new Date(metrics.server_time).toLocaleTimeString()}</p>
          </div>

          <div className="card">
            <h3>⏱ Uptime</h3>
            <p>{metrics.uptime_seconds} sec</p>
          </div>

          <div className="card">
            <h3>📦 Requests Served</h3>
            <p>{metrics.requests_served}</p>
          </div>

          <div className="card">
            <h3>🖥 CPU Usage</h3>
            <div className="bar">
              <div
                className="fill cpu"
                style={{ width: `${metrics.cpu_usage_percent}%` }}
              ></div>
            </div>
            <p>{metrics.cpu_usage_percent}%</p>
          </div>

          <div className="card">
            <h3>💾 Memory Usage</h3>
            <div className="bar">
              <div
                className="fill memory"
                style={{ width: `${metrics.memory_usage_percent}%` }}
              ></div>
            </div>
            <p>{metrics.memory_usage_percent}%</p>
          </div>

          <div className="card">
            <h3>🚦 Deployment Status</h3>
            <p className="status">{metrics.deployment_status}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
