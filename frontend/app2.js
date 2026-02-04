import { useEffect, useState } from "react";
import "./app.css";

function App() {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchMetrics = async () => {
    const res = await fetch("/api/metrics");
    const data = await res.json();
    setMetrics(data);
  };

  const fetchHistory = async () => {
    const res = await fetch("/api/history");
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchMetrics();
    fetchHistory();

    const interval = setInterval(() => {
      fetchMetrics();
      fetchHistory();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1>🚀 Real-Time DevOps Monitoring</h1>

      {metrics && (
        <div className="grid">
          <div className="card">
            <h3>Uptime</h3>
            <p>{metrics.uptime_seconds}s</p>
          </div>

          <div className="card">
            <h3>Requests</h3>
            <p>{metrics.requests_served}</p>
          </div>

          <div className="card">
            <h3>CPU</h3>
            <p>{metrics.cpu_usage_percent}%</p>
          </div>

          <div className="card">
            <h3>Memory</h3>
            <p>{metrics.memory_usage_percent}%</p>
          </div>

          <div className="card">
            <h3>Status</h3>
            <p>{metrics.deployment_status}</p>
          </div>
        </div>
      )}

      <h2>📊 Last 10 Records</h2>

      <div className="history">
        {history.map((item, index) => (
          <div key={index} className="history-card">
            <p>CPU: {item.cpu_usage_percent}%</p>
            <p>Memory: {item.memory_usage_percent}%</p>
            <p>Status: {item.deployment_status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default app2;
