import { useState, useEffect, useRef } from "react";

const BOOT_LOGS = [
  "INITIALIZING KERNEL v4.1.2-PORTFOLIO...",
  "ATTACHING DISK /dev/sda1 (Brijesh-Portfolio)...",
  "MOUNTING FILE SYSTEMS: [OK]",
  "ESTABLISHING SECURE SSH TUNNEL...",
  "AUTHENTICATING USER: B_VISHWAKARMA...",
  "IMPORTING PRINCIPLES.md...",
  "LOADING CORE MODULES: [FASTAPI, POSTGRES, DOCKER]",
  "SCANNING FOR POTENTIAL BUGS... [NONE FOUND]",
  "OPTIMIZING SYSTEM THROUGHPUT...",
  "STARTING WEB SERVER ON PORT 5173...",
  "READY FOR INTERACTION.",
];

const QUICK_LOGS = [
  "SYSTEM CACHE DETECTED: [OK]",
  "ALL PACKAGES ALREADY INSTALLED.",
  "RESTORING SESSION DATA...",
  "READY TO VIEW.",
  "THE SITE IS NOW LIVE",
];

export default function TerminalLoader({ onComplete, isReload }) {
  const [logs, setLogs] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef(null);

  const activeLogs = isReload ? QUICK_LOGS : BOOT_LOGS;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, currentLine]);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let tempLogs = [];

    const typeEffect = setInterval(
      () => {
        if (lineIndex < activeLogs.length) {
          const fullLine = activeLogs[lineIndex];

          if (charIndex < fullLine.length) {
            // Typing out the current line
            setCurrentLine(fullLine.substring(0, charIndex + 1));
            charIndex++;
          } else {
            // Line finished, move to next
            tempLogs.push(fullLine);
            setLogs([...tempLogs]);
            setCurrentLine("");
            lineIndex++;
            charIndex = 0;
            setProgress((lineIndex / activeLogs.length) * 100);
          }
        } else {
          clearInterval(typeEffect);
          setTimeout(
            () => {
              onComplete();
            },
            isReload ? 300 : 400,
          );
        }
      },
      isReload ? 5 : 12,
    ); // Balanced speed: Keep reload readable, make boot snappier

    return () => clearInterval(typeEffect);
  }, [onComplete, isReload]);

  return (
    <div className="fixed inset-0 z-9999 bg-black flex items-center justify-center p-4 sm:p-8 font-mono overflow-hidden">
      <div className="w-full max-w-2xl bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="bg-zinc-800 px-4 py-2 flex items-center justify-between border-b border-zinc-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
          </div>
          <div className="text-[10px] text-zinc-500 tracking-widest uppercase font-bold">
            System Initialization
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={scrollRef}
          className="p-6 h-[400px] overflow-y-auto scrollbar-hide flex flex-col justify-end"
        >
          <div className="space-y-1.5 min-h-0">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-zinc-600 select-none shrink-0">
                  [{new Date().toLocaleTimeString("en-GB")}]
                </span>
                <span
                  className={
                    log?.includes("[OK]") || log?.includes("READY")
                      ? "text-emerald-400"
                      : "text-zinc-300"
                  }
                >
                  {log}
                </span>
              </div>
            ))}
            {currentLine && (
              <div className="flex gap-3 text-sm">
                <span className="text-zinc-600 select-none shrink-0">
                  [{new Date().toLocaleTimeString("en-GB")}]
                </span>
                <span className="text-zinc-300">{currentLine}</span>
                <span className="text-emerald-400 animate-pulse">_</span>
              </div>
            )}
            {!currentLine && logs.length < activeLogs.length && (
              <div className="flex gap-3 text-sm">
                <span className="text-zinc-600 select-none shrink-0">
                  [{new Date().toLocaleTimeString("en-GB")}]
                </span>
                <span className="text-emerald-400 animate-pulse">_</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="bg-zinc-900 border-t border-zinc-800 px-6 py-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
              Initialization Progress
            </span>
            <span className="text-xs text-zinc-400 font-bold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
