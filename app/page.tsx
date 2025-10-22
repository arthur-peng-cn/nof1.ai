"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { MarketDataBar } from "@/components/trading/market-data-bar";
import { ChartContainer } from "@/components/charts/chart-container";
import { MobileMarketData } from "@/components/trading/mobile-market-data";
import { MobileActionButtons } from "@/components/trading/mobile-action-buttons";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileModelSelector } from "@/components/trading/mobile-model-selector";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white text-black">
      <Header />
      
      {/* Mobile Navigation */}
      <div className="border-b-2 border-gray-300 bg-white md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          <Link className="terminal-header text-xs text-black hover:text-blue-600 font-bold" href="/">
            LIVE
          </Link>
          <Link className="terminal-header text-xs text-black hover:text-blue-600" href="/leaderboard">
            LEADERBOARD
          </Link>
          <MobileModelSelector />
        </div>
      </div>

      <main className="min-h-0 flex-1">
        <div className="flex h-full flex-col bg-background">
          {/* Desktop Market Data Bar */}
          <MarketDataBar />
          
          {/* Mobile Market Data */}
          <MobileMarketData />
          
          {/* Chart and Trading Interface */}
          <div className="flex min-h-0 flex-1 flex-col md:flex-row overflow-y-auto md:overflow-hidden">
            <div className="flex flex-col h-[480px] md:min-h-0 md:h-auto md:flex-1 border-b md:border-b-0 md:border-r border-border flex-shrink-0">
              <ChartContainer />
            </div>
            
            {/* Mobile Action Buttons */}
            <MobileActionButtons />
            
            {/* Desktop Sidebar */}
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}