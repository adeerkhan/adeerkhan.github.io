import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Mono } from "next/font/google";

import { SmoothCursor } from "@/components/primitives/SmoothCursor";

import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const seoData = {
  title: "Adeer Khan | AI & Machine Learning Researcher",
  siteName: "Adeer Khan Portfolio",
  author: "Adeer Khan",
  description:
    "AI & Machine Learning Researcher. MSc in Civil & Environmental Engineering (KAIST). Research on generative AI for automated building design and LLM-integrated digital twins.",
  keywords: [
    "Adeer Khan",
    "adeerkhan",
    "AI Research",
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "Digital Twins",
    "Large Language Models",
    "Computer Vision",
    "AEC",
    "Automated Building Design",
    "KAIST",
    "Python",
    "PyTorch",
    "Portfolio",
  ],
  url: "https://adeerkhan.github.io",
  image: "/og.png",
};

export const metadata: Metadata = {
  metadataBase: new URL(seoData.url),
  title: seoData.title,
  description: seoData.description,
  applicationName: seoData.siteName,
  authors: [{ name: seoData.author, url: seoData.url }],
  creator: seoData.author,
  publisher: seoData.author,
  keywords: seoData.keywords,
  other: {
    title: seoData.title,
  },
  alternates: {
    canonical: seoData.url,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seoData.url,
    siteName: seoData.siteName,
    title: seoData.title,
    description: seoData.description,
    images: [
      {
        url: seoData.image,
        width: 1200,
        height: 630,
        alt: seoData.author,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoData.title,
    description: seoData.description,
    images: [seoData.image],
    creator: "@AdeerKhan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceMono.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-terminal-bg text-terminal-text antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.add("light")}catch(e){}})()`,
          }}
        />
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
