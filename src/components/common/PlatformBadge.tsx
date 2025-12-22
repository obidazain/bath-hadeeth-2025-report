import { platformColors, platformIcons, platformNames, type PlatformKey } from '../../config/platforms';

interface PlatformBadgeProps {
  platform: PlatformKey;
  showName?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-1.5 text-base gap-2',
};

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export function PlatformBadge({ platform, showName = true, size = 'md' }: PlatformBadgeProps) {
  const bgColor = platform === 'instagram'
    ? 'bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]'
    : '';

  const style = platform !== 'instagram'
    ? { backgroundColor: platformColors[platform] }
    : {};

  return (
    <span
      className={`inline-flex items-center rounded-full text-white font-medium ${sizeClasses[size]} ${bgColor}`}
      style={style}
    >
      <span className={iconSizes[size]}>{platformIcons[platform]}</span>
      {showName && platformNames[platform].en}
    </span>
  );
}
