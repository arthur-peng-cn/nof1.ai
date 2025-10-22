/**
 * NOF1.ai API Service
 * 
 * This service handles all API calls to the NOF1.ai platform.
 * The following endpoints are available:
 * - https://nof1.ai/api/since-inception-values
 * - https://nof1.ai/api/account-totals?lastHourlyMarker=99
 * - https://nof1.ai/api/crypto-prices
 * - https://nof1.ai/api/positions?limit=1000
 * - https://nof1.ai/api/trades
 */

// Define TypeScript interfaces for the API responses
export interface SinceInceptionValues {
  // Define the structure based on actual API response
  [key: string]: any;
}

export interface AccountTotals {
  // Define the structure based on actual API response
  [key: string]: any;
}

export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  timestamp: number;
  icon?: string;
}

export interface CryptoPricesResponse {
  prices: {
    [symbol: string]: {
      symbol: string;
      price: number;
      timestamp: number;
    };
  };
  serverTime: number;
}

// Position data interfaces
export interface ExitPlan {
  profit_target?: number;
  stop_loss?: number;
  invalidation_condition?: string;
}

export interface PositionDetails {
  entry_oid: number;
  risk_usd: number;
  confidence: number;
  index_col: any;
  exit_plan: ExitPlan | string;
  entry_time: number;
  symbol: string;
  entry_price: number;
  tp_oid: number;
  margin: number;
  wait_for_fill: boolean;
  sl_oid: number;
  oid: number;
  current_price: number;
  closed_pnl: number;
  liquidation_price: number;
  commission: number;
  leverage: number;
  slippage: number;
  quantity: number;
  unrealized_pnl: number;
}

export interface Position {
  id: string;
  positions: {
    [symbol: string]: PositionDetails;
  };
}

export interface PositionsResponse {
  positions: Position[];
  serverTime: number;
}

export interface Trade {
  // Define the structure based on actual API response
  [key: string]: any;
}

// Base API configuration
const API_BASE_URL = '/api/nof1'; // Use Next.js API routes to avoid CORS issues

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

// API service functions
export async function getSinceInceptionValues(): Promise<SinceInceptionValues> {
  return fetchAPI<SinceInceptionValues>('/since-inception-values');
}

export async function getAccountTotals(lastHourlyMarker: number = 99): Promise<AccountTotals> {
  return fetchAPI<AccountTotals>(`/account-totals?lastHourlyMarker=${lastHourlyMarker}`);
}

export async function getCryptoPrices(): Promise<CryptoPrice[]> {
  const response = await fetchAPI<CryptoPricesResponse>('/crypto-prices');
  
  // Transform the API response to the format expected by the UI components
  return Object.values(response.prices).map(item => ({
    symbol: item.symbol,
    name: getCoinName(item.symbol),
    price: item.price,
    change: 0, // The API doesn't provide change data, we'll need to calculate it or use a default
    timestamp: item.timestamp,
    icon: `/coins/${item.symbol.toLowerCase()}.svg`
  }));
}

export async function getPositions(limit: number = 1000): Promise<Position[]> {
  const response = await fetchAPI<PositionsResponse>(`/positions?limit=${limit}`);
  return response.positions;
}

export async function getTrades(): Promise<Trade[]> {
  return fetchAPI<Trade[]>('/trades');
}

// Helper function to get coin names based on symbols
function getCoinName(symbol: string): string {
  const coinNames: { [key: string]: string } = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'SOL': 'Solana',
    'BNB': 'Binance Coin',
    'DOGE': 'Dogecoin',
    'XRP': 'Ripple'
  };
  
  return coinNames[symbol] || symbol;
}

// Helper function to map crypto prices to the format used in the UI
export function mapCryptoPricesToMarketData(prices: CryptoPrice[]): any[] {
  // Map to the format used in MarketDataBar and MobileMarketData components
  return prices.map(price => ({
    symbol: price.symbol,
    name: price.name,
    price: price.price,
    change: price.change,
    icon: price.icon || `/coins/${price.symbol.toLowerCase()}.svg`
  }));
}