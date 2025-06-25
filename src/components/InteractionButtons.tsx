import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { interactionTypes } from '../utils/socialUtils'

interface InteractionButtonsProps {
  targetId: string
  interactions?: { [key: string]: number }
  onInteraction: (targetId: string, interactionType: string) => void
  onReply?: (targetId: string) => void
  showReplyButton?: boolean
  size?: 'sm' | 'md' | 'lg'
  layout?: 'horizontal' | 'vertical'
  maxVisible?: number
  className?: string
}

const InteractionButtons = ({ 
  targetId,
  interactions = {},
  onInteraction,
  onReply,
  showReplyButton = true,
  size = 'md',
  layout = 'horizontal',
  maxVisible = 3,
  className = ''
}: InteractionButtonsProps) => {
  const [selectedInteraction, setSelectedInteraction] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState<string | null>(null)

  const handleInteraction = (interactionType: string) => {
    if (selectedInteraction === interactionType) {
      // 取消选择
      setSelectedInteraction(null)
    } else {
      setSelectedInteraction(interactionType)
      setIsAnimating(interactionType)
      
      // 触发动画
      setTimeout(() => setIsAnimating(null), 300)
      
      // 调用回调
      onInteraction(targetId, interactionType)
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs'
      case 'md':
        return 'px-3 py-1 text-sm'
      case 'lg':
        return 'px-4 py-2 text-base'
      default:
        return 'px-3 py-1 text-sm'
    }
  }

  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col space-y-2'
      case 'horizontal':
      default:
        return 'flex flex-wrap gap-2'
    }
  }

  const visibleInteractionTypes = interactionTypes.slice(0, maxVisible)

  return (
    <div className={`${getLayoutClasses()} ${className}`}>
      {visibleInteractionTypes.map((type) => {
        const count = interactions[type.id] || 0
        const isSelected = selectedInteraction === type.id
        const isCurrentlyAnimating = isAnimating === type.id

        return (
          <button
            key={type.id}
            onClick={() => handleInteraction(type.id)}
            className={`
              flex items-center space-x-1 rounded-full transition-all duration-200 border
              ${getSizeClasses()}
              ${isSelected 
                ? 'bg-blue-100 border-blue-300 text-blue-700 shadow-sm' 
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
              }
              ${isCurrentlyAnimating ? 'scale-110' : 'scale-100'}
            `}
            title={type.description}
          >
            <span className={`transition-transform duration-200 ${
              isCurrentlyAnimating ? 'animate-bounce' : ''
            }`}>
              {type.emoji}
            </span>
            <span className="font-medium">{type.label}</span>
            {count > 0 && (
              <span className={`
                px-1.5 py-0.5 rounded-full text-xs font-bold
                ${isSelected 
                  ? 'bg-blue-200 text-blue-800' 
                  : 'bg-gray-200 text-gray-700'
                }
              `}>
                {count}
              </span>
            )}
          </button>
        )
      })}

      {/* 回复按钮 */}
      {showReplyButton && onReply && (
        <button
          onClick={() => onReply(targetId)}
          className={`
            flex items-center space-x-1 rounded-full border border-blue-200 text-blue-700 
            bg-blue-50 hover:bg-blue-100 transition-colors
            ${getSizeClasses()}
          `}
        >
          <MessageCircle className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
          <span className="font-medium">回复</span>
        </button>
      )}
    </div>
  )
}

export default InteractionButtons