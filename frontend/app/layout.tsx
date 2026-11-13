import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatbotWidget from "./components/ChatbotWidget";
import InteractiveOverlays from "./components/InteractiveOverlays";
import ClientProviders from "./components/ClientProviders";
import { Analytics } from "@vercel/analytics/next";
import { GITHUB_PROFILE } from "./lib/portfolio-data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | Abdullah Malik`,
  },
  description: SITE_DESCRIPTION,
  applicationName: "Abdullah Malik Portfolio",
  category: "technology",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Abdullah Malik", "Muhammad Abdullah Athar", "BS Data Science IUB", 
    "Islamia University of Bahawalpur", "Agentic AI Engineer", "MalikClaw", 
    "GitHub Starstruck", "Model Context Protocol", "MCP", "Digital FTE", 
    "Go", "Golang", "Python AsyncIO", "TypeScript", "Next.js", "Autonomous Agents"
  ],
  authors: [{ name: "Abdullah Malik", url: SITE_URL }],
  creator: "Abdullah Malik",
  publisher: "Abdullah Malik",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "profile",
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "Abdullah Malik — Agentic AI Engineer. Go edge runtimes, MCP servers and multi-agent systems, with 228 GitHub stars across 32 public repositories.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: `Forward Deployed Engineer | MalikClaw (<10MB RAM Go edge runtime, ${GITHUB_PROFILE.malikclawStars} GitHub stars) | A2AS Behavior Certified`,
    creator: "@Ab4695Athar",
    images: ["/og.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Abdullah Malik",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhanced JSON-LD Schema Graph for Search Engines and AI Crawlers (Perplexity, ChatGPT, Claude)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        "name": "Abdullah Malik",
        "alternateName": ["Muhammad Abdullah Athar", "AbdullahMalik17"],
        "url": `${SITE_URL}/`,
        "image": `${SITE_URL}/profile.jpg`,
        "jobTitle": "Agentic AI Engineer",
        "description": SITE_DESCRIPTION,
        "email": "mailto:muhammadabdullah51700@gmail.com",
        "sameAs": [
          "https://github.com/AbdullahMalik17",
          "https://www.linkedin.com/in/muhammad-abdullah-athar",
          "https://x.com/Ab4695Athar",
          "https://mcpmarket.com/ko/server/malikclaw",
          "https://github.com/users/AbdullahMalik17/achievements/starstruck"
        ],
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "Islamia University of Bahawalpur (IUB)",
            "url": "https://www.iub.edu.pk"
          },
          {
            "@type": "EducationalOrganization",
            "name": "Panaversity",
            "url": "https://panaversity.org"
          },
          {
            "@type": "EducationalOrganization",
            "name": "PIAIC",
            "url": "https://piaic.org"
          }
        ],
        "award": [
          "GitHub Starstruck Bronze Achievement (MalikClaw)",
          "GitHub Pull Shark (Hackathon 2)",
          "GitHub Pair Extraordinaire (Claude Pair Programming)",
          "A2AS Behavior Certificate for AI Agent Security & Governance"
        ],
        "knowsAbout": [
          "Agentic AI Systems",
          "Data Science",
          "Machine Learning",
          "Model Context Protocol (MCP)",
          "Autonomous Multi-Agent Swarms",
          "Digital FTEs",
          "Go (Golang)",
          "Python AsyncIO",
          "TypeScript",
          "Next.js",
          "pgvector",
          "Apache Kafka"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": `${SITE_URL}/`,
        "name": SITE_NAME,
        "description": "Official portfolio and interactive AI assistant of Abdullah Malik, Agentic AI Engineer.",
        "publisher": {
          "@id": `${SITE_URL}/#person`
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "MalikClaw",
        "operatingSystem": "Linux, Raspberry Pi, Android",
        "applicationCategory": "DeveloperApplication",
        "url": "https://malikclaw.vercel.app/",
        "downloadUrl": "https://github.com/AbdullahMalik17/malikclaw",
        "description": "Ultra-lightweight, high-performance edge AI assistant and gateway in Go (<10MB RAM, sub-second boot) with Urdu-First support and MCP standard.",
        "author": {
          "@id": `${SITE_URL}/#person`
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          {children}
          <ChatbotWidget />
          <InteractiveOverlays />
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  );
}
