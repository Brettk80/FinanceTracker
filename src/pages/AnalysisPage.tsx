import { useState } from 'react'
import AnalysisForm, { AnalysisRequest } from '../components/analysis/AnalysisForm'
import AnalysisResult from '../components/analysis/AnalysisResult'
import Card from '../components/ui/Card'

const AnalysisPage = () => {
  const [analysisRequest, setAnalysisRequest] = useState<AnalysisRequest | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = (data: AnalysisRequest) => {
    setAnalysisRequest(data)
    setShowResults(true)
  }

  const handleNewAnalysis = () => {
    setShowResults(false)
    setAnalysisRequest(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Financial Analysis</h1>
        <p className="mt-1 text-slate-500">
          Get AI-powered insights for stocks, cryptocurrencies, or custom charts
        </p>
      </div>

      <Card>
        {!showResults ? (
          <AnalysisForm onSubmit={handleSubmit} />
        ) : (
          <AnalysisResult 
            request={analysisRequest!} 
            onNewAnalysis={handleNewAnalysis} 
          />
        )}
      </Card>
    </div>
  )
}

export default AnalysisPage
