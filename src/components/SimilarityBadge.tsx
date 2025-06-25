import { Percent } from 'lucide-react'

interface SimilarityBadgeProps {
  similarity: number
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  showLabel?: boolean
  className?: string
}

const SimilarityBadge = ({ 
  similarity, 
  size = 'md', 
  showIcon = true, 
  showLabel = true,
  className = '' 
}: SimilarityBadgeProps) => {
  const getSimilarityLevel = (value: number) => {
    if (value >= 90) {
      return {
        level: '极高相似',
        color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        icon: '🎯'
      }
    } else if (value >= 80) {
      return {
        level: '高度相似',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: '✨'
      }
    } else if (value >= 60) {
      return {
        level: '相似',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: '🤝'
      }
    } else if (value >= 40) {
      return {
        level: '部分相似',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: '👍'
      }
    } else {
      return {
        level: '低相似',
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: '🔍'
      }
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

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3'
      case 'md':
        return 'w-4 h-4'
      case 'lg':
        return 'w-5 h-5'
      default:
        return 'w-4 h-4'
    }
  }

  const similarityData = getSimilarityLevel(similarity)

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full border
      ${similarityData.color} 
      ${getSizeClasses()}
      ${className}
    `}>
      {showIcon && (
        <>
          <span className="mr-1">{similarityData.icon}</span>
          <Percent className={`${getIconSize()} mr-1`} />
        </>
      )}
      <span className="font-bold">{similarity}%</span>
      {showLabel && size !== 'sm' && (
        <span className="ml-1">{similarityData.level}</span>
      )}
    </span>
  )
}

export default SimilarityBadge