'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, ExternalLink, CheckCircle2, FileCheck } from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';
import { CERTIFICATIONS } from '../lib/portfolio-data';

export default function Certifications() {
  const getCertIcon = (iconName: string, isSecurity: boolean) => {
    if (isSecurity) return <ShieldCheck className="w-7 h-7 text-emerald-400" />;
    return <Award className="w-7 h-7 text-cyan-400" />;
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-500/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Credentials & Governance
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Professional <span className="text-shimmer">Certifications</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
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
                    ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.12)] hover:border-emerald-400/60'
                    : 'border-white/[0.08] bg-slate-900/40 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                }`}
              >
                {/* Header Row */}
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-13 h-13 rounded-2xl flex items-center justify-center border ${
                        isSecurity
                          ? 'bg-emerald-500/15 border-emerald-500/30'
                          : 'bg-cyan-500/10 border-cyan-500/20'
                      }`}
                    >
                      {getCertIcon(cert.iconName, isSecurity)}
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      {cert.badge && (
                        <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full border tracking-wider ${
                          isSecurity
                            ? 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30'
                            : 'text-cyan-300 bg-cyan-500/15 border-cyan-500/30'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          {cert.badge}
                        </span>
                      )}
                      <span className="text-xs font-mono text-slate-400">
                        Issued {cert.year}
                      </span>
                    </div>
                  </div>

                  {/* Agent ID / Author Registry Badge */}
                  {cert.agentId && (
                    <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-emerald-500/20">
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <span className="text-[11px] font-mono text-emerald-300 truncate">
                        {isSkillsDirectory ? `Author: ${cert.agentId}` : `Registry: ${cert.agentId}`}
                      </span>
                    </div>
                  )}

                  {/* Title & Issuer */}
                  <h3 className="text-lg font-bold text-white mb-1.5 leading-snug">
                    {cert.title}
                  </h3>
                  <p className={`font-semibold mb-3 text-xs font-mono ${isSecurity ? 'text-emerald-400' : 'text-cyan-400'}`}>
                    {cert.issuer}
                  </p>

                  {/* Description */}
                  <p className="text-slate-300 text-xs mb-5 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium border ${
                          isSecurity
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                            : 'bg-white/5 border-white/10 text-slate-300'
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
                  className={`w-full py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                    isSecurity
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:opacity-90 shadow-emerald-500/25'
                      : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-90 shadow-cyan-500/25'
                  }`}
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
