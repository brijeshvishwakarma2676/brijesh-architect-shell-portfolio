import { useState, useEffect } from "react";

/**
 * SystemMonitor - A backend-themed "live status" display for the footer.
 * Shows mock system health metrics to reinforce the backend engineering identity.
 */
export default function SystemMonitor() {
  const [latency, setLatency] = useState(12);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toISOString().replace("T", " ").slice(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const latencyInterval = setInterval(() => {
      setLatency((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(8, Math.min(24, prev + delta));
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(latencyInterval);
    };
  }, []);

  const regions = [
    { name: "AP-South", status: "operational" },
    { name: "US-East", status: "operational" },
    { name: "EU-West", status: "operational" },
  ];

  return (
    <div className="system-monitor">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-bold text-dark-700 uppercase tracking-widest">
          System Status
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
            Uptime
          </span>
          <span className="text-sm font-bold text-emerald-600">99.97%</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
            Avg Latency
          </span>
          <span className="text-sm font-bold text-dark-900">{latency}ms</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
            Status
          </span>
          <span className="text-sm font-bold text-emerald-600 underline underline-offset-4 decoration-emerald-200">
            Healthy
          </span>
        </div>
      </div>

      {/* Region Status */}
      <div className="space-y-1">
        {regions.map((region) => (
          <div
            key={region.name}
            className="flex items-center justify-between text-[10px] p-1.5 bg-light-100/50 border-l-2 border-transparent hover:border-emerald-500 transition-colors"
          >
            <span className="font-mono text-zinc-500 uppercase">
              {region.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-zinc-600 font-medium">Stable</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
            </div>
          </div>
        ))}
      </div>

      {/* Timestamp */}
      <div className="mt-4 pt-3 border-t border-light-200">
        <span className="text-[10px] font-mono text-zinc-400">{timestamp}</span>
      </div>
    </div>
  );
}
