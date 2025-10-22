"use client";

export function ChartContainer() {
  return (
    <div className="relative flex-1 overflow-hidden" data-chart-container="true">
      <div className="relative flex h-full w-full flex-col">
        <div className="flex min-h-0 w-full flex-1 flex-col">
          <div className="relative -mt-4 flex min-h-0 flex-1 justify-center overflow-hidden transition-opacity duration-200 px-0.5 md:px-1 opacity-100">
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">
                  Loading Chart Data...
                </h3>
                <p className="text-sm text-foreground-muted sm:text-base">
                  <span>
                    <div style={{ display: "inline-block" }}></div>
                    <span 
                      style={{
                        display: "inline-block",
                        msTransition: "opacity 0.5s",
                        WebkitTransition: "opacity 0.5s",
                        MozTransition: "opacity 0.5s",
                        transition: "opacity 0.5s",
                        opacity: 1
                      }}
                    >
                      |
                    </span>
                  </span>
                </p>
              </div>
            </div>
            
            {/* Mobile Chart Controls */}
            <div className="absolute left-1/2 bottom-1 -translate-x-1/2 transform md:hidden z-10">
              <div className="flex border-collapse border border-black bg-white text-[6px] md:text-sm w-fit">
                <button className="terminal-button-small border-collapse border-r border-black whitespace-nowrap flex-shrink-0 active">
                  ALL
                </button>
                <button className="terminal-button-small border-collapse border-r border-black whitespace-nowrap flex-shrink-0">
                  72H
                </button>
              </div>
            </div>
          </div>
          
          {/* Desktop Chart Controls */}
          <div className="absolute right-1 top-1 md:right-2 md:top-2 z-10 hidden md:block">
            <div className="flex border-collapse border border-black bg-white text-[6px] md:text-sm w-fit">
              <button className="terminal-button-small border-collapse border-r border-black whitespace-nowrap flex-shrink-0 active">
                ALL
              </button>
              <button className="terminal-button-small border-collapse border-r border-black whitespace-nowrap flex-shrink-0">
                72H
              </button>
            </div>
          </div>
          
          <div className="absolute left-1 top-1 md:left-2 md:top-2 z-10 hidden md:block">
            <div className="flex border border-black bg-white text-[6px] md:text-sm w-fit">
              <button className="terminal-button-small border-r border-black px-1 py-0.5 whitespace-nowrap flex-shrink-0 active">
                $
              </button>
              <button className="terminal-button-small px-1 py-0.5 whitespace-nowrap flex-shrink-0">
                %
              </button>
            </div>
          </div>
          
          <div className="absolute left-1/2 top-1 md:top-2 z-10 -translate-x-1/2 transform">
            <div className="flex flex-row items-center gap-2">
              <h2 className="terminal-text text-xs md:text-sm font-bold text-black">
                TOTAL ACCOUNT VALUE
              </h2>
            </div>
          </div>
          
          <div className="flex-shrink-0 bg-white hidden md:block"></div>
        </div>
      </div>
    </div>
  );
}