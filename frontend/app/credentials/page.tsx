import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import BadgesRegistry from '../components/BadgesRegistry';

export const metadata: Metadata = {
  title: 'Credentials & Verified Badges | Abdullah Malik',
  description:
    'Full audit registry of verified online badges, Grade-A Claude agent skills, Go documentation indexes, and GitHub achievements.',
  openGraph: {
    title: 'Credentials & Verified Badges | Abdullah Malik',
    description:
      'Full audit registry of verified online badges, Grade-A Claude agent skills, and GitHub achievements.',
    url: 'https://portfolio-ai-assistant-of-malik.vercel.app/credentials',
  },
};

export default function CredentialsPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink selection:bg-accent/25 selection:text-ink">
      <Navbar />
      <div className="pt-[var(--nav-h)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-ink-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to portfolio</span>
          </Link>
        </div>
        <BadgesRegistry />
      </div>
    </main>
  );
}
