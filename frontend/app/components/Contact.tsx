'use client';

import { useState } from 'react';
import SocialLinks from './SocialLinks';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const maxMessageLength = 500;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch('/api/contact', {
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
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--foreground)] mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can work together.
          </p>
        </div>

        <div className="flex justify-center mb-12 relative z-20">
          <SocialLinks className="bg-white dark:bg-gray-800 shadow-lg px-8 py-4 rounded-full border border-gray-200 dark:border-gray-700" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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

              <div className="grid md:grid-cols-2 gap-6">
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
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[color:var(--foreground)]"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-xs ${formData.message.length > maxMessageLength ? 'text-red-500' : 'text-gray-400'}`}>
                    {formData.message.length}/{maxMessageLength}
                  </span>
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
                  className="w-full px-4 py-3 rounded-lg bg-[color:var(--background)] border border-[color:var(--foreground)]/10 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20 outline-none transition-all resize-none"
                  placeholder="Tell me about your project, goals, timeline, and budget..."
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-[color:var(--accent)] text-white rounded-full font-semibold text-lg hover:bg-blue-600 hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
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
