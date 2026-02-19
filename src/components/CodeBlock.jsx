import React from "react";

export default function CodeBlock({ code, language = "python" }) {
  if (!code) return null;

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-light-200">
      <div className="bg-light-200 px-4 py-2 border-b border-light-300 flex items-center justify-between">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          {language}
        </span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
        </div>
      </div>
      <pre className="p-4 bg-dark-900 text-light-200 text-xs font-mono overflow-x-auto leading-relaxed">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
