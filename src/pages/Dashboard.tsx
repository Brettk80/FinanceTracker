import { BarChart3, LineChart, TrendingUp, TrendingDown, Users, DollarSign } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useSubscription } from '../contexts/SubscriptionContext'
import StatsCard from '../components/dashboard/StatsCard'
import RecentAnalyses from '../components/dashboard/RecentAnalyses'
import MarketOverview from '../components/dashboard/MarketOverview'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const Dashboard = () => {
  const { user } = useAuth()
  const { tier, remainingAnalysis, features } = useSubscription()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <Button as="a" href="/analysis">
          New Analysis
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Remaining Analyses"
          value={remainingAnalysis}
          icon={<BarChart3 className="h-6 w-6" />}
          color="blue"
        />
        <StatsCard
          title="Completed Analyses"
          value={features.analysisPerMonth - remainingAnalysis}
          icon={<LineChart className="h-6 w-6" />}
          color="green"
        />
        <StatsCard
          title="S&P 500"
          value="4,587.64"
          icon={<TrendingUp className="h-6 w-6" />}
          change={{ value: 0.87, type: 'increase' }}
          color="green"
        />
        <StatsCard
          title="Bitcoin"
          value="$28,456.32"
          icon={<TrendingDown className="h-6 w-6" />}
          change={{ value: 1.23, type: 'decrease' }}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarketOverview />
        </div>
        <div>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Your Subscription</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                tier === 'free' 
                  ? 'bg-slate-100 text-slate-800' 
                  : tier === 'basic'
                  ? 'bg-primary-100 text-primary-800'
                  : tier === 'pro'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-success-100 text-success-800'
              }`}>
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-500">Analyses Used</span>
                  <span className="text-slate-700 font-medium">
                    {features.analysisPerMonth - remainingAnalysis} / {features.analysisPerMonth}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: `${((features.analysisPerMonth - remainingAnalysis) / features.analysisPerMonth) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Features included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckItem checked={true}>
                      <span className="font-medium">{features.analysisPerMonth}</span> analyses per month
                    </CheckItem>
                  </li>
                  <li className="flex items-start">
                    <CheckItem checked={features.advancedAnalysis}>
                      Advanced technical analysis
                    </CheckItem>
                  </li>
                  <li className="flex items-start">
                    <CheckItem checked={features.prioritySupport}>
                      Priority support
                    </CheckItem>
                  </li>
                  <li className="flex items-start">
                    <CheckItem checked={features.batchAnalysis}>
                      Batch analysis
                    </CheckItem>
                  </li>
                  <li className="flex items-start">
                    <CheckItem checked={features.apiAccess}>
                      API access
                    </CheckItem>
                  </li>
                </ul>
              </div>
              
              <Button variant="outline" fullWidth as="a" href="/settings">
                Manage Subscription
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <RecentAnalyses />
    </div>
  )
}

interface CheckItemProps {
  checked: boolean
  children: React.ReactNode
}

const CheckItem = ({ checked, children }: CheckItemProps) => (
  <>
    <span className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-2 ${
      checked ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'
    }`}>
      <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        {checked && <path d="M3.5 6L5 7.5L8.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    </span>
    <span className={`text-sm ${checked ? 'text-slate-700' : 'text-slate-500'}`}>{children}</span>
  </>
)

export default Dashboard
