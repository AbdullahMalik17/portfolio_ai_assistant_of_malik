'use client';

import { Link } from 'react-scroll';
import SocialLinks from './SocialLinks';
import TypewriterEffect from './TypewriterEffect';

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-block animate-fade-in-up">
            <span className="px-4 py-2 rounded-full glass text-sm font-medium text-[color:var(--accent)] border border-[color:var(--accent)]/20">
              👋 Hi, I&apos;m Abdullah Malik
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-in-up delay-100">
            Building the{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Future of AI
            </span>
            <br />
            One Line at a Time
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200 leading-relaxed">
            I&apos;m a passionate developer specializing in{' '}
            <span className="text-[color:var(--accent)] font-semibold min-w-[200px] inline-block">
              <TypewriterEffect
                words={[
                  'AI Development',
                  'Full-Stack Development',
                  'Agentic AI Systems',
                  'Cloud Technologies',
                  'Web Applications',
                ]}
                typeSpeed={100}
                deleteSpeed={50}
                delayBetweenWords={2000}
              />
            </span>
            <br className="hidden md:block" />
            Creating intelligent solutions for complex problems.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
            <Link
              to="projects"
              smooth={true}
              offset={-70}
              duration={500}
              className="px-8 py-4 bg-[color:var(--accent)] text-white rounded-full font-semibold text-lg hover:bg-blue-600 hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] cursor-pointer"
            >
              View My Work
            </Link>
            <Link
              to="contact"
              smooth={true}
              offset={-70}
              duration={500}
              className="px-8 py-4 glass text-[color:var(--foreground)] rounded-full font-semibold text-lg hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 transition-all cursor-pointer border border-[color:var(--foreground)]/10"
            >
              Contact Me
            </Link>
          </div>

          <div className="flex justify-center pt-8 relative z-20">
            <SocialLinks />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce delay-1000">
            <Link
              to="about"
              smooth={true}
              offset={-70}
              duration={500}
              className="cursor-pointer text-gray-400 hover:text-[color:var(--accent)] transition-colors"
              aria-label="Scroll to About section"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
