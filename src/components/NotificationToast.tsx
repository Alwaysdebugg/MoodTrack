import { useState, useEffect } from 'react'
import { X, CheckCircle, Heart, MessageCircle, Users } from 'lucide-react'

interface NotificationToastProps {
  type: 'interaction' | 'match' | 'community' | 'success'
  title: string
  message: string
  isVisible: boolean
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

const NotificationToast = ({ 
  type, 
  title, 
  message, 
  isVisible, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: NotificationToastProps) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShow(true)
      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose()
        }, duration)
        return () => clearTimeout(timer)
      }
    }
  }, [isVisible, autoClose, duration])

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 300) // 等待动画完成
  }

  const getIcon = () => {
    switch (type) {
      case 'interaction':
        return <Heart className="w-5 h-5 text-pink-600" />
      case 'match':
        return <Users className="w-5 h-5 text-blue-600" />
      case 'community':
        return <MessageCircle className="w-5 h-5 text-purple-600" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Heart className="w-5 h-5 text-gray-600" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'interaction':
        return 'bg-pink-50 border-pink-200'
      case 'match':
        return 'bg-blue-50 border-blue-200'
      case 'community':
        return 'bg-purple-50 border-purple-200'
      case 'success':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  if (!isVisible && !show) return null

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
      show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`card max-w-sm ${getBackgroundColor()} border shadow-lg`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
            <p className="text-gray-600 text-sm mt-1">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotificationToast