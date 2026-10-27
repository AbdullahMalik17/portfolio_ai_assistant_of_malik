'use client';

import { useState } from 'react';
import { Send, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import SocialLinks from './SocialLinks';
import Button from './Button';
import { FloatingInput, FloatingTextarea } from './FloatingInput';
import { PERSONAL_INFO } from '@/app/lib/portfolio-data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
        message: 'Failed to connect to AI refinement service'
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
          message: data.message || 'Your message has been sent successfully. I will get back to you shortly!'
        });
        setFormData({
          name: '',
          email: '',
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
    <section id="contact" className="py-[var(--section-y)]">
      <div className="mx-auto max-w-[var(--shell)] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left: the pitch and direct routes */}
          <div>
            <span className="eyebrow">
              <Mail className="h-3.5 w-3.5" />
              Contact
            </span>
            <h2 className="mt-4 text-h2 font-bold leading-[1.15] tracking-tight text-ink">
              Have an agent system worth building?
            </h2>
            <p className="mt-4 max-w-md text-lead leading-relaxed text-ink-muted">
              Send the workflow you want automated. I reply to every genuine inquiry
              within 24 hours — usually with a first-pass architecture sketch.
            </p>

            <dl className="mt-10 space-y-5 border-t border-line pt-8">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm text-ink hover:text-accent transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle">WhatsApp</dt>
                <dd className="mt-1">
                  <a
                    href={`https://wa.me/${PERSONAL_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink hover:text-accent transition-colors"
                  >
                    {PERSONAL_INFO.whatsapp}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle">Availability</dt>
                <dd className="mt-1 flex items-center gap-2 text-sm text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                  Open to agentic AI engineering work
                </dd>
              </div>
            </dl>

            <SocialLinks className="mt-8" />
          </div>

          {/* Right: the form */}
          <div className="glass rounded-[var(--radius-panel)] p-6 sm:p-9">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FloatingInput
                  type="text"
                  id="name"
                  name="name"
                  label="Your Name / Organization"
                  value={formData.name}
                  onChange={handleChange}
                  isRequired
                  required
                  minLength={2}
                  maxLength={50}
                />
                <FloatingInput
                  type="email"
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  isRequired
                  required
                />
              </div>

              <FloatingTextarea
                id="message"
                name="message"
                label="Describe your autonomous system requirement, workflow, or inquiry..."
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
              />

              <div className="flex justify-end pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={isSubmitting}
                  rightIcon={<Send className="h-4 w-4" />}
                >
                  Send Message
                </Button>
              </div>

              {/* Status Banner */}
              {submitStatus.type && (
                <div className={`flex items-center gap-3 rounded-[var(--radius-card)] p-4 ${
                  submitStatus.type === 'success'
                    ? 'bg-ok/10 text-ok'
                    : 'bg-danger/10 text-danger'
                }`}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 shrink-0" />
                  )}
                  <p className="text-xs font-medium">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
