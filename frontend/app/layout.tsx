import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatbotWidget from "./components/ChatbotWidget";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import CommandPalette from "./components/CommandPalette";
import ContextMenu from "./components/ContextMenu";
import DeveloperTerminal from "./components/DeveloperTerminal";
import ClientProviders from "./components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-ai-assistant-of-malik.vercel.app'),
  title: "Abdullah Malik — Agentic AI Engineer & Data Scientist",
  description: "Portfolio of Abdullah Malik (Muhammad Abdullah Athar) — Agentic AI Engineer & BS Data Science student at Islamia University of Bahawalpur (IUB). Creator of MalikClaw (Go edge runtime, 16+ GitHub stars), Digital FTEs, and MCP tooling.",
  keywords: [
    "Abdullah Malik", "Muhammad Abdullah Athar", "BS Data Science IUB", 
    "Islamia University of Bahawalpur", "Agentic AI Engineer", "MalikClaw", 
    "GitHub Starstruck", "Model Context Protocol", "MCP", "Digital FTE", 
    "Go", "Golang", "Python AsyncIO", "TypeScript", "Next.js", "Autonomous Agents"
  ],
  authors: [{ name: "Abdullah Malik", url: "https://portfolio-ai-assistant-of-malik.vercel.app/" }],
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
    title: "Abdullah Malik — Agentic AI Engineer & Data Scientist",
    description: "BS Data Science student at IUB & Agentic AI Specialist. Creator of MalikClaw (Go edge runtime, 16+ GitHub stars), Digital FTEs, and MCP tooling.",
    url: "https://portfolio-ai-assistant-of-malik.vercel.app/",
    siteName: "Abdullah Malik Portfolio",
    type: "profile",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Abdullah Malik (Muhammad Abdullah Athar) — Agentic AI Engineer & Data Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Malik — Agentic AI Engineer & Data Scientist",
    description: "BS Data Science @ IUB | Creator of MalikClaw (<10MB RAM Go Edge Runtime, 16+ Stars) | A2AS Behavior Certified",
    creator: "@Ab4695Athar",
    images: ["/profile.jpg"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Abdullah Malik Portfolio",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/profile.jpg", sizes: "192x192", type: "image/jpeg" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/profile.jpg", sizes: "180x180", type: "image/jpeg" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
        "@id": "https://portfolio-ai-assistant-of-malik.vercel.app/#person",
        "name": "Abdullah Malik",
        "alternateName": ["Muhammad Abdullah Athar", "AbdullahMalik17"],
        "url": "https://portfolio-ai-assistant-of-malik.vercel.app/",
        "image": "https://portfolio-ai-assistant-of-malik.vercel.app/profile.jpg",
        "jobTitle": "Agentic AI Engineer & Data Scientist",
        "description": "Agentic AI engineer specializing in autonomous multi-agent systems, lightweight Go edge runtimes (MalikClaw), and Model Context Protocol (MCP). Currently pursuing BS Data Science at Islamia University of Bahawalpur (IUB).",
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
          "GitHub Starstruck Bronze (16+ Stars on MalikClaw)",
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
        "@id": "https://portfolio-ai-assistant-of-malik.vercel.app/#website",
        "url": "https://portfolio-ai-assistant-of-malik.vercel.app/",
        "name": "Abdullah Malik — Agentic AI & Data Science Portfolio",
        "description": "Official engineering portfolio and interactive AI assistant of Abdullah Malik.",
        "publisher": {
          "@id": "https://portfolio-ai-assistant-of-malik.vercel.app/#person"
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
          "@id": "https://portfolio-ai-assistant-of-malik.vercel.app/#person"
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
          <DeveloperTerminal />
          <ContextMenu />
          <ChatbotWidget />
          <PWAInstallPrompt />
          <CommandPalette />
        </ClientProviders>
      </body>
    </html>
  );
}
