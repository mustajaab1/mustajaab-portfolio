import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blog-data';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found | Mustajaab Qadri Blog',
    };
  }

  return {
    title: `${post.title} | Mustajaab Qadri Technical Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Mustajaab Qadri'],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Google Article Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': post.title,
    'description': post.excerpt,
    'datePublished': post.publishedAt,
    'author': {
      '@type': 'Person',
      'name': 'Mustajaab Qadri',
      'url': 'https://github.com/mustajaab1',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Mustajaab Qadri Portfolio',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://mustajaab.dev/og-image.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://mustajaab.dev/blog/${post.slug}`,
    },
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />

      <main className="min-h-screen bg-bg-primary pt-32 pb-20 grid-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent-teal transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Tutorials
            </Link>
          </div>

          {/* Article Header info */}
          <header className="mb-10 pb-6 border-b border-border-color/60">
            <div className="flex items-center gap-3 mb-4 text-xs font-bold text-text-tertiary uppercase tracking-wider">
              <span className="text-xs bg-accent-teal/10 text-accent-teal px-2.5 py-1 rounded-md">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight mb-4">
              {post.title}
            </h1>
            
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
              {post.excerpt}
            </p>
          </header>

          {/* Article content parsed from Markdown */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Recruiter CTA card at the bottom */}
          <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-bg-tertiary border border-border-color/80 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h4 className="font-extrabold text-base text-text-primary mb-1">
                  Evaluating Mustajaab for your team?
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Read his 3-minute recruiter brief, review his skills matrix, or download his resume.
                </p>
              </div>
              <Link
                href="/recruiter"
                className="px-4.5 py-2.5 bg-accent-teal hover:bg-accent-teal/80 text-white rounded-xl text-xs font-bold transition-all shadow-md shrink-0"
              >
                Open Recruiter Hub
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
