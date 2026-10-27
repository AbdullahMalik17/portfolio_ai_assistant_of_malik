'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe2, Cpu, Bot, Wrench, Database, Activity, 
  CheckCircle2, ChevronRight, Sparkles, type LucideIcon
} from 'lucide-react';
import FadeInWhenVisible from './FadeInWhenVisible';

interface ArchitectureNode {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  badge: string;
  layer: string;
  language: string;
  filename: string;
  description: string;
  specs: string[];
  codeSample: string;
}

const nodes: ArchitectureNode[] = [
  {
    id: 'gateway',
    step: '01',
    title: 'AI Gateway & Ingress',
    subtitle: 'Unified API & Event Router',
    icon: Globe2,
    badge: 'Go Daemon / gRPC',
    layer: 'Ingress',
    language: 'Go',
    filename: 'gateway_route.go',
    description: 'Inbound requests from Web, WhatsApp, Android ADB, and Email are authenticated, rate-limited, and normalized into JSON-RPC event streams.',
    specs: ['Sub-millisecond routing overhead (<5ms)', 'Token bucket rate-limiting per client', 'Bilingual Urdu/English RTL tokenizer'],
    codeSample: `// Go HTTP Gateway & Ingress
func (gw *Gateway) RouteInbound(req *Request) (*Event, error) {
    if err := gw.RateLimiter.Allow(req.ClientID); err != nil {
        return nil, ErrRateLimitExceeded
    }
    return gw.EventBus.Publish(req.Context(), req.Payload)
}`,
  },
  {
    id: 'router',
    step: '02',
    title: 'Agent Router & Intent Core',
    subtitle: 'Dynamic Dispatch & Fallback',
    icon: Cpu,
    badge: 'Intent Router',
    layer: 'Routing',
    language: 'Python',
    filename: 'intent_router.py',
    description: 'Dispatches tasks dynamically between lightweight local heuristics (regex/local SLMs) and cloud LLM reasoning cascades (Gemini 2.5 Flash / Claude 3.5 Sonnet).',
    specs: ['Confidence threshold routing (>0.85 local)', 'Cost-optimized model cascade strategy', 'Graceful fallback on cloud API timeouts'],
    codeSample: `async def route_intent(prompt: str) -> ExecutionPlan:
    classification = await local_classifier.predict(prompt)
    if classification.confidence > 0.85:
        return ExecutionPlan(target="local_edge_agent")
    return ExecutionPlan(target="cloud_reasoning_swarm")`,
  },
  {
    id: 'agents',
    step: '03',
    title: 'Specialized Agents & Swarms',
    subtitle: 'Autonomous Execution Subroutines',
    icon: Bot,
    badge: 'Dual-Agent Isolated',
    layer: 'Execution',
    language: 'Python',
    filename: 'cloud_sentry_agent.py',
    description: 'Autonomous worker nodes (Research Agent, Coding Agent, Financial Sentry) execute parallel subroutines with strict credential sandboxing.',
    specs: ['Cloud Sentry / Local Executive privilege split', 'Zero secret leakage across network boundaries', 'Parallel multi-agent consensus validation'],
    codeSample: `class CloudSentryAgent(ReadOnlyAgent):
    """Monitors incoming SaaS webhooks with zero write perms."""
    async def on_event(self, event: WebhookEvent):
        signature = hmac_sign(event.payload, SECRET)
        await local_executive_queue.push(event, signature)`,
  },
  {
    id: 'mcp-tools',
    step: '04',
    title: 'MCP Protocol & Function Tools',
    subtitle: 'Model Context Protocol (JSON-RPC)',
    icon: Wrench,
    badge: 'MCP Standard',
    layer: 'Tooling',
    language: 'JSON',
    filename: 'odoo_create_invoice.tool.json',
    description: 'Enforces the official Anthropic Model Context Protocol specification for tool discovery, resource subscriptions, and standardized RPC schemas.',
    specs: ['JSON-RPC 2.0 transport over stdio and SSE', 'Strict JSON Schema input validation', 'Integrated with Odoo ERP, Gmail, Android ADB'],
    codeSample: `// Model Context Protocol Tool Schema
{
  "name": "odoo_create_invoice",
  "description": "Generates an invoice draft in Odoo ERP",
  "inputSchema": {
    "type": "object",
    "properties": {
      "partner_id": {"type": "integer"},
      "amount": {"type": "number"}
    },
    "required": ["partner_id", "amount"]
  }
}`,
  },
  {
    id: 'memory',
    step: '05',
    title: 'Memory & State Persistence',
    subtitle: 'pgvector & Obsidian Knowledge Graph',
    icon: Database,
    badge: 'pgvector / ChromaDB',
    layer: 'State',
    language: 'SQL',
    filename: 'semantic_recall.sql',
    description: 'Persistent conversation state, episodic memory, and semantic document vectors stored via pgvector (1536 dimensions) and synced with Obsidian Markdown vaults.',
    specs: ['Sub-second Cosine Similarity Search (<40ms)', 'Git-backed Obsidian Vault daily synchronization', 'Short-term rolling buffer + Long-term state'],
    codeSample: `-- pgvector 1536-dimensional similarity query
SELECT id, content, (embedding <=> $1) AS cosine_distance
FROM agent_knowledge_embeddings
WHERE cosine_distance < 0.25
ORDER BY cosine_distance ASC
LIMIT 5;`,
  },
  {
    id: 'observability',
    step: '06',
    title: 'Observability & Governance',
    subtitle: 'Langfuse Tracing & A2AS Audit',
    icon: Activity,
    badge: 'A2AS Certified',
    layer: 'Governance',
    language: 'Python',
    filename: 'telemetry_trace.py',
    description: 'Full token consumption tracking, function execution latency tracing with Langfuse, and audited agent safety policies verified via A2AS Registry certificates.',
    specs: ['End-to-end distributed span tracing', 'Token consumption cost attribution', 'A2AS declared behavioral boundaries'],
    codeSample: `# Telemetry & Safety Trace
with langfuse.trace(name="deep_research_task") as trace:
    trace.log_metric("tokens_in", tokens_prompt)
    trace.log_metric("tokens_out", tokens_completion)
    a2as_guard.assert_behavior_compliance(output_payload)`,
  },
];

