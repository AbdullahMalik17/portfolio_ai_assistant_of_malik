'use client';

import { useState } from 'react';
import SocialLinks from './SocialLinks';
import Button from './Button';

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
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl.replace(/\/$/, '')}/api/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Convert this rough project intent into a professional, concise project inquiry for a full-stack developer portfolio. Raw intent: "${formData.message}"`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, message: data.response }));
      }
    } catch (error) {
      console.error('Drafting error:', error);
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
      // Use external backend URL if available, otherwise default to localhost:8000
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const endpoint = `${backendUrl.replace(/\/$/, '')}/api/contact`;

      console.log(`🚀 Attempting to contact backend at: ${endpoint}`); // Debug log

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
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[color:var(--foreground)] mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can work together.
          </p>
        </div>

        <div className="flex justify-center mb-12 relative z-20">
          <SocialLinks className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg px-8 py-4 rounded-full border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105 duration-300" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[color:var(--foreground)] mb-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={50}
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--background)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[color:var(--foreground)] mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--background)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[color:var(--foreground)] mb-2"
                  >
                    Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--background)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-[color:var(--foreground)] mb-2"
                  >
                    Company <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--background)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all"
                    placeholder="Your Company Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[color:var(--foreground)] mb-2"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    minLength={5}
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--background)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>
                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-sm font-medium text-[color:var(--foreground)] mb-2"
                  >
                    Project Type <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--background)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all"
                  >
                    <option value="">Select project type</option>
                    <option value="web-development">Web Development</option>
                    <option value="ai-integration">AI Integration</option>
                    <option value="full-stack">Full-Stack Application</option>
                    <option value="mobile-app">Mobile Application</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-[color:var(--foreground)] mb-2"
                  >
                    Budget Range <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--background)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all"
                  >
                    <option value="">Select budget range</option>
                    <option value="less-than-5k">Less than $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-plus">$50,000+</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="timeline"
                    className="block text-sm font-medium text-[color:var(--foreground)] mb-2"
                  >
                    Project Timeline <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--background)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3-months">1-3 Months</option>
                    <option value="3-6-months">3-6 Months</option>
                    <option value="6-plus-months">6+ Months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[color:var(--foreground)]"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={handleAIDraft}
                        disabled={isDrafting || !formData.message.trim()}
                        className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-500 border border-purple-500/20 hover:bg-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDrafting ? (
                            <>
                                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Drafting...
                            </>
                        ) : (
                            <>✨ Refine with AI</>
                        )}
                    </button>
                    <span className={`text-[10px] ${formData.message.length > maxMessageLength ? 'text-red-500' : 'text-gray-400'}`}>
                        {formData.message.length}/{maxMessageLength}
                    </span>
                  </div>
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={maxMessageLength}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-[color:var(--background)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all resize-none font-sans text-sm"
                  placeholder="Tip: Type a few keywords and click 'Refine with AI'..."
                ></textarea>
              </div>
              <div className="text-center pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  className="w-full sm:w-auto rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  rightIcon={
                    !isSubmitting ? (
                      <svg
                        className="w-5 h-5"
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
                  Send Message
                </Button>
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <div className={`mt-4 p-4 rounded-lg ${submitStatus.type === 'success'
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                  <p className="font-medium text-center">
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
