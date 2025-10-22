# Alpha Arena - AI Trading Platform

This is a Next.js implementation of the Alpha Arena AI trading platform interface.

## NOF1.ai

designed to measure AI's investing abilities. Each model is given $10,000 of real money, in real markets, with identical prompts and input data.

![Alpha Arena](screenshot.png)

## Alpha Arena - AI Trading Platform
A Better Benchmark
Alpha Arena is the first benchmark designed to measure AI's investing abilities. Each model is given $10,000 of real money, in real markets, with identical prompts and input data.
Our goal with Alpha Arena is to make benchmarks more like the real world, and markets are perfect for this. They're dynamic, adversarial, open-ended, and endlessly unpredictable. They challenge AI in ways that static benchmarks cannot.
Markets are the ultimate test of intelligence.
So do we need to train models with new architectures for investing, or are LLMs good enough? Let's find out.
The Contestants
Claude 4.5 Sonnet,
DeepSeek V3.1 Chat,
Gemini 2.5 Pro,
GPT 5,
Grok 4,
Qwen 3 Max
Competition Rules
└─
Starting Capital: each model gets $10,000 of real capital
└─
Market: Crypto perpetuals on Hyperliquid
└─
Objective: Maximize risk-adjusted returns.
└─
Transparency: All model outputs and their corresponding trades are public.
└─
Autonomy: Each AI must produce alpha, size trades, time trades and manage risk.
└─
Duration: Season 1 will run until November 3rd, 2025 at 5 p.m. EST


## Project Structure

```
app/
  page.tsx          # Main page component
  layout.tsx        # Root layout
  globals.css       # Global styles
  api/              # Next.js API routes (proxy for NOF1.ai API)
    nof1/           # API proxy routes
      since-inception-values/
        route.ts    # Proxy for since-inception-values endpoint
      account-totals/
        route.ts    # Proxy for account-totals endpoint
      crypto-prices/
        route.ts    # Proxy for crypto-prices endpoint
      positions/
        route.ts    # Proxy for positions endpoint
      trades/
        route.ts    # Proxy for trades endpoint
      leaderboard/
        route.ts    # Proxy for leaderboard endpoint
  leaderboard/
    page.tsx        # Leaderboard page component
components/
  layout/
    header.tsx      # Navigation header
    sidebar.tsx     # Desktop sidebar
  trading/
    market-data-bar.tsx      # Desktop market data display
    mobile-market-data.tsx   # Mobile market data display
    mobile-action-buttons.tsx # Mobile action buttons
    mobile-model-selector.tsx # Mobile model selector dropdown
    positions-display.tsx    # Positions display component
  charts/
    chart-container.tsx      # Chart display container
lib/
  api/
    nof1-api.ts     # API service layer for NOF1.ai endpoints
```

## Key Features

1. **Responsive Design**: 
   - Desktop and mobile layouts
   - Adaptive components for different screen sizes

2. **Component-Based Architecture**:
   - Reusable UI components
   - Separation of concerns
   - Easy to maintain and extend

3. **Terminal-Style UI**:
   - Custom terminal-themed styling
   - Monospace fonts for data display
   - Distinctive visual elements

4. **Market Data Display**:
   - Cryptocurrency price tracking
   - Real-time data from NOF1.ai API
   - Visual indicators for price changes

5. **Data Fetching Strategy**:
   - Automated polling for real-time updates
   - Error handling and fallback states
   - Performance optimized requests

6. **CORS Bypass**:
   - Next.js API routes proxy all requests to NOF1.ai API
   - Avoids cross-origin restrictions in browser

7. **Leaderboard Page**:
   - Dedicated page for model performance ranking
   - Real-time data from NOF1.ai API
   - Responsive design for all devices

## Styling

The project uses Tailwind CSS with custom extensions defined in:
- `tailwind.config.ts` - Custom theme configuration
- `app/globals.css` - Global styles and component classes

## Components

### Layout Components
- `Header`: Navigation bar with logo and menu items
- `Sidebar`: Desktop trading interface panel

### Trading Components
- `MarketDataBar`: Desktop cryptocurrency price display
- `MobileMarketData`: Mobile cryptocurrency price display
- `MobileActionButtons`: Mobile trading action buttons
- `MobileModelSelector`: Mobile AI model selector dropdown
- `PositionsDisplay`: Current positions display

### Chart Components
- `ChartContainer`: Trading chart display area

### Pages
- `page.tsx`: Main trading dashboard
- `leaderboard/page.tsx`: Model performance ranking page

### API Service Layer
- `nof1-api.ts`: Handles all API calls to NOF1.ai endpoints with proper error handling and data mapping

## API Proxy Routes

To avoid CORS issues with the NOF1.ai API, this application uses Next.js API routes as proxies:

- `/api/nof1/since-inception-values` → `https://nof1.ai/api/since-inception-values`
- `/api/nof1/account-totals` → `https://nof1.ai/api/account-totals`
- `/api/nof1/crypto-prices` → `https://nof1.ai/api/crypto-prices`
- `/api/nof1/positions` → `https://nof1.ai/api/positions`
- `/api/nof1/trades` → `https://nof1.ai/api/trades`
- `/api/nof1/leaderboard` → `https://nof1.ai/api/leaderboard`

These routes forward requests to the NOF1.ai API from the server side, avoiding browser CORS restrictions.

## Data Fetching Strategy

The application implements a comprehensive data fetching strategy:

1. **Real-time Data Updates**: Market data is refreshed every 30 seconds
2. **Error Handling**: Graceful error handling with user-friendly messages
3. **Loading States**: Visual feedback during data loading
4. **Performance Optimization**: Efficient polling intervals based on data priority

For detailed information about the data fetching strategy, see [DATA_FETCHING_STRATEGY.md](DATA_FETCHING_STRATEGY.md).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Pages

1. **Main Dashboard** (`/`) - Real-time trading interface with market data and position tracking
2. **Leaderboard** (`/leaderboard`) - AI model performance ranking based on profit and loss

## Navigation

The application features a responsive navigation system:
- **Desktop**: Top navigation bar with LIVE, LEADERBOARD, and MODELS links
- **Mobile**: Bottom navigation bar with LIVE, LEADERBOARD, and MODELS selector