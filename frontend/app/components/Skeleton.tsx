import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className = '',
  ...props
}: SkeletonProps) {
  const baseStyles = 'bg-gray-300 dark:bg-gray-700';

  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const inlineStyles: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1em' : undefined),
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
      style={inlineStyles}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height="1rem"
          width={i === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <Skeleton variant="rectangular" height="200px" className="mb-4" />
      <Skeleton variant="text" height="1.5rem" className="mb-2" />
      <SkeletonText lines={2} />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="rectangular" width="80px" height="32px" />
        <Skeleton variant="rectangular" width="80px" height="32px" />
      </div>
    </div>
  );
}

export function SkeletonProject({ className = '' }: { className?: string }) {
  return (
    <div className={`glass rounded-2xl overflow-hidden ${className}`}>
      <Skeleton variant="rectangular" height="220px" />
      <div className="p-6">
        <Skeleton variant="text" height="1.75rem" className="mb-3" width="80%" />
        <SkeletonText lines={3} className="mb-4" />
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton variant="rectangular" width="60px" height="24px" />
          <Skeleton variant="rectangular" width="70px" height="24px" />
          <Skeleton variant="rectangular" width="65px" height="24px" />
        </div>
        <div className="flex gap-3">
          <Skeleton variant="rectangular" width="100px" height="40px" />
          <Skeleton variant="rectangular" width="100px" height="40px" />
        </div>
      </div>
    </div>
  );
}
