import { ArrowRight, CheckCircle2, Compass, FlaskConical, Rocket } from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';

const steps = [
  {
    icon: Compass,
    label: '01 / Discover',
    title: 'Find the highest-leverage workflow',
    description: 'We clarify the user, trigger, handoffs, and successful outcome before choosing a model or framework.',
  },
  {
    icon: FlaskConical,
    label: '02 / Design',
    title: 'Shape the system around reality',
    description: 'I map tools, memory, permissions, failure paths, and evaluation signals so the architecture supports the operation.',
  },
  {
    icon: Rocket,
    label: '03 / Ship',
    title: 'Deliver a system people can trust',
    description: 'We release a focused first version, measure real behavior, and leave clear next steps for iteration and scale.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-canvas/60 py-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-accent">
                A practical engagement model
              </div>
              <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl">
                Clear steps. <span className="text-shimmer">Useful momentum.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted md:text-right">
              No black-box handoff: each phase produces a concrete artifact you can review, test, and build on.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <FadeInWhenVisible key={step.label} delay={index * 0.08}>
                <article className="relative h-full rounded-2xl border border-line bg-surface/40 p-6">
                  {index < steps.length - 1 && (
                    <ArrowRight
                      className="absolute -right-4 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-line bg-canvas p-1.5 text-accent lg:block"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-wider text-accent">{step.label}</span>
                    <Icon className="h-5 w-5 text-ink-subtle" aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-xl font-bold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                  <div className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-xs font-medium text-ink-muted">
                    <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
                    <span>Shared review checkpoint</span>
                  </div>
                </article>
              </FadeInWhenVisible>
            );
          })}
        </div>
      </div>
    </section>
  );
}
