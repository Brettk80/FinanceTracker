import { Link } from 'react-router-dom'
import { BarChart3, LineChart, Search, ExternalLink } from 'lucide-react'
import Card from '../ui/Card'

interface Analysis {
  id: string
  type: 'ticker' | 'chart' | 'question'
  title: string
  date: string
  result: {
    recommendation: 'buy' | 'sell' | 'hold'
    confidence: number
  }
}

const RecentAnalyses = () => {
  // Mock data - in a real app, this would come from an API
  const analyses: Analysis[] = [
    {
      id: '1',
      type: 'ticker',
      title: 'AAPL Analysis',
      date: '2023-10-15',
      result: {
        recommendation: 'buy',
        confidence: 0.82
      }
    },
    {
      id: '2',
      type: 'chart',
      title: 'BTC-USD Chart Analysis',
      date: '2023-10-14',
      result: {
        recommendation: 'hold',
        confidence: 0.65
      }
    },
    {
      id: '3',
      type: 'question',
      title: 'Is Tesla stock a buy right now?',
      date: '2023-10-12',
      result: {
        recommendation: 'sell',
        confidence: 0.71
      }
    },
    {
      id: '4',
      type: 'ticker',
      title: 'MSFT Analysis',
      date: '2023-10-10',
      result: {
        recommendation: 'buy',
        confidence: 0.78
      }
    },
    {
      id: '5',
      type: 'chart',
      title: 'ETH-USD Chart Analysis',
      date: '2023-10-08',
      result: {
        recommendation: 'buy',
        confidence: 0.69
      }
    }
  ]

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Recent Analyses</h3>
        <Link to="/history" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
          View all
          <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Recommendation</th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {analyses.map((analysis) => (
              <tr key={analysis.id} className="hover:bg-slate-50">
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      {analysis.type === 'ticker' && <BarChart3 className="h-4 w-4" />}
                      {analysis.type === 'chart' && <LineChart className="h-4 w-4" />}
                      {analysis.type === 'question' && <Search className="h-4 w-4" />}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <Link to={`/history/${analysis.id}`} className="text-sm font-medium text-slate-900 hover:text-primary-600">
                    {analysis.title}
                  </Link>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-500">
                  {new Date(analysis.date).toLocaleDateString()}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    analysis.result.recommendation === 'buy' 
                      ? 'bg-success-50 text-success-700' 
                      : analysis.result.recommendation === 'sell'
                      ? 'bg-danger-50 text-danger-700'
                      : 'bg-warning-50 text-warning-700'
                  }`}>
                    {analysis.result.recommendation.toUpperCase()}
                  </span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-500">
                  {Math.round(analysis.result.confidence * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default RecentAnalyses
