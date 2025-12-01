interface MoodBadgeProps {
  mood: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const MoodBadge = ({
  mood,
  label,
  size = 'md',
  showIcon = true,
  className = '',
}: MoodBadgeProps) => {
  const getMoodData = (moodValue: number) => {
    const moodMap = {
      1: {
        label: '很糟糕',
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: '😰',
      },
      2: {
        label: '不好',
        color: 'bg-orange-100 text-orange-700 border-orange-200',
        icon: '😔',
      },
      3: {
        label: '一般',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: '😐',
      },
      4: {
        label: '不错',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: '😊',
      },
      5: {
        label: '很棒',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: '😄',
      },
    };

    return (
      moodMap[Math.max(1, Math.min(5, moodValue)) as keyof typeof moodMap] ||
      moodMap[3]
    );
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-1 text-sm';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1 text-sm';
    }
  };

  const moodData = getMoodData(mood);
  const displayLabel = label || moodData.label;

  return (
    <span
      className={`
      inline-flex items-center font-medium rounded-full border
      ${moodData.color} 
      ${getSizeClasses()}
      ${className}
    `}
    >
      {showIcon && <span className="mr-1">{moodData.icon}</span>}
      {displayLabel}
    </span>
  );
};

export default MoodBadge;
