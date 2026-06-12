'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import { Search, Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', 'LangGraph Tutorials', 'RAG Deep Dives', 'AI Agents'];

export default function BlogListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-bg-primary pt-32 pb-20 grid-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-accent-teal uppercase tracking-widest block mb-2">
              Building in Public
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">
              Technical Blog & Tutorials
            </h1>
            <p className="text-text-secondary max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
              Deep dives on LangChain structures, multi-agent orchestrations, vector search scaling, and engineering lessons.
            </p>
          </div>

          {/* Search & Category filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-tertiary border border-border-color focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none text-xs sm:text-sm text-text-primary transition-all shadow-sm"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all duration-300 ${
                    selectedCategory === c
                      ? 'bg-accent-teal text-white border-accent-teal shadow-md'
                      : 'bg-bg-tertiary text-text-secondary border-border-color hover:border-accent-teal hover:text-accent-teal'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Cards list */}
          <div className="grid grid-cols-1 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="p-6 sm:p-8 rounded-3xl bg-bg-tertiary border border-border-color hover:border-accent-teal/40 transition-all shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3.5 mb-4 text-xs font-semibold text-text-tertiary">
                    <span className="text-xs bg-accent-teal/10 text-accent-teal px-2.5 py-1 rounded-md uppercase tracking-wider">
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

                  <Link href={`/blog/${post.slug}`} className="group">
                    <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-teal transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border-color/60 pt-4 mt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1.5 text-xs font-bold text-accent-teal hover:text-accent-cyan transition-colors"
                  >
                    Read Tutorial
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-20 bg-bg-tertiary border border-border-color rounded-3xl">
                <BookOpen className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
                <h3 className="font-bold text-text-primary mb-1">No articles found</h3>
                <p className="text-xs text-text-secondary">Try searching for other keywords or categories.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
