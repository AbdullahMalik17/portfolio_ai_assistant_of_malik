import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatbotWidget from "./components/ChatbotWidget";
import ThemeToggle from "./components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdullah Malik - Full-Stack Developer & AI Specialist",
  description: "Professional portfolio of Abdullah Malik showcasing expertise in Agentic AI Systems, Full-Stack Development, and Cloud Technologies. Specializing in Next.js, Python, OpenAI Agent SDK, and modern web applications.",
  keywords: [
    "Abdullah Malik",
    "Full-Stack Developer",
    "AI Specialist",
    "Agentic AI",
    "OpenAI Agent SDK",
    "Next.js Developer",
    "React Developer",
    "Python Developer",
    "TypeScript",
    "Portfolio",
    "AI Development",
    "Web Development",
    "Cloud Technologies",
    "Kubernetes",
    "Docker",
  ],
  authors: [{ name: "Abdullah Malik", url: "https://github.com/AbdullahMalik17" }],
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
    type: "website",
    locale: "en_US",
    url: "https://portfolio-ai-assistant-of-malik-five.vercel.app/",
    title: "Abdullah Malik - Full-Stack Developer & AI Specialist",
    description: "Professional portfolio showcasing expertise in Agentic AI Systems, Full-Stack Development with Next.js, Python, and Cloud Technologies.",
    siteName: "Abdullah Malik Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Malik - Full-Stack Developer & AI Specialist",
    description: "Professional portfolio showcasing expertise in Agentic AI Systems and Full-Stack Development",
    creator: "@AbdullahMalik",
  },
  verification: {
    google: "your-google-verification-code", // Add your verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ChatbotWidget />
        <ThemeToggle />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Abdullah Malik",
              jobTitle: "Full-Stack Developer & AI Specialist",
              description: "Professional software developer specializing in Agentic AI Systems, Full-Stack Development, and Cloud Technologies",
              url: "https://portfolio-ai-assistant-of-malik-five.vercel.app/",
              sameAs: [
                "https://github.com/AbdullahMalik17",
                "https://www.linkedin.com/in/muhammad-abdullah-athar",
                "https://www.instagram.com/muhammadabdullah17337/",
              ],
              email: "muhammadabdullah51700@gmail.com",
              knowsAbout: [
                "Artificial Intelligence",
                "Agentic AI",
                "Full-Stack Development",
                "Next.js",
                "React",
                "Python",
                "TypeScript",
                "OpenAI Agent SDK",
                "Cloud Technologies",
                "Kubernetes",
                "Docker",
              ],
              alumniOf: [
                {
                  "@type": "Organization",
                  name: "Panaversity",
                  description: "Agentic AI Development",
                },
                {
                  "@type": "Organization",
                  name: "PIAIC",
                  description: "Artificial Intelligence",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
