'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-ink font-semibold hover:bg-accent-bright shadow-[0_0_0_1px_rgba(34,211,238,0.4),0_8px_24px_-12px_rgba(34,211,238,0.6)] transition-colors',
  secondary:
    'bg-white/5 text-ink font-medium border border-line hover:border-white/25 hover:bg-white/5 transition-colors',
  ghost:
    'bg-transparent text-ink-muted font-medium border border-transparent hover:text-ink hover:bg-white/5 transition-colors',
  outline:
    'bg-transparent text-accent font-medium border border-accent/40 hover:bg-accent/10 hover:border-accent/70 transition-colors',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-[13px] rounded-[10px]',
  md: 'h-11 px-5 text-sm rounded-xl',
  lg: 'h-13 px-7 text-base rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  return (
    <motion.button
      whileHover={!disabled && !loading ? { y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      aria-busy={loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
}
