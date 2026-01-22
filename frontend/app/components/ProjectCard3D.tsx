'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface ProjectCard3DProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
}

const ProjectCard3D = ({ 
  children, 
  className = "",
  glareColor = "rgba(255, 255, 255, 0.4)"
}: ProjectCard3DProps) => {
  const ref = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

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
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        perspective: 1000
      }}
      className={`relative transform-gpu ${className}`}
    >
      {/* Card Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>

      {/* Glare Effect */}
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
      
      {/* Edge Highlight (Pseudo-3D thickness) */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 shadow-inner pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard3D;
