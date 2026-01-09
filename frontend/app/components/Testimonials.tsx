'use client';

import { useState } from 'react';
import FadeInWhenVisible from './FadeInWhenVisible';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Future Client',
    role: 'CTO',
    company: 'Tech Startup',
    content:
      'Abdull ah&apos;s expertise in AI development is exceptional. His ability to transform complex requirements into elegant, functional solutions is remarkable. The AI assistant he built exceeded our expectations.',
    image: '👤',
    rating: 5,
  },
  {
    name: 'Panaversity Instructor',
    role: 'AI Development Mentor',
    company: 'Panaversity',
    content:
      'One of the most dedicated students in our Agentic AI program. Abdullah demonstrates deep understanding of AI agent architectures and consistently delivers high-quality projects.',
    image: '👨‍🏫',
    rating: 5,
  },
  {
    name: 'GitHub Community',
    role: 'Open Source Contributor',
    company: 'Developer Community',
    content:
      'Clean code, excellent documentation, and innovative AI solutions. Abdullah&apos;s projects showcase best practices in modern full-stack development with AI integration.',
    image: '💻',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-[color:var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Testimonials
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              What people say about working with me
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-3xl p-8 md:p-12"
              >
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">
                      ⭐
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <div className="text-center mb-8">
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    &quot;{currentTestimonial.content}&quot;
                  </p>
                </div>

                {/* Author */}
                <div className="flex flex-col items-center">
                  <div className="text-5xl mb-4" role="img" aria-label="Testimonial author avatar">{currentTestimonial.image}</div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm text-[color:var(--accent)] font-semibold">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentTestimonial.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-[color:var(--accent)] hover:text-white transition-all"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-[color:var(--accent)] hover:text-white transition-all"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[color:var(--accent)] w-8'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
