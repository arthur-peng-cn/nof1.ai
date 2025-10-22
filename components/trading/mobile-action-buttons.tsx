"use client";

export function MobileActionButtons() {
  return (
    <div className="md:hidden border-t-2 border-black bg-white">
      <div className="terminal-text text-center text-[10px] font-bold pt-2 pb-0.5">
        DETAILED VIEW
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 pt-5 pb-4">
        <button className="terminal-button-small mobile-button-gradient-blue border border-black flex items-center justify-between py-7 px-4 text-base whitespace-nowrap transition-all duration-200" style={{ lineHeight: 4 }}>
          <span>COMPLETED TRADES</span>
          <span className="ml-2">&gt;</span>
        </button>
        <button className="terminal-button-small mobile-button-gradient-purple border border-black flex items-center justify-between py-7 px-4 text-base whitespace-nowrap transition-all duration-200" style={{ lineHeight: 4 }}>
          <span>MODELCHAT</span>
          <span className="ml-2">&gt;</span>
        </button>
        <button className="terminal-button-small mobile-button-gradient-green border border-black flex items-center justify-between py-7 px-4 text-base whitespace-nowrap transition-all duration-200" style={{ lineHeight: 4 }}>
          <span>POSITIONS</span>
          <span className="ml-2">&gt;</span>
        </button>
        <button className="terminal-button-small mobile-button-gradient-orange border border-black flex items-center justify-between py-7 px-4 text-base whitespace-nowrap transition-all duration-200" style={{ lineHeight: 4 }}>
          <span>README.TXT</span>
          <span className="ml-2">&gt;</span>
        </button>
      </div>
    </div>
  );
}