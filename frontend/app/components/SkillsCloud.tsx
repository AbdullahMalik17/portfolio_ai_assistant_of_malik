'use client';

import { useEffect, useRef } from 'react';

interface SkillsCloudProps {
  skills: string[];
}

const SkillsCloud = ({ skills }: SkillsCloudProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom Hook for 3D logic to avoid complex dependencies
  const useTagCloud = (container: React.RefObject<HTMLDivElement | null>, tags: string[]) => {
    useEffect(() => {
      if (!container.current) return;
      
      const _tags = [...tags];
      const r = 200; // Radius
      const _depth = 200;
      const _size = 200;
      
      const elements: HTMLElement[] = [];
      let mouseX = 0;
      let mouseY = 0;
      
      // Initialize
      const init = () => {
        container.current!.innerHTML = '';
        
        for (let i = 0; i < _tags.length; i++) {
          const tag = document.createElement('div');
          tag.className = 'tag-cloud-item absolute transform-gpu transition-colors duration-300 cursor-pointer hover:text-[color:var(--accent)] font-bold text-sm sm:text-base';
          tag.style.color = 'var(--foreground)';
          tag.innerText = _tags[i];
          container.current!.appendChild(tag);
          elements.push(tag);
        }
      };
      
      init();
      
      // Simple spherical layout + rotation implementation
      
      const positionTags = () => {
        for (let i = 1; i < elements.length + 1; i++) {
            const phi = Math.acos(-1 + (2 * i - 1) / elements.length);
            const theta = Math.sqrt(elements.length * Math.PI) * phi;
            
            const x = r * Math.cos(theta) * Math.sin(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(phi);
            
            // Store initial positions
            elements[i-1].dataset.x = x.toString();
            elements[i-1].dataset.y = y.toString();
            elements[i-1].dataset.z = z.toString();
        }
      };

      positionTags();

      // Rotation state
      let angleX = 0;
      let angleY = 0;
      const speed = 0.001; // Base rotation speed

      const update = () => {
        // Add base rotation + mouse influence
        angleX += speed + (mouseY * 0.0001);
        angleY += speed + (mouseX * 0.0001);

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        elements.forEach(el => {
            const x = parseFloat(el.dataset.x || '0');
            const y = parseFloat(el.dataset.y || '0');
            const z = parseFloat(el.dataset.z || '0');

            // Rotate around Y
            const rx1 = x * cosY - z * sinY;
            const rz1 = z * cosY + x * sinY;

            // Rotate around X
            const ry2 = y * cosX - rz1 * sinX;
            const rz2 = rz1 * cosX + y * sinX; // Depth

            const scale = _depth / (_depth - rz2);
            const alpha = (rz2 + r) / (2 * r);

            el.style.left = `${rx1 * scale + _size}px`;
            el.style.top = `${ry2 * scale + _size}px`;
            el.style.fontSize = `${15 * scale}px`;
            el.style.opacity = `${alpha + 0.5}`;
            el.style.zIndex = `${Math.floor(scale * 100)}`;
            el.style.filter = `blur(${(1-scale) * 2}px)`;
        });

        requestAnimationFrame(update);
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.current!.getBoundingClientRect();
        mouseX = (e.clientX - (rect.left + rect.width/2)) / 5;
        mouseY = (e.clientY - (rect.top + rect.height/2)) / 5;
      };

      const handleMouseLeave = () => {
        mouseX = 0;
        mouseY = 0;
      };

      const currentContainer = container.current;
      currentContainer.addEventListener('mousemove', handleMouseMove);
      currentContainer.addEventListener('mouseleave', handleMouseLeave);
      
      const frameId = requestAnimationFrame(update);

      return () => {
         cancelAnimationFrame(frameId);
         if (currentContainer) {
             currentContainer.removeEventListener('mousemove', handleMouseMove);
             currentContainer.removeEventListener('mouseleave', handleMouseLeave);
         }
      };

    }, [tags, container]);
  };

  useTagCloud(containerRef, skills);

  return (
    <div className="flex justify-center items-center h-[400px] w-full overflow-hidden">
        <div ref={containerRef} className="relative w-[400px] h-[400px]" style={{ transformStyle: 'preserve-3d' }}>
            {/* Tags will be injected here */}
        </div>
    </div>
  );
};

export default SkillsCloud;
