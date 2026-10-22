---
target: portfolio homepage
total_score: 23
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 4
timestamp: 2026-10-22T16-04-26Z
slug: frontend-app-page-tsx
---
⚠️ DEGRADED: single-context (delegation was prohibited for this directly reviewable audit)

# Portfolio Design and Capability Review

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Project tabs and contact feedback are visible; status on secondary widgets varies. |
| 2 | Match System / Real World | 2/4 | Strong engineering content, but FTE, MCP, A2AS, and other terms dominate recruiter-facing copy. |
| 3 | User Control and Freedom | 3/4 | Filters, tabs, and modal affordances provide control; the long single-page journey remains costly. |
| 4 | Consistency and Standards | 3/4 | Components share a visual system, but identity and site-host metadata disagree. |
| 5 | Error Prevention | 2/4 | Contact form has constraints; evidence and demo labels can still mislead about what is live or measured. |
| 6 | Recognition Rather Than Recall | 2/4 | Controls are labeled, but visitors must decode acronyms and numerous badge categories. |
| 7 | Flexibility and Efficiency of Use | 3/4 | Command palette, filters, and navigation alternatives exist. |
| 8 | Aesthetic and Minimalist Design | 2/4 | Polished but over-dense; effects, proof badges, floating widgets, and repeated sections compete. |
| 9 | Error Recovery | 3/4 | Contact errors are surfaced and the form state is retained; the main weakness is not error recovery. |
| 10 | Help and Documentation | n/a | Not applicable to a portfolio's primary visitor task. |
| **Total** | | **23/36 (64%)** | **Acceptable; recruiter clarity and trust need a focused pass.** |

## Technical Audit Health

| Dimension | Score | Key finding |
|-----------|-------|-------------|
| Accessibility | 2/4 | Clickable project cards are non-semantic; motion-reduction support is incomplete. |
| Performance | 2/4 | Many animated/glow effects and widgets merit profiling; no field performance data was available. |
| Responsive Design | 2/4 | At 420x676, fixed chatbot/WhatsApp/command controls overlap hero and project content. |
| Theming | 3/4 | A consistent dark palette exists, but repeated gradients and hard-coded colors limit distinction. |
| Implementation Integrity | 2/4 | Static traces are presented as live reasoning, with precise metrics lacking consistent provenance. |
| **Total** | **11/20** | **Acceptable; prioritize mobile usability and proof integrity.** |

## Design Specificity Verdict

The project content is specific to Abdullah, MalikClaw, and Urdu-first edge computing, but the visual language—dark glass cards, cyan/purple gradients, shimmer headings, neon badges—is common among AI portfolio templates. The bundled detector found two warnings: an AI color-palette warning that matches the visual impression, and a gray-on-color warning that appears to be a false positive caused by combining the page's base text color with a translucent text-selection color. No detector overlay was injected; browser screenshots were used for visual evidence.

The live 420x676 view is polished at first glance, but fixed controls visibly cover parts of the hero copy, primary project CTA, and project-card copy. The page also contains many sections and multiple layers of badge proof, case-study details, and interactive widgets. Its appearance says "premium AI lab"; recruiter success needs "credible engineer, evidence first."

## Overall Impression

**Overall: 6.5/10 for Agentic AI/software engineering recruiters.** Visual polish is about 7/10; clarity, credibility, and mobile usability pull the overall score down. The best improvement is not adding features: simplify the story and make project evidence unmistakably real.

## What's Working

- Strong dark visual consistency, clear typography, and a memorable profile/hero treatment.
- MalikClaw and the edge/Urdu focus give the portfolio a real point of difference; project cards link to source and demos.
- Useful existing capabilities include a resume route, project/category search, case-study tabs, a command palette, and a contact form with feedback.

## Priority Issues

### [P1] Fixed widgets obscure key mobile content

**Evidence:** A live 420x676 screenshot showed the chatbot bubble over hero copy/CTA and WhatsApp/command controls over project content.  
**Impact:** Recruiters may miss the call to action or have text obscured on phones.  
**Fix:** On small screens, keep only one unobtrusive assistant affordance, move or dismiss secondary widgets, respect safe-area insets, and ensure floating controls never cover text or buttons.  
**Suggested command:** `/impeccable adapt`

### [P1] “Live” examples and precision metrics need provenance

**Evidence:** `portfolio-data.ts` stores predetermined terminal steps and metrics (including 7.4 MB, 420 ms, and 38 ms); the UI calls these “LIVE REASONING.” The public MalikClaw README describes startup as under 0.8 seconds, so the 38 ms figure needs a distinct benchmark definition, environment, and reproducible source.  
**Impact:** A technically sophisticated recruiter may interpret the trace as a real execution and the numbers as directly measured, which can undermine trust.  
**Fix:** Label fixed traces “Example run” or “Recorded demo”; if live, expose real demo status and errors. Link every benchmark to a repeatable script/report, machine, version, and methodology. Replace “production” / “enterprise” unless actual use or deployment supports it. Describe A2AS certification as belonging to the linked agent, not as a personal professional credential.  
**Suggested command:** `/impeccable clarify`

