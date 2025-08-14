import { RefreshCw } from 'lucide-react'
import Button from '../UI/button'

const HistoryPanel = ({ history, onRefresh }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent History
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="p-2"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Your last 5 submissions
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {history.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No submissions yet.</p>
            <p className="text-sm mt-1">Start by submitting your first response!</p>
          </div>
        ) : (
          history.map((item, index) => (
            <div key={item._id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-600 mb-1">
                    {formatDate(item.createdAt)}
                  </div>
                  
                  <div className="mb-2">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      Your Input:
                    </h4>
                    <p className="text-sm text-gray-700">
                      {truncateText(item.user_input)}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      AI Feedback:
                    </h4>
                    <p className="text-sm text-gray-600">
                      {truncateText(item.feedback, 80)}
                    </p>
                  </div>
                </div>
                
                <div className="ml-4 flex-shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    #{history.length - index}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default HistoryPanel