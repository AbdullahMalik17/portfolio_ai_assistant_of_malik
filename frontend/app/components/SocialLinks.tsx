'use client';

import {
  FileText,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Twitter,
  type LucideIcon,
} from 'lucide-react';
import { PERSONAL_INFO } from '@/app/lib/portfolio-data';

interface SocialLinksProps {
  className?: string;
  showLabels?: boolean;
}

interface Link {
  name: string;
  icon: LucideIcon;
  url: string;
  external: boolean;
  ariaLabel: string;
}

const whatsappNumber = PERSONAL_INFO.whatsapp.replace(/[^0-9]/g, '');

const SocialLinks = ({ className = '', showLabels = true }: SocialLinksProps) => {
  const links: Link[] = [
    {
      name: 'GitHub',
      icon: Github,
      url: PERSONAL_INFO.github,
      external: true,
      ariaLabel: "Visit Abdullah Malik's GitHub profile",
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: PERSONAL_INFO.linkedin,
      external: true,
      ariaLabel: "Visit Abdullah Malik's LinkedIn profile",
    },
    {
      name: 'X',
      icon: Twitter,
      url: PERSONAL_INFO.twitter || 'https://x.com/Ab4695Athar',
      external: true,
      ariaLabel: "Visit Abdullah Malik's X profile",
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:${PERSONAL_INFO.email}`,
      external: false,
      ariaLabel: 'Send an email to Abdullah Malik',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        'Hi Abdullah! I visited your portfolio and would like to discuss an AI agent project.'
      )}`,
      external: true,
      ariaLabel: 'Message Abdullah Malik on WhatsApp',
    },
    {
      name: 'Resume',
      icon: FileText,
      url: '/Abdullah_resume.pdf',
      external: true,
      ariaLabel: "Download Abdullah Malik's resume PDF",
    },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {links.map(({ name, icon: Icon, url, external, ariaLabel }) => (
        <a
          key={name}
          href={url}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="group flex items-center gap-2 rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-[13px] font-medium text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
          aria-label={ariaLabel}
        >
          <Icon className="h-4 w-4 shrink-0 text-accent" />
          {showLabels && <span>{name}</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