### [P1] Name and production-host identity are inconsistent

**Evidence:** The hero says “Muhammad Abdullah Malik”; the public GitHub profile name is “Muhammad Abdullah Athar”; the resume already shows both. The linked live site is the `-five` Vercel host, while metadata/Open Graph/schema and sitemap use the non-`-five` host. Both hosts return HTTP 200.  
**Impact:** Recruiters and search engines can see conflicting identity/canonical signals, and links can split traffic.  
**Fix:** Choose one preferred display name (show the other as an explicit alternate if needed) and one canonical host. Align hero, resume, GitHub profile, metadata, structured data, sitemap, and repository homepage; redirect the alternate host.  
**Suggested command:** `/impeccable clarify`

### [P1] Project cards are click-only non-semantic containers

**Evidence:** `Projects.tsx` makes each other-project `motion.div` clickable to open a modal, but the container has no button/link semantics or keyboard focus.  
**Impact:** Keyboard and screen-reader users may not discover or open those projects.  
**Fix:** Use a semantic button/link for the card action, visible focus, and an accessible dialog with predictable Escape/close focus behavior.  
**Suggested command:** `/impeccable audit`

### [P2] Too much content and too many visual signals dilute the story

**Evidence:** The homepage spans 11 content sections, seven top-level desktop navigation labels, three flagship case studies, a broad project catalog, and a 37-item badge registry; the site also includes chatbot, WhatsApp, terminal, context menu, PWA, and command-palette affordances.  
**Impact:** Visitors spend attention navigating your interface instead of judging your engineering. Repeated neon/glass styling makes every proof point look equally important.  
**Fix:** Focus the home page on five blocks: clear role/value statement, three best projects, concise background/skills, selected proof, and resume/contact. Put the full badge list on a secondary page. Keep one primary CTA (“View résumé”) and one secondary CTA (“Explore projects”). Use a more distinctive MalikClaw visual—real hardware/demo imagery and a measured benchmark graphic—while reducing repeated shimmer/glow effects.  
**Suggested command:** `/impeccable distill`

## Persona Red Flags

- **Jordan, first-time recruiter:** Must infer what “Digital FTE,” “MCP,” “A2AS,” and “autonomous systems” mean; the changing typewriter title cycles between student and specialist roles. A static role statement and plain-language one-sentence project outcomes would reduce doubt.
- **Casey, mobile visitor:** At 420x676, floating controls cover content and the project card begins with several dense tabs/badges. The page needs a no-overlap small-screen layout and a shorter path to résumé and GitHub.
- **Riley, skeptical technical reviewer:** Will notice hard-coded “LIVE REASONING” scenarios and metric differences across the portfolio and repository. Clear labels and reproducible benchmarks are essential.

## Minor Observations

- GitHub currently reports 19 MalikClaw stars; the page's “16+” remains true but looks stale. Prefer a dynamic badge or a dated snapshot.
- `frontend/README.md` says Next.js 16; `package.json` pins Next.js 15.5.7.
- The Chatbot CTA successfully opens the assistant; the feature exists, but it should not compete with the resume CTA.
- Several sections repeat stack names and badges; shorten copy and explain only the few acronyms that are central to the role.

## Capability Roadmap

1. **Trust and conversion:** Make the résumé and selected project evidence the main path. For each flagship: state your contribution, demo/source links, project status, tests/CI, and reproducible impact.
2. **Mobile and accessibility:** Remove widget overlap, make every interactive card keyboard-accessible, add visible focus, and honor `prefers-reduced-motion` across shimmer/background/typewriter animations.
3. **Proof-led project demos:** Prefer a short real recording or bounded sample-data sandbox with explicit “demo data” labeling over simulated terminals presented as live execution.
4. **Measure before adding features:** Check mobile usability, resume clicks, outbound GitHub clicks, and contact completions. Do not add more floating helpers until these core paths work clearly.

## Recommended Actions

1. `/impeccable adapt` — fix 420px mobile overlaps and small-screen project-card layout.
2. `/impeccable clarify` — align identity/domain, role labels, project status, and “live”/benchmark claims.
3. `/impeccable audit` — fix semantic keyboard access and motion/accessibility gaps.
4. `/impeccable distill` — reduce sections, badge noise, and competing CTAs.
5. `/impeccable polish` — verify the final hierarchy and responsive fit.
