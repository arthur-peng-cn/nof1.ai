"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getCryptoPrices, CryptoPrice } from "@/lib/api/nof1-api";

// Mock data for cryptocurrency prices
const mockMarketData = [
  { symbol: "BTC", name: "Bitcoin", price: 95000.00, change: 2.5, icon: "/coins/btc.svg" },
  { symbol: "ETH", name: "Ethereum", price: 3500.00, change: 1.8, icon: "/coins/eth.svg" },
  { symbol: "SOL", name: "Solana", price: 180.00, change: 5.2, icon: "/coins/sol.svg" },
  { symbol: "BNB", name: "Binance Coin", price: 600.00, change: -0.3, icon: "/coins/bnb.svg" },
  { symbol: "DOGE", name: "Dogecoin", price: 0.3500, change: 10.1, icon: "/coins/doge.svg" },
  { symbol: "XRP", name: "Ripple", price: 0.50, change: 0.8, icon: "/coins/xrp.svg" },
];

export function MarketDataBar() {
  const [marketData, setMarketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const prices: CryptoPrice[] = await getCryptoPrices();
        setMarketData(prices);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch market data:", err);
        // Use mock data when API call fails
        setMarketData(mockMarketData);
        setError("Warning: Failed to load real-time data. Showing mock data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    
    // Set up polling to refresh data every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="hidden border-b-2 border-border bg-surface-elevated px-4 py-1 md:block">
        <div className="terminal-text flex items-center justify-between text-xs">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-center px-6 py-0.5">
                <span className="text-gray-700 font-medium">Loading market data...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden border-b-2 border-border bg-surface-elevated px-4 py-1 md:block">
      <div className="terminal-text flex items-center justify-between text-xs">
        {error && (
          <div className="absolute top-0 left-0 right-0 bg-yellow-100 border-b border-yellow-400 text-yellow-700 px-4 py-1 text-xs z-10">
            <p className="font-bold">Warning</p>
            <p>{error}</p>
          </div>
        )}
        <div className="flex items-center">
          <div className="flex items-center">
            {marketData.map((coin, index) => (
              <div key={coin.symbol} className="flex items-center">
                <div className="flex flex-col items-center px-6 py-0.5 text-xs">
                  <div className="flex items-center space-x-1 mb-0.5">
                    {coin.icon && (
                      <Image 
                        src={coin.icon} 
                        alt={coin.symbol} 
                        className="size-3" 
                        width={12} 
                        height={12} 
                        onError={(e) => {
                          // Fallback to a default icon if the specific one fails to load
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "/coins/default.svg";
                        }}
                      />
                    )}
                    <span className="text-gray-700 font-medium">{coin.symbol}</span>
                  </div>
                  <div className="font-mono text-gray-800 text-sm font-semibold flex items-baseline">
                    <span>$</span>
                    <span>{coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  {coin.change !== undefined && (
                    <div className={`text-xs ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {coin.change >= 0 ? '↑' : '↓'} {Math.abs(coin.change).toFixed(2)}%
                    </div>
                  )}
                </div>
                {index < marketData.length - 1 && (
                  <div className="w-px h-8 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-thin text-foreground-subtle">|</span>
        </div>
      </div>
    </div>
  );
}