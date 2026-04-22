'use client';

import React, { memo, useMemo } from 'react';
import AppIcon from './AppIcon';

interface AppLogoProps {
  src?: string; // Image source (optional)
  iconName?: string; // Icon name when no image
  size?: number; // Height in px (width is auto to preserve aspect ratio)
  className?: string; // Additional classes
  onClick?: () => void; // Click handler
}

const AppLogo = memo(function AppLogo({
  src = '/assets/images/image-1775312226237.png',
  iconName = 'SparklesIcon',
  size = 64,
  className = '',
  onClick,
}: AppLogoProps) {
  const containerClassName = useMemo(() => {
    const classes = ['flex items-center'];
    if (onClick) classes.push('cursor-pointer hover:opacity-80 transition-opacity');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [onClick, className]);

  return (
    <div className={containerClassName} onClick={onClick}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Logo"
          style={{ height: size, width: 'auto' }}
          className="flex-shrink-0 object-contain"
        />
      ) : (
        <AppIcon name={iconName} size={size} className="flex-shrink-0" />
      )}
    </div>
  );
});

export default AppLogo;
