'use client';

import { motion } from 'framer-motion';
import FadeInWhenVisible from './FadeInWhenVisible';
import { CERTIFICATIONS } from '../lib/portfolio-data';

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-[color:var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Professional <span className="text-shimmer">Certifications</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-secondary)] mx-auto rounded-full"></div>
            <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Validated expertise in cutting-edge AI technologies and software engineering
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass glow-card rounded-3xl p-8 border border-white/10 bg-white/5 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[color:var(--accent)]/10 flex items-center justify-center text-3xl border border-[color:var(--accent)]/20">
                  {cert.icon}
                </div>
                <span className="text-xs font-bold text-[color:var(--accent)] px-3 py-1 rounded-full bg-[color:var(--accent)]/10 border border-[color:var(--accent)]/20 tracking-wider">
                  {cert.year}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                {cert.title}
              </h3>
              <p className="text-[color:var(--accent)] font-medium mb-4 text-sm">
                {cert.issuer}
              </p>
              
              <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                {cert.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {cert.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-2.5 py-1 bg-white/5 rounded-lg text-[10px] font-medium border border-white/5 text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full py-3 bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-secondary)] text-white rounded-xl text-sm font-bold text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                View Certificate
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
