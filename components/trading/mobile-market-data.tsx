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

export function MobileMarketData() {
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
      <div className="md:hidden">
        <div className="block md:hidden w-full bg-white border-b border-gray-200 h-12 overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-700 font-medium text-[9px]">Loading market data...</span>
          </div>
        </div>
        <div className="border-b border-border"></div>
      </div>
    );
  }

  return (
    <div className="md:hidden">
      {error && (
        <div className="bg-yellow-100 border-b border-yellow-400 text-yellow-700 px-2 py-1 text-[8px]">
          <p className="font-bold">Warning</p>
          <p>{error}</p>
        </div>
      )}
      <div className="block md:hidden w-full bg-white border-b border-gray-200 h-12 overflow-hidden">
        <div className="flex items-center justify-between h-full">
          {marketData.map((coin) => (
            <div key={coin.symbol} className="flex flex-col items-center justify-center flex-1 h-full">
              <div className="flex items-center space-x-1 mb-1">
                {coin.icon && (
                  <Image 
                    src={coin.icon} 
                    alt={coin.symbol} 
                    className="size-2" 
                    width={8} 
                    height={8} 
                    onError={(e) => {
                      // Fallback to a default icon if the specific one fails to load
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/coins/default.svg";
                    }}
                  />
                )}
                <span className="text-gray-700 font-medium text-[9px]">{coin.symbol}</span>
              </div>
              <div className="font-mono text-gray-800 text-[9px] font-bold text-center leading-none">
                <span>${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              {coin.change !== undefined && (
                <div className={`text-[8px] ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.change >= 0 ? '↑' : '↓'} {Math.abs(coin.change).toFixed(2)}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-border"></div>
    </div>
  );
}