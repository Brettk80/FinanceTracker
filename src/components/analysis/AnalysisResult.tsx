import { useState } from 'react'
import { Download, Share2, ThumbsUp, ThumbsDown, BarChart3, LineChart, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { AnalysisRequest } from './AnalysisForm'

interface AnalysisResultProps {
  request: AnalysisRequest
  onNewAnalysis: () => void
}

interface AnalysisData {
  ticker?: string
  summary: string
  technicalAnalysis: {
    trend: 'bullish' | 'bearish' | 'neutral'
    supportLevels: number[]
    resistanceLevels: number[]
    indicators: {
      name: string
      value: string
      signal: 'buy' | 'sell' | 'neutral'
    }[]
  }
  sentimentAnalysis: {
    overall: 'positive' | 'negative' | 'neutral'
    score: number
    sources: {
      name: string
      sentiment: 'positive' | 'negative' | 'neutral'
    }[]
  }
  recommendation: {
    action: 'buy' | 'sell' | 'hold'
    confidence: number
    timeframe: string
    targetPrice?: number
  }
  annotatedChartUrl?: string
}

const AnalysisResult = ({ request, onNewAnalysis }: AnalysisResultProps) => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null)
  
  // Mock data - in a real app, this would come from the API
  const analysisData: AnalysisData = {
    ticker: request.ticker || 'AAPL',
    summary: "Apple (AAPL) shows a bullish trend in the medium term, with strong support at $170 and resistance at $190. Recent earnings exceeded expectations, driving positive sentiment. Technical indicators suggest a potential breakout above the current resistance level. The RSI is at 62, indicating room for further upside before reaching overbought conditions. The 50-day moving average has crossed above the 200-day moving average, forming a golden cross pattern that typically signals a bullish trend continuation.",
    technicalAnalysis: {
      trend: 'bullish',
      supportLevels: [170, 165, 158],
      resistanceLevels: [190, 195, 205],
      indicators: [
        { name: 'RSI', value: '62', signal: 'neutral' },
        { name: 'MACD', value: 'Positive', signal: 'buy' },
        { name: 'Moving Averages', value: 'Golden Cross', signal: 'buy' },
        { name: 'Bollinger Bands', value: 'Upper Band Test', signal: 'neutral' }
      ]
    },
    sentimentAnalysis: {
      overall: 'positive',
      score: 0.78,
      sources: [
        { name: 'News Articles', sentiment: 'positive' },
        { name: 'Social Media', sentiment: 'positive' },
        { name: 'Analyst Ratings', sentiment: 'neutral' }
      ]
    },
    recommendation: {
      action: 'buy',
      confidence: 0.82,
      timeframe: '3-6 months',
      targetPrice: 205
    },
    annotatedChartUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80'
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF report
    alert('Downloading analysis report...')
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert('Sharing analysis...')
  }

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type)
    // In a real app, this would send feedback to the server
    alert(`Thank you for your ${type} feedback!`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {request.type === 'ticker' && `${analysisData.ticker} Analysis`}
            {request.type === 'chart' && 'Chart Analysis'}
            {request.type === 'question' && 'Question Analysis'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Generated on {new Date().toLocaleDateString()} • {request.timeframe || 'Custom'} timeframe
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Summary</h3>
            <p className="text-slate-700">{analysisData.summary}</p>
          </Card>

          {analysisData.annotatedChartUrl && (
            <Card padding="sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-3 px-3 pt-2">Annotated Chart</h3>
              <div className="rounded-md overflow-hidden">
                <img 
                  src={analysisData.annotatedChartUrl} 
                  alt="Annotated Chart" 
                  className="w-full h-auto"
                />
              </div>
            </Card>
          )}

          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Technical Analysis</h3>
            
            <div className="flex items-center mb-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 ${
                analysisData.technicalAnalysis.trend === 'bullish' 
                  ? 'bg-success-50 text-success-700' 
                  : analysisData.technicalAnalysis.trend === 'bearish'
                  ? 'bg-danger-50 text-danger-700'
                  : 'bg-secondary-50 text-secondary-700'
              }`}>
                {analysisData.technicalAnalysis.trend === 'bullish' && <TrendingUp className="h-5 w-5" />}
                {analysisData.technicalAnalysis.trend === 'bearish' && <TrendingDown className="h-5 w-5" />}
                {analysisData.technicalAnalysis.trend === 'neutral' && <LineChart className="h-5 w-5" />}
              </div>
              <div>
                <h4 className="font-medium text-slate-900">Overall Trend</h4>
                <p className="text-sm text-slate-500 capitalize">{analysisData.technicalAnalysis.trend}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Support Levels</h4>
                <div className="space-y-2">
                  {analysisData.technicalAnalysis.supportLevels.map((level, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-success-500 rounded-full mr-2"></div>
                      <span className="text-sm text-slate-700">${level}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Resistance Levels</h4>
                <div className="space-y-2">
                  {analysisData.technicalAnalysis.resistanceLevels.map((level, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-danger-500 rounded-full mr-2"></div>
                      <span className="text-sm text-slate-700">${level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-slate-900 mb-2">Technical Indicators</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysisData.technicalAnalysis.indicators.map((indicator, index) => (
                <div key={index} className="flex items-center p-3 rounded-md bg-slate-50">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                    indicator.signal === 'buy' 
                      ? 'bg-success-50 text-success-700' 
                      : indicator.signal === 'sell'
                      ? 'bg-danger-50 text-danger-700'
                      : 'bg-secondary-50 text-secondary-700'
                  }`}>
                    {indicator.signal === 'buy' && <TrendingUp className="h-4 w-4" />}
                    {indicator.signal === 'sell' && <TrendingDown className="h-4 w-4" />}
                    {indicator.signal === 'neutral' && <LineChart className="h-4 w-4" />}
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-900">{indicator.name}</h5>
                    <p className="text-xs text-slate-500">{indicator.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className={`border-l-4 ${
            analysisData.recommendation.action === 'buy' 
              ? 'border-l-success-500' 
              : analysisData.recommendation.action === 'sell'
              ? 'border-l-danger-500'
              : 'border-l-warning-500'
          }`}>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recommendation</h3>
            
            <div className="flex items-center mb-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${
                analysisData.recommendation.action === 'buy' 
                  ? 'bg-success-50 text-success-700' 
                  : analysisData.recommendation.action === 'sell'
                  ? 'bg-danger-50 text-danger-700'
                  : 'bg-warning-50 text-warning-700'
              }`}>
                {analysisData.recommendation.action === 'buy' && <TrendingUp className="h-6 w-6" />}
                {analysisData.recommendation.action === 'sell' && <TrendingDown className="h-6 w-6" />}
                {analysisData.recommendation.action === 'hold' && <AlertTriangle className="h-6 w-6" />}
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 capitalize">{analysisData.recommendation.action}</h4>
                <p className="text-sm text-slate-500">
                  {analysisData.recommendation.timeframe} timeframe
                </p>
              </div>
            </div>
            
            {analysisData.recommendation.targetPrice && (
              <div className="mb-4">
                <h4 className="font-medium text-slate-900 mb-1">Target Price</h4>
                <p className="text-2xl font-bold text-primary-700">
                  ${analysisData.recommendation.targetPrice}
                </p>
              </div>
            )}
            
            <div className="mb-4">
              <h4 className="font-medium text-slate-900 mb-1">Confidence Level</h4>
              <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1">
                <div 
                  className={`h-2.5 rounded-full ${
                    analysisData.recommendation.confidence > 0.7 
                      ? 'bg-success-500' 
                      : analysisData.recommendation.confidence > 0.4
                      ? 'bg-warning-500'
                      : 'bg-danger-500'
                  }`}
                  style={{ width: `${analysisData.recommendation.confidence * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 text-right">
                {Math.round(analysisData.recommendation.confidence * 100)}% confidence
              </p>
            </div>
            
            <div className="text-sm text-slate-700">
              <p className="italic">
                This recommendation is based on technical analysis, market sentiment, and historical patterns.
                Always conduct your own research before making investment decisions.
              </p>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Sentiment Analysis</h3>
            
            <div className="flex items-center mb-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 ${
                analysisData.sentimentAnalysis.overall === 'positive' 
                  ? 'bg-success-50 text-success-700' 
                  : analysisData.sentimentAnalysis.overall === 'negative'
                  ? 'bg-danger-50 text-danger-700'
                  : 'bg-secondary-50 text-secondary-700'
              }`}>
                {analysisData.sentimentAnalysis.overall === 'positive' && <ThumbsUp className="h-5 w-5" />}
                {analysisData.sentimentAnalysis.overall === 'negative' && <ThumbsDown className="h-5 w-5" />}
                {analysisData.sentimentAnalysis.overall === 'neutral' && <BarChart3 className="h-5 w-5" />}
              </div>
              <div>
                <h4 className="font-medium text-slate-900">Overall Sentiment</h4>
                <p className="text-sm text-slate-500 capitalize">{analysisData.sentimentAnalysis.overall}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-slate-900 mb-1">Sentiment Score</h4>
              <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1">
                <div 
                  className={`h-2.5 rounded-full ${
                    analysisData.sentimentAnalysis.score > 0.6 
                      ? 'bg-success-500' 
                      : analysisData.sentimentAnalysis.score > 0.4
                      ? 'bg-warning-500'
                      : 'bg-danger-500'
                  }`}
                  style={{ width: `${analysisData.sentimentAnalysis.score * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 text-right">
                {Math.round(analysisData.sentimentAnalysis.score * 100)}% positive
              </p>
            </div>
            
            <h4 className="font-medium text-slate-900 mb-2">Sentiment by Source</h4>
            <div className="space-y-2">
              {analysisData.sentimentAnalysis.sources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md bg-slate-50">
                  <span className="text-sm text-slate-700">{source.name}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    source.sentiment === 'positive' 
                      ? 'bg-success-50 text-success-700' 
                      : source.sentiment === 'negative'
                      ? 'bg-danger-50 text-danger-700'
                      : 'bg-secondary-50 text-secondary-700'
                  }`}>
                    {source.sentiment.charAt(0).toUpperCase() + source.sentiment.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Feedback</h3>
            <p className="text-sm text-slate-700 mb-4">
              Was this analysis helpful? Your feedback helps us improve our AI models.
            </p>
            <div className="flex gap-3">
              <Button 
                variant={feedback === 'positive' ? 'primary' : 'outline'} 
                onClick={() => handleFeedback('positive')}
                className="flex-1"
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Helpful
              </Button>
              <Button 
                variant={feedback === 'negative' ? 'primary' : 'outline'} 
                onClick={() => handleFeedback('negative')}
                className="flex-1"
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                Not Helpful
              </Button>
            </div>
          </Card>

          <Button onClick={onNewAnalysis} fullWidth>
            New Analysis
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AnalysisResult
