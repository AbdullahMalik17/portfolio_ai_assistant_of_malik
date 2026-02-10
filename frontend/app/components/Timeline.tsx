'use client';

import { motion } from 'framer-motion';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  return (
    <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 md:ml-6 space-y-8 my-8">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="relative pl-8 md:pl-12"
        >
          {/* Dot */}
          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[color:var(--accent)] border-2 border-white dark:border-gray-900 shadow-sm" />
          
          {/* Content */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <span className="font-mono text-sm font-bold text-[color:var(--accent)] min-w-[80px]">
              {event.year}
            </span>
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                {event.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
