'use client';

import { useState } from 'react';
import SocialLinks from './SocialLinks';
import Button from './Button';
import { FloatingInput, FloatingTextarea } from './FloatingInput';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const maxMessageLength = 1000;

  const handleAIDraft = async () => {
    if (!formData.message.trim() || isDrafting) return;

    setIsDrafting(true);
    try {
      // Use Next.js API route for AI message refinement
      const response = await fetch('/api/refine-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormData(prev => ({ ...prev, message: data.response }));
      } else {
        console.error('AI refinement failed:', data.error);
        setSubmitStatus({
          type: 'error',
          message: data.error || 'AI refinement is temporarily unavailable'
        });
      }
    } catch (error) {
      console.error('Drafting error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to connect to AI service'
      });
    } finally {
      setIsDrafting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear status when user types
    setSubmitStatus({ type: null, message: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Use Next.js API route for contact form (saves to Vercel Postgres + sends email)
      const endpoint = '/api/contact';

      console.log('📧 Submitting contact form...'); // Debug log

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Your message has been sent successfully!'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: ''
        });
      } else {
        throw new Error(data.error || data.detail || 'Failed to send message');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Cyber Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="hero-glow top-[20%] right-[-10%] opacity-30" style={{ '--accent-glow': 'var(--accent-glow-secondary)' } as any}></div>
          <div className="hero-glow bottom-[-10%] left-[-10%] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Get In <span className="text-shimmer">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-secondary)] mx-auto rounded-full"></div>
          <p className="mt-8 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can build something extraordinary together.
          </p>
        </div>

        <div className="flex justify-center mb-16 relative z-20">
          <SocialLinks className="bg-white/5 backdrop-blur-xl shadow-2xl px-10 py-5 rounded-full border border-white/10 transition-all hover:scale-110 duration-500 hover:border-[color:var(--accent)]/50" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass glow-card rounded-3xl p-8 sm:p-10 md:p-16 shadow-2xl border border-white/10 relative overflow-hidden bg-white/[0.02]">
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FloatingInput
                  type="text"
                  id="name"
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  isRequired
                  required
                  minLength={2}
                  maxLength={50}
                  className="bg-black/20"
                />
                <FloatingInput
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  isRequired
                  required
                  className="bg-black/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FloatingInput
                  type="tel"
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  isOptional
                  className="bg-black/20"
                />
                <FloatingInput
                  type="text"
                  id="company"
                  name="company"
                  label="Company"
                  value={formData.company}
                  onChange={handleChange}
                  isOptional
                  maxLength={100}
                  className="bg-black/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FloatingInput
                  type="text"
                  id="subject"
                  name="subject"
                  label="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  isRequired
                  required
                  minLength={5}
                  maxLength={100}
                  className="bg-black/20"
                />
                <div className="relative group">
                  <label
                    htmlFor="projectType"
                    className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1"
                  >
                    Project Type <span className="text-gray-600">(Optional)</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 focus:border-[color:var(--accent)] focus:ring-4 focus:ring-[color:var(--accent)]/10 outline-none transition-all text-white appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[color:var(--background)]">Select project type</option>
                    <option value="web-development" className="bg-[color:var(--background)]">Web Development</option>
                    <option value="ai-integration" className="bg-[color:var(--background)]">AI Integration</option>
                    <option value="full-stack" className="bg-[color:var(--background)]">Full-Stack Application</option>
                    <option value="mobile-app" className="bg-[color:var(--background)]">Mobile Application</option>
                    <option value="consulting" className="bg-[color:var(--background)]">Consulting</option>
                    <option value="other" className="bg-[color:var(--background)]">Other</option>
                  </select>
                  <div className="absolute right-4 bottom-4 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative group">
                  <label
                    htmlFor="budget"
                    className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1"
                  >
                    Budget Range <span className="text-gray-600">(Optional)</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 focus:border-[color:var(--accent)] focus:ring-4 focus:ring-[color:var(--accent)]/10 outline-none transition-all text-white appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[color:var(--background)]">Select budget range</option>
                    <option value="less-than-5k" className="bg-[color:var(--background)]">Less than $5,000</option>
                    <option value="5k-10k" className="bg-[color:var(--background)]">$5,000 - $10,000</option>
                    <option value="10k-25k" className="bg-[color:var(--background)]">$10,000 - $25,000</option>
                    <option value="25k-50k" className="bg-[color:var(--background)]">$25,000 - $50,000</option>
                    <option value="50k-plus" className="bg-[color:var(--background)]">$50,000+</option>
                  </select>
                  <div className="absolute right-4 bottom-4 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="relative group">
                  <label
                    htmlFor="timeline"
                    className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1"
                  >
                    Project Timeline <span className="text-gray-600">(Optional)</span>
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-black/20 border border-white/10 focus:border-[color:var(--accent)] focus:ring-4 focus:ring-[color:var(--accent)]/10 outline-none transition-all text-white appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[color:var(--background)]">Select timeline</option>
                    <option value="asap" className="bg-[color:var(--background)]">ASAP</option>
                    <option value="1-3-months" className="bg-[color:var(--background)]">1-3 Months</option>
                    <option value="3-6-months" className="bg-[color:var(--background)]">3-6 Months</option>
                    <option value="6-plus-months" className="bg-[color:var(--background)]">6+ Months</option>
                    <option value="flexible" className="bg-[color:var(--background)]">Flexible</option>
                  </select>
                  <div className="absolute right-4 bottom-4 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <FloatingTextarea
                id="message"
                name="message"
                label="Message"
                value={formData.message}
                onChange={handleChange}
                isRequired
                required
                minLength={10}
                maxLength={maxMessageLength}
                rows={6}
                characterCount={formData.message.length}
                maxCharacters={maxMessageLength}
                onAIRefine={handleAIDraft}
                isRefining={isDrafting}
                className="bg-black/20"
              />
              <div className="text-center pt-8">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  className="w-full sm:w-auto px-12 py-5 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:scale-105 transition-all duration-500"
                  rightIcon={
                    !isSubmitting ? (
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    ) : undefined
                  }
                >
                  Initiate Transmission
                </Button>
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <div className={`mt-8 p-5 rounded-2xl animate-fade-in-up ${submitStatus.type === 'success'
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                  <p className="font-bold text-center tracking-wide">
                    {submitStatus.message}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Contact;
