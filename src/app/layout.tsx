import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mustajaab Qadri | AI Engineer & GenAI Developer',
  description:
    'Portfolio of Mustajaab Qadri - AI Engineer and Software Engineering Student specializing in Generative AI, RAG Systems, AI Agents, LangChain, LangGraph, and Full Stack Development.',
  keywords: [
    'AI Engineer',
    'GenAI Developer',
    'LangChain Developer',
    'RAG Developer',
    'Software Engineer',
    'Machine Learning Engineer',
    'Mustajaab Qadri',
    'GIKI Software Engineering',
  ],
  authors: [{ name: 'Mustajaab Qadri', url: 'https://github.com/mustajaab1' }],
  creator: 'Mustajaab Qadri',
  metadataBase: new URL('http://localhost:3000'), // Fallback URL, override in production
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mustajaab.dev', // Placeholder for production
    title: 'Mustajaab Qadri | AI Engineer & GenAI Developer',
    description:
      'AI Engineer focusing on Generative AI, RAG Systems, AI Agents, LangChain, LangGraph, NLP, and Full Stack Development.',
    siteName: 'Mustajaab Qadri Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mustajaab Qadri - AI Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mustajaab Qadri | AI Engineer & GenAI Developer',
    description:
      'AI Engineer focusing on Generative AI, RAG Systems, AI Agents, LangChain, LangGraph, NLP, and Full Stack Development.',
    images: ['/og-image.png'],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
