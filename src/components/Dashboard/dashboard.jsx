import { useState, useEffect } from 'react'
import Header from '../Layout/header'
import FeedbackForm from './feedbackForm'
import HistoryPanel from './historyPanel'
import api from '../../services/api'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [feedback, setFeedback] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchHistory = async () => {
    try {
      const response = await api.get('/feedback/history')
      setHistory(response.data.data)
    } catch (error) {
      console.error('Failed to fetch history:', error)
    }
  }

  const handleFeedbackSubmit = async (userInput) => {
    setLoading(true)
    setFeedback(null)
    
    try {
      const response = await api.post('/feedback', {
        user_input: userInput
      })
      
      setFeedback(response.data.data)
      toast.success('Feedback generated successfully!')
      
      await fetchHistory()
    } catch (error) {
      toast.error('Failed to generate feedback')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                AI Feedback Generator
              </h1>
              
              <FeedbackForm 
                onSubmit={handleFeedbackSubmit}
                loading={loading}
              />
              
              {(feedback || loading) && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    AI Feedback
                  </h3>
                  
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
                      <span className="text-gray-600">Generating feedback...</span>
                    </div>
                  ) : (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {feedback?.feedback}
                      </p>
                      <div className="mt-4 text-sm text-gray-500">
                        Generated on {new Date(feedback?.createdAt).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <HistoryPanel 
              history={history}
              onRefresh={fetchHistory}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard