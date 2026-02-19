import { useState, useEffect, useRef } from "react";
import { SITE_CONFIG, SKILLS } from "../data/constants";

/**
 * TerminalBox - An interactive CLI 'playground' for the contact section.
 * Allows users to query portfolio info via commands.
 */
export default function TerminalBox() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "output", content: "Welcome to Brijesh-CLI v1.0.4" },
    { type: "output", content: "Type 'help' to see available commands." },
  ]);
  const [typingResponse, setTypingResponse] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll whenever history or typingResponse updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, typingResponse]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      setHistory((prev) => [...prev, { type: "input", content: input }]);
      setInput("");

      if (cmd === "clear") {
        setHistory([]);
        return;
      }

      let response = "";
      switch (cmd) {
        case "help":
          response =
            "Available: [name, expertise, contact, resume, hire, clear, help]";
          break;
        case "name":
          response = `Identity: ${SITE_CONFIG.name} // Role: ${SITE_CONFIG.title}`;
          break;
        case "expertise":
          response =
            "Core Stack: " + SKILLS.map((s) => s.skills.join(", ")).join(", ");
          break;
        case "contact":
          response = `Email: ${SITE_CONFIG.email} // LinkedIn: brijesh-v`;
          break;
        case "resume":
          response = "Fetching document... [Link: /resume.pdf] Access Granted.";
          break;
        case "hire":
          response =
            "Status: OPEN_FOR_OPPORTUNITIES // Focus: Backend Architecture";
          break;
        case "":
          return;
        default:
          response = `Command unknown: '${cmd}'. Type 'help' for options.`;
      }

      let i = 0;
      setTypingResponse("");
      const interval = setInterval(() => {
        setTypingResponse(response.slice(0, i + 1));
        i++;
        if (i >= response.length) {
          clearInterval(interval);
          setHistory((prev) => [
            ...prev,
            { type: "output", content: response },
          ]);
          setTypingResponse("");
        }
      }, 15);
    }
  };

  return (
    <div
      className="w-full max-w-xl mx-auto mb-10 bg-black/90 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl font-mono text-[11px] transition-all duration-300"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="bg-zinc-800 px-4 py-2 flex items-center justify-between border-b border-zinc-700">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
        <div className="text-zinc-500 uppercase tracking-widest font-bold opacity-60">
          Terminal_Access // {SITE_CONFIG.name.split(" ")[0].toUpperCase()}
        </div>
      </div>

      {/* Terminal Output Space */}
      <div
        ref={scrollRef}
        className="p-4 h-48 overflow-y-auto scrollbar-hide flex flex-col gap-1 text-zinc-300"
      >
        {history.map((entry, i) => (
          <div key={i} className="flex gap-2">
            {entry.type === "input" ? (
              <span className="text-emerald-500 shrink-0">
                guest@brijesh:~$
              </span>
            ) : (
              <span className="text-zinc-500 shrink-0 select-none">&gt;</span>
            )}
            <span className={entry.type === "output" ? "text-zinc-400" : ""}>
              {entry.content}
            </span>
          </div>
        ))}

        {typingResponse && (
          <div className="flex gap-2">
            <span className="text-zinc-500 shrink-0 select-none">&gt;</span>
            <span className="text-zinc-400">{typingResponse}</span>
            <span className="w-1.5 h-3 bg-zinc-500 animate-pulse my-auto" />
          </div>
        )}

        {/* Active Input Line */}
        {!typingResponse && (
          <div className="flex gap-2">
            <span className="text-emerald-500 shrink-0">guest@brijesh:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="bg-transparent border-none outline-none p-0 flex-1 text-zinc-300 pointer-events-auto"
              autoFocus
              spellCheck="false"
            />
          </div>
        )}
      </div>

      {/* Terminal Footer Info */}
      <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-1.5 flex justify-between text-[9px] text-zinc-600 uppercase tracking-tighter">
        <div className="flex gap-3">
          <span>Mode: Interactive</span>
          <span className="w-1 h-1 rounded-full bg-zinc-800 my-auto" />
          <span>Status: Online</span>
        </div>
        <div className="opacity-0 sm:opacity-100 flex gap-2">
          <span>{isFocused ? "[ FOCUSED ]" : "[ CLICK TO TYPE ]"}</span>
        </div>
      </div>
    </div>
  );
}
