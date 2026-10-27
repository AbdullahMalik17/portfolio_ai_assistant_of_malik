'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, ExternalLink, CheckCircle2, FileCheck } from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';
import { CERTIFICATIONS } from '../lib/portfolio-data';

export default function Certifications() {
  const getCertIcon = (iconName: string, isSecurity: boolean) => {
    if (isSecurity) return <ShieldCheck className="w-7 h-7 text-accent" />;
    return <Award className="w-7 h-7 text-accent" />;
  };

  return (
    <section id="certifications" className="py-16 relative overflow-hidden bg-canvas/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              Verified Credentials & Governance
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Professional <span className="text-shimmer">Certifications</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
              Audited AI agent behavioral governance, Skills Directory Grade-A security, prompt engineering specialization, and verified engineering credentials.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {CERTIFICATIONS.map((cert, index) => {
            const isA2AS = !!cert.badge && cert.badge.includes('A2AS');
            const isSkillsDirectory = cert.issuer.includes('Skills Directory');
            const isSecurity = isA2AS || isSkillsDirectory;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`glass rounded-3xl p-7 border flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  isSecurity
                    ? 'border-accent/40 bg-surface'
                    : 'border-line bg-surface/40 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                }`}
              >
                {/* Header Row */}
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-13 h-13 rounded-2xl flex items-center justify-center border ${
                        isSecurity
                          ? 'bg-accent/20 border-accent/40'
                          : 'bg-accent/10 border-accent/20'
                      }`}
                    >
                      {getCertIcon(cert.iconName, isSecurity)}
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      {cert.badge && (
                        <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full border tracking-wider ${
                          isSecurity
                            ? 'text-accent-ink bg-accent border-accent'
                            : 'text-accent bg-accent/15 border-accent/30'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          {cert.badge}
                        </span>
                      )}
                      <span className="text-xs font-mono text-ink-muted">
                        Issued {cert.year}
                      </span>
                    </div>
                  </div>

                  {/* Agent ID / Author Registry Badge */}
                  {cert.agentId && (
                    <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-accent/20">
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                      </span>
                      <span className="text-[11px] font-mono text-accent truncate">
                        {isSkillsDirectory ? `Author: ${cert.agentId}` : `Registry: ${cert.agentId}`}
                      </span>
                    </div>
                  )}

                  {/* Title & Issuer */}
                  <h3 className="text-lg font-bold text-ink mb-1.5 leading-snug">
                    {cert.title}
                  </h3>
                  <p className={`font-semibold mb-3 text-xs font-mono ${isSecurity ? 'text-accent' : 'text-ink-muted'}`}>
                    {cert.issuer}
                  </p>

                  {/* Description */}
                  <p className="text-ink text-xs mb-5 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium border ${
                          isSecurity
                            ? 'bg-accent/10 border-accent/25 text-accent'
                            : 'bg-white/5 border-line text-ink'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-md bg-accent text-accent-ink hover:opacity-90 shadow-accent/25"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
