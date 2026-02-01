import { AnonymousUser } from '../types/social';

interface AnonymousAvatarProps {
  user: AnonymousUser;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
}

const AnonymousAvatar = ({
  user,
  size = 'md',
  showStatus = false,
  className = '',
}: AnonymousAvatarProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'md':
        return 'w-10 h-10 text-base';
      case 'lg':
        return 'w-12 h-12 text-lg';
      case 'xl':
        return 'w-16 h-16 text-xl';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  // Generate consistent emoji based on user ID
  const getAvatarEmoji = (userId: string) => {
    const emojis = [
      '😊',
      '🌟',
      '🌸',
      '🌺',
      '🦋',
      '🌙',
      '☀️',
      '🌈',
      '💫',
      '🌻',
      '🎈',
      '🎨',
      '🎵',
      '🌿',
      '🍃',
    ];
    const index =
      userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      emojis.length;
    return emojis[index];
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${getSizeClasses()} ${user.avatar} rounded-full flex items-center justify-center flex-shrink-0`}
      >
        <span className="text-white font-bold">{getAvatarEmoji(user.id)}</span>
      </div>

      {/* Online status indicator */}
      {showStatus && (
        <div
          className={`absolute -bottom-1 -right-1 ${
            size === 'sm'
              ? 'w-3 h-3'
              : size === 'md'
                ? 'w-3 h-3'
                : size === 'lg'
                  ? 'w-4 h-4'
                  : 'w-5 h-5'
          } rounded-full border-2 border-white ${
            user.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`}
        ></div>
      )}
    </div>
  );
};

export default AnonymousAvatar;
