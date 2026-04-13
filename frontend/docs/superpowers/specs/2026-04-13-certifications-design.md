# Design Specification: Professional Certifications Section

## 1. Overview
The goal is to add a professional "Certifications" section to the portfolio to highlight the Panaversity Prompt Engineering certificate and other academic achievements.

## 2. Technical Decisions

### Components
- **Certifications.tsx**: A new client component that renders the certifications grid/list.
- **CertificationCard.tsx**: A reusable sub-component for individual certificate items.

### Data Model
Expand `app/lib/portfolio-data.ts` to include a `CERTIFICATIONS` constant:
```typescript
export const CERTIFICATIONS = [
  {
    title: "Prompt Engineering Specialist",
    issuer: "Panaversity",
    date: "2024",
    description: "Mastered advanced prompt engineering techniques, LLM orchestration, and AI agent development.",
    skills: ["LLM Optimization", "Few-Shot Prompting", "Chain-of-Thought"],
    credentialUrl: "/Muhammad_Abdullah_Certificate.pdf",
    icon: "📜"
  }
];
```

### Layout & Styling
- **Location**: Between `Skills` and `AchievementStats` sections.
- **Styling**: Consistent with existing "glass" and "shimmer" effects.
- **Interactivity**: Framer Motion for entrance animations and hover effects.
- **Asset Handling**: Move `Muhammad_Abdullah_Certificate.pdf` to the `public/` directory for public accessibility.

## 3. Implementation Steps
1. Move `Muhammad_Abdullah_Certificate.pdf` to `public/`.
2. Update `app/lib/portfolio-data.ts` with certification data.
3. Create `app/components/Certifications.tsx` with a professional card design.
4. Integrate `Certifications` into `app/page.tsx`.
5. Add "Certifications" to the `Navbar` quick links.

## 4. Verification
- Verify the PDF link opens correctly.
- Ensure the section is responsive on mobile and desktop.
- Confirm animations are smooth and consistent with other sections.
