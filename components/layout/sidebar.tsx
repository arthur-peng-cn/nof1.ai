"use client";

import { useState } from "react";

export function Sidebar() {
  const [activeTab, setActiveTab] = useState("trades");

  const tabs = [
    { id: "trades", label: "COMPLETED TRADES" },
    { id: "chat", label: "MODELCHAT" },
    { id: "positions", label: "POSITIONS" },
    { id: "readme", label: "README.TXT" },
  ];

  return (
    <div className="hidden md:block md:w-[280px] lg:w-[320px] xl:w-[380px] 2xl:w-[500px] flex-shrink-0 md:border-l border-border bg-surface overflow-y-auto md:overflow-hidden">
      <div className="flex h-full min-h-0 flex-col">
        <div className="mb-1 flex border-b-2 border-t md:border-t-0 border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`terminal-text flex-1 border-r-2 border-border px-3 py-0.5 md:py-2 text-[8px] md:text-[10px] ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="min-h-0 flex-1">
          <div className="live-trades terminal-text flex h-full min-h-0 flex-1 flex-col overflow-hidden font-mono text-xs font-black">
            <div className="terminal-positive space-y-1 p-2">
              <div className="flex items-center space-x-2">
                <span className="terminal-positive">&gt;</span>
                <span>
                  <div style={{ display: "inline-block" }}></div>
                  <span
                    style={{
                      display: "inline-block",
                      msTransition: "opacity 0.5s",
                      WebkitTransition: "opacity 0.5s",
                      MozTransition: "opacity 0.5s",
                      transition: "opacity 0.5s",
                      opacity: 1,
                    }}
                  >
                    |
                  </span>
                </span>
              </div>
              <div className="ml-4 flex items-center space-x-2">
                <span className="terminal-warning">[</span>
                <span className="animate-pulse">████████████</span>
                <span className="terminal-warning">]</span>
              </div>
              <div className="ml-4 flex items-center space-x-2">
                <span className="terminal-blue">STATUS: CONNECTING TO SERVER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}