import { PositionsDisplay } from "@/components/trading/positions-display";

export function Sidebar() {
  return (
    <div className="hidden w-80 flex-col border-l border-border bg-surface p-4 md:flex">
      <div className="mb-6">
        <h2 className="terminal-header mb-3 border-b border-border-subtle pb-2 text-lg font-bold text-foreground">
          TRADING TERMINAL
        </h2>
        <div className="space-y-4">
          <div>
            <label className="terminal-text mb-1 block text-xs font-medium text-foreground-subtle">
              MODEL SELECTOR
            </label>
            <select className="terminal-input w-full rounded border border-border bg-background p-2 text-sm">
              <option>deepseek-chat-v3.1</option>
              <option>claude-sonnet-4-5</option>
              <option>gpt-5</option>
              <option>gemini-2.5-pro</option>
              <option>qwen3-max</option>
              <option>grok-4</option>
            </select>
          </div>
          
          <div>
            <label className="terminal-text mb-1 block text-xs font-medium text-foreground-subtle">
              POSITION SIZE ($)
            </label>
            <input 
              type="number" 
              defaultValue="1000" 
              className="terminal-input w-full rounded border border-border bg-background p-2 text-sm"
            />
          </div>
          
          <div className="flex space-x-2">
            <button className="terminal-button flex-1 rounded border border-green-500 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-500/20">
              LONG
            </button>
            <button className="terminal-button flex-1 rounded border border-red-500 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-500/20">
              SHORT
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <PositionsDisplay />
      </div>
    </div>
  );
}