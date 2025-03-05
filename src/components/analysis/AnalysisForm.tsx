import { useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { Search, Upload, AlertCircle } from 'lucide-react'
import Button from '../ui/Button'
import { useSubscription } from '../../contexts/SubscriptionContext'

interface AnalysisFormProps {
  onSubmit: (data: AnalysisRequest) => void
}

export interface AnalysisRequest {
  type: 'ticker' | 'chart' | 'question'
  ticker?: string
  question?: string
  chartImage?: File
  timeframe?: string
}

const AnalysisForm = ({ onSubmit }: AnalysisFormProps) => {
  const [analysisType, setAnalysisType] = useState<'ticker' | 'chart' | 'question'>('ticker')
  const [ticker, setTicker] = useState('')
  const [question, setQuestion] = useState('')
  const [timeframe, setTimeframe] = useState('daily')
  const [chartImage, setChartImage] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { remainingAnalysis } = useSubscription()
  const formRef = useRef<HTMLFormElement>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setChartImage(acceptedFiles[0])
      }
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (remainingAnalysis <= 0) {
      setError('You have reached your analysis limit. Please upgrade your plan.')
      return
    }

    if (analysisType === 'ticker' && !ticker) {
      setError('Please enter a ticker symbol')
      return
    }

    if (analysisType === 'chart' && !chartImage) {
      setError('Please upload a chart image')
      return
    }

    if (analysisType === 'question' && !question) {
      setError('Please enter a question')
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onSubmit({
        type: analysisType,
        ticker: ticker || undefined,
        question: question || undefined,
        chartImage: chartImage || undefined,
        timeframe: analysisType === 'ticker' ? timeframe : undefined
      })
      setIsLoading(false)
      
      // Reset form
      if (formRef.current) {
        formRef.current.reset()
      }
      setTicker('')
      setQuestion('')
      setChartImage(null)
    }, 1500)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant={analysisType === 'ticker' ? 'primary' : 'outline'}
            onClick={() => setAnalysisType('ticker')}
          >
            <Search className="mr-2 h-4 w-4" />
            Ticker Analysis
          </Button>
          <Button
            type="button"
            variant={analysisType === 'chart' ? 'primary' : 'outline'}
            onClick={() => setAnalysisType('chart')}
          >
            <Upload className="mr-2 h-4 w-4" />
            Chart Upload
          </Button>
          <Button
            type="button"
            variant={analysisType === 'question' ? 'primary' : 'outline'}
            onClick={() => setAnalysisType('question')}
          >
            <Search className="mr-2 h-4 w-4" />
            Ask Question
          </Button>
        </div>

        {analysisType === 'ticker' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="ticker" className="block text-sm font-medium text-slate-700 mb-1">
                Ticker Symbol
              </label>
              <input
                type="text"
                id="ticker"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="e.g. AAPL, BTC-USD"
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor="timeframe" className="block text-sm font-medium text-slate-700 mb-1">
                Timeframe
              </label>
              <select
                id="timeframe"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="input"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
        )}

        {analysisType === 'chart' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Upload Chart
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary-500 bg-primary-50' : 'border-slate-300 hover:border-primary-500'
              }`}
            >
              <input {...getInputProps()} />
              {chartImage ? (
                <div className="space-y-2">
                  <p className="text-sm text-slate-700">Selected file: {chartImage.name}</p>
                  <Button type="button" variant="outline" size="sm" onClick={() => setChartImage(null)}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto h-12 w-12 text-slate-400" />
                  <p className="text-sm text-slate-700">
                    Drag and drop your chart image here, or click to select a file
                  </p>
                  <p className="text-xs text-slate-500">
                    Supported formats: PNG, JPG, JPEG
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {analysisType === 'question' && (
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-slate-700 mb-1">
              Your Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Is Tesla stock a buy right now? What is the best entry point for Bitcoin?"
              className="input min-h-[120px]"
              required
            />
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center text-danger-700 bg-danger-50 p-3 rounded-md">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Remaining analyses: <span className="font-medium">{remainingAnalysis}</span>
        </p>
        <Button type="submit" isLoading={isLoading}>
          Generate Analysis
        </Button>
      </div>
    </form>
  )
}

export default AnalysisForm
