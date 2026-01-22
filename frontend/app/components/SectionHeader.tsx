'use client';

import FadeInWhenVisible from './FadeInWhenVisible';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <FadeInWhenVisible>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--foreground)] mb-4">
          {title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        {subtitle && (
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </FadeInWhenVisible>
  );
};

export default SectionHeader;
