# 页面数据获取规则与策略

## 概述

本文档定义了NOF1.ai交易平台页面的数据获取规则和策略，包括API接口使用、数据更新频率、错误处理和缓存策略。

## API接口分析

根据提供的API接口，我们有以下可用的数据端点：

1. **/api/since-inception-values** - 获取成立以来的数值数据
2. **/api/account-totals?lastHourlyMarker=99** - 获取账户总计数据
3. **/api/crypto-prices** - 获取加密货币价格数据
4. **/api/positions?limit=1000** - 获取持仓数据
5. **/api/trades** - 获取交易数据
6. **/api/leaderboard** - 获取排行榜数据

## CORS问题解决方案

为了避免浏览器的跨域资源共享(CORS)限制，本项目使用Next.js API路由作为代理：

- 前端请求发送到本地Next.js API路由（如`/api/nof1/crypto-prices`）
- Next.js服务器端API路由再转发请求到实际的NOF1.ai API端点
- 由于服务器端请求不受CORS限制，可以成功获取数据

这种方法的优势：
1. 避免浏览器CORS限制
2. 保持前端代码简洁
3. 提供统一的错误处理点

## 数据结构说明

### 1. 加密货币价格数据结构

```json
{
  "prices": {
    "BTC": {
      "symbol": "BTC",
      "price": 108286.5,
      "timestamp": 1761101085670
    },
    "ETH": {
      "symbol": "ETH",
      "price": 3864.15,
      "timestamp": 1761101085670
    }
  },
  "serverTime": 1761101085670
}
```

### 2. 持仓数据结构

持仓数据包含多个模型的持仓信息，每个模型可能持有多币种仓位：

```json
{
  "positions": [
    {
      "id": "model_name",
      "positions": {
        "BTC": {
          "entry_price": 106848.5,
          "current_price": 108264.5,
          "quantity": 0.09355,
          "unrealized_pnl": 132.46679999999998,
          "leverage": 1,
          "confidence": 0.62,
          "exit_plan": {
            "profit_target": 2.6485,
            "stop_loss": 2.1877
          }
        }
      }
    }
  ],
  "serverTime": 1761101618869
}
```

### 3. 排行榜数据结构

排行榜数据包含各AI模型的性能排名：

```json
{
  "leaderboard": [
    {
      "id": 1,
      "model": "deepseek-chat-v3.1",
      "totalPnl": 1245.32,
      "winRate": 68.5,
      "trades": 142
    },
    {
      "id": 2,
      "model": "claude-sonnet-4-5",
      "totalPnl": 987.45,
      "winRate": 62.3,
      "trades": 138
    }
  ],
  "serverTime": 1761101618869
}
```

## 数据获取策略

### 1. 加密货币价格数据 (/api/crypto-prices)

- **用途**: 在MarketDataBar和MobileMarketData组件中显示实时价格
- **更新频率**: 每30秒轮询一次
- **缓存策略**: 无缓存，实时获取
- **错误处理**: 显示错误消息，继续轮询
- **数据格式**:
  ```typescript
  interface CryptoPrice {
    symbol: string;
    name: string;
    price: number;
    change: number;
    timestamp: number;
    icon?: string;
  }
  ```

### 2. 账户总计数据 (/api/account-totals)

- **用途**: 在账户信息区域显示
- **更新频率**: 每分钟轮询一次
- **缓存策略**: 无缓存，实时获取
- **错误处理**: 显示错误消息，继续轮询

### 3. 持仓数据 (/api/positions)

- **用途**: 在交易面板显示当前持仓
- **更新频率**: 每分钟轮询一次
- **缓存策略**: 无缓存，实时获取
- **错误处理**: 显示错误消息，继续轮询
- **数据结构**:
  ```typescript
  interface Position {
    id: string; // 模型ID
    positions: {
      [symbol: string]: PositionDetails;
    };
  }
  
  interface PositionDetails {
    entry_price: number;
    current_price: number;
    quantity: number;
    unrealized_pnl: number;
    leverage: number;
    confidence: number;
    exit_plan: {
      profit_target?: number;
      stop_loss?: number;
    };
  }
  ```

### 4. 交易数据 (/api/trades)

- **用途**: 在交易历史区域显示
- **更新频率**: 每2分钟轮询一次
- **缓存策略**: 无缓存，实时获取
- **错误处理**: 显示错误消息，继续轮询

### 5. 成立以来数值数据 (/api/since-inception-values)

- **用途**: 在性能统计区域显示
- **更新频率**: 每5分钟轮询一次
- **缓存策略**: 无缓存，实时获取
- **错误处理**: 显示错误消息，继续轮询

### 6. 排行榜数据 (/api/leaderboard)

- **用途**: 在排行榜页面显示AI模型性能排名
- **更新频率**: 每小时更新一次
- **缓存策略**: 无缓存，实时获取
- **错误处理**: 显示错误消息，使用mock数据作为降级方案
- **数据结构**:
  ```typescript
  interface LeaderboardEntry {
    id: number;
    model: string;
    totalPnl: number;
    winRate: number;
    trades: number;
  }
  ```

## 页面规则

### 1. 数据优先级

1. **高优先级**: 加密货币价格（影响用户核心体验）
2. **中优先级**: 账户信息、持仓数据（影响交易决策）
3. **低优先级**: 交易历史、成立以来数据、排行榜（辅助信息）

### 2. 加载状态处理

- **初始加载**: 显示"Loading..."状态
- **加载失败**: 显示错误消息，并提供重试按钮
- **空数据**: 显示"暂无数据"提示

### 3. 错误处理规则

1. **网络错误**: 显示网络连接问题提示
2. **API错误**: 显示API服务不可用提示
3. **数据格式错误**: 显示数据解析错误提示
4. **认证错误**: 重定向到登录页面（如适用）

### 4. 性能优化

1. **防抖处理**: 避免频繁的API调用
2. **组件卸载清理**: 清除所有定时器和未完成的请求
3. **条件加载**: 仅在组件可见时加载数据

## 实现细节

### API服务层

所有API调用都通过统一的服务层处理，位于`/lib/api/nof1-api.ts`。

### 数据轮询

使用`setInterval`实现数据轮询，不同数据有不同的更新频率。

### 错误边界

在关键组件中实现React错误边界，防止数据获取错误导致整个页面崩溃。

## 未来扩展

1. **WebSocket支持**: 对于高频更新的数据，考虑使用WebSocket替代轮询
2. **数据缓存**: 对于不频繁变化的数据，实现本地缓存机制
3. **请求合并**: 合并多个小请求为一个批量请求以减少网络开销