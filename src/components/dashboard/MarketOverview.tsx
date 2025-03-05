import { useState } from 'react'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'

interface MarketItem {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
}

const MarketOverview = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  // Mock data - in a real app, this would come from an API
  const marketData: MarketItem[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72, change: 1.45, volume: '52.3M' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 332.42, change: 0.87, volume: '23.1M' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 137.14, change: -0.32, volume: '18.7M' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 131.69, change: 2.13, volume: '35.2M' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.68, change: -1.78, volume: '41.9M' },
    { symbol: 'BTC-USD', name: 'Bitcoin USD', price: 28456.32, change: 3.21, volume: '24.5B' },
    { symbol: 'ETH-USD', name: 'Ethereum USD', price: 1642.18, change: 2.54, volume: '12.1B' },
  ]

  const refreshData = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Market Overview</h3>
        <Button variant="ghost" size="sm" onClick={refreshData} isLoading={isLoading}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Symbol</th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-3 py-3.5 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
              <th className="px-3 py-3.5 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">24h Change</th>
              <th className="px-3 py-3.5 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {marketData.map((item) => (
              <tr key={item.symbol} className="hover:bg-slate-50">
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {item.symbol}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-500">
                  {item.name}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-right text-slate-900">
                  ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-right">
                  <div className={`flex items-center justify-end ${
                    item.change > 0 ? 'text-success-700' : 'text-danger-700'
                  }`}>
                    {item.change > 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(item.change).toFixed(2)}%
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-right text-slate-500">
                  {item.volume}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default MarketOverview
