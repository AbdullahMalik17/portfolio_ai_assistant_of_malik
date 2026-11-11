import { Bot, Gauge, Network, ShieldCheck } from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';

const services = [
  {
    icon: Bot,
    title: 'Agentic AI systems',
    description: 'Turn repeatable workflows into dependable agents with clear tools, memory, guardrails, and human handoffs.',
    outcomes: ['Workflow mapping', 'Tool calling', 'Evaluation loops'],
  },
  {
    icon: Network,
    title: 'MCP and integration layers',
    description: 'Connect the systems your team already uses through typed, observable Model Context Protocol integrations.',
    outcomes: ['MCP servers', 'API orchestration', 'Event-driven flows'],
  },
  {
    icon: Gauge,
    title: 'Lean production runtimes',
    description: 'Ship focused services that stay fast and affordable, from lightweight Go gateways to containerized backends.',
    outcomes: ['Go services', 'Async pipelines', 'Deployment readiness'],
  },
  {
    icon: ShieldCheck,
    title: 'Secure automation',
    description: 'Design automation around least privilege, credential isolation, failure recovery, and measurable behavior.',
    outcomes: ['Access boundaries', 'Fallback paths', 'Operational visibility'],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-canvas/40 py-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-accent">
              How I can help
            </div>
            <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl">
              From messy workflow to <span className="text-shimmer">useful autonomy</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              I work best with teams that need a thoughtful first system, not another disconnected AI demo.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeInWhenVisible key={service.title} delay={index * 0.06}>
                <article className="group h-full rounded-2xl border border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-accent/40 hover:bg-surface/70">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-ink-subtle">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{service.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-4">
                    {service.outcomes.map((outcome) => (
                      <span key={outcome} className="rounded-full border border-line bg-white/5 px-2.5 py-1 text-[11px] font-mono text-ink-muted">
                        {outcome}
                      </span>
                    ))}
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
