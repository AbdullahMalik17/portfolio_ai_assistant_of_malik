'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef, useCallback, useState, useEffect } from 'react';

interface ProjectCard3DProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
}

// Throttle helper function
const useThrottle = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const lastCall = useRef(0);

  return useCallback((...args: T) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
};

const ProjectCard3D = ({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.4)"
}: ProjectCard3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for the rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20
  });

  // Glare position
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), {
    stiffness: 150,
    damping: 20
  });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), {
    stiffness: 150,
    damping: 20
  });

  const updateMousePosition = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse position (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  }, [x, y, prefersReducedMotion]);

  // Throttle mouse move to ~60fps (16ms)
  const handleMouseMove = useThrottle(updateMousePosition, 16);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  // Conditionally apply 3D effect
  const shouldApply3D = !prefersReducedMotion;

  return (
    <motion.div
      ref={ref}
      onMouseMove={shouldApply3D ? handleMouseMove : undefined}
      onMouseLeave={shouldApply3D ? handleMouseLeave : undefined}
      style={shouldApply3D ? {
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        perspective: 1000
      } : {}}
      className={`relative transform-gpu ${className}`}
    >
      {/* Card Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>

      {/* Glare Effect - only show if 3D is enabled */}
      {shouldApply3D && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              circle at ${glareX}% ${glareY}%,
              ${glareColor},
              transparent 80%
            )`
          }}
        />
      )}

      {/* Edge Highlight (Pseudo-3D thickness) */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 shadow-inner pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard3D;