export default function SystemArchitecture() {
  const [activeNode, setActiveNode] = useState<ArchitectureNode>(nodes[0]);

  return (
    <section id="architecture" className="py-16 relative overflow-hidden bg-canvas/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm shadow-accent/10">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Autonomous Agent Engineering Blueprint
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Agentic <span className="text-shimmer">System Architecture</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink-muted max-w-3xl mx-auto leading-relaxed">
              How I architect production multi-agent systems: end-to-end lifecycle from edge ingress and routing to MCP execution, vector memory, and A2AS safety governance.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* 6-Node Interactive Pipeline Blueprint */}
        <div className="relative mb-10">
          <div className="hidden lg:flex items-center justify-between mb-3 px-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-ink-muted">
              Request flow
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-ink-muted">
              Response &amp; governance
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {nodes.map((node, idx) => {
              const isSelected = activeNode.id === node.id;
              const Icon = node.icon;

              return (
                <div key={node.id} className="relative">
                  <button
                    onClick={() => setActiveNode(node)}
                    aria-pressed={isSelected}
                    className={`h-full w-full p-4 rounded-2xl glass border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                      isSelected
                        ? 'border-accent/60 bg-accent/10 text-ink'
                        : 'border-line hover:border-line-strong bg-surface/40 text-ink-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                          isSelected
                            ? 'bg-accent text-accent-ink border-accent'
                            : 'bg-white/5 border-line text-accent'
                        }`}
                      >
                        {node.step}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">
                        {node.layer}
                      </span>
                    </div>

                    <div>
                      <div
                        className={`w-8 h-8 rounded-xl border border-line flex items-center justify-center mb-2.5 ${
                          isSelected ? 'text-accent-ink bg-accent' : 'text-ink-muted bg-white/5'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs font-bold leading-tight text-ink">
                        {node.title.split('&')[0].trim()}
                      </h3>
                      <p className="mt-1 text-[10px] font-mono text-ink-muted">{node.language}</p>
                    </div>
                  </button>

                  {idx < nodes.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute -right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 text-line-strong z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Node Deep-Dive Inspector Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="glass rounded-3xl p-6 sm:p-10 border border-line bg-canvas/80 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Details (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-bold uppercase">
                      Node {activeNode.step} • {activeNode.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-1">
                    {activeNode.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-accent mb-4 font-semibold">
                    {activeNode.subtitle}
                  </p>

                  <p className="text-sm text-ink leading-relaxed mb-6 font-normal">
                    {activeNode.description}
                  </p>

                  {/* Architecture Specs */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-ink-muted uppercase font-bold tracking-wider block mb-1">
                      Engineering Principles
                    </span>
                    {activeNode.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-ink">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-line text-xs font-mono text-ink-muted">
                  <span>Standard: Production Autonomous Node Protocol</span>
                </div>
              </div>

              {/* Right Code Inspector (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="glass rounded-2xl border border-line bg-[#070b14] overflow-hidden flex flex-col h-full shadow-inner">
                  {/* Code Header */}
                  <div className="px-4 py-2.5 bg-surface/80 border-b border-line flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-line" />
                      <span className="w-3 h-3 rounded-full bg-line" />
                      <span className="w-3 h-3 rounded-full bg-line" />
                      <span className="ml-2 text-xs font-mono text-ink-muted">
                        {activeNode.filename}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-accent">
                      {activeNode.language.toUpperCase()}
                    </span>
                  </div>

                  {/* Code Viewport */}
                  <div className="p-5 font-mono text-[13px] text-ink overflow-x-auto flex-1 bg-black/40">
                    <pre className="leading-relaxed whitespace-pre">
                      <code>{activeNode.codeSample}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
