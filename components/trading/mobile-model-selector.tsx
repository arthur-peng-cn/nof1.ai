"use client";

export function MobileModelSelector() {
  return (
    <div className="relative">
      <button className="terminal-header text-xs text-black hover:text-blue-600 flex items-center gap-1">
        MODELS
        <svg className="w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
  );
}