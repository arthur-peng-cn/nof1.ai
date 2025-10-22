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
  icon?: string;
}

export interface Position {
  // Define the structure based on actual API response
  [key: string]: any;
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
  return fetchAPI<CryptoPrice[]>('/crypto-prices');
}

export async function getPositions(limit: number = 1000): Promise<Position[]> {
  return fetchAPI<Position[]>(`/positions?limit=${limit}`);
}

export async function getTrades(): Promise<Trade[]> {
  return fetchAPI<Trade[]>('/trades');
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