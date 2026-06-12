'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react';

interface LinkedInPost {
  id: string;
  title: string;
  category: string;
  thumbnail?: string | null;
  postUrl: string;
  publishedAt: string;
}

const CATEGORIES = ['All', 'AI Engineering', 'LangChain', 'LangGraph', 'RAG', 'AI Agents', 'Machine Learning'];

export default function LinkedInSection() {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/linkedin')
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
        }
      })
      .catch((err) => console.log('LinkedIn posts fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  if (loading) {
    return (
      <div className="w-full py-12 text-center text-xs text-text-tertiary">
        Synchronizing LinkedIn feed entries...
      </div>
    );
  }

  return (
    <section id="linkedin-content" className="py-20 bg-bg-tertiary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-2">
            <svg className="w-7 h-7 text-accent-teal fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn Share Streams
          </h2>
          <div className="w-16 h-1 bg-accent-teal mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Summaries of technical guides, engineering write-ups, and industry reviews I share on LinkedIn.
          </p>
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all duration-300 ${
                activeCategory === c
                  ? 'bg-accent-teal text-white border-accent-teal shadow-md'
                  : 'bg-bg-primary text-text-secondary border-border-color hover:border-accent-teal hover:text-accent-teal'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Posts Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-bg-primary border border-border-color hover:border-accent-teal/40 transition-all flex flex-col justify-between shadow-sm relative group overflow-hidden"
              >
                {/* Visual Header */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold bg-accent-teal/10 text-accent-teal px-2 py-0.5 rounded uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-text-tertiary flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-text-primary group-hover:text-accent-teal transition-colors line-clamp-3 leading-relaxed mb-4">
                    {post.title}
                  </h3>
                </div>

                {/* Read Button */}
                <div className="border-t border-border-color/60 pt-4 mt-auto flex items-center justify-between text-xs font-semibold text-text-secondary group-hover:text-accent-teal transition-colors">
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:underline"
                  >
                    Read on LinkedIn
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="absolute top-0 right-0 w-16 h-16 bg-accent-teal/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="py-12 text-center text-sm text-text-tertiary">
            No posts logged in this category yet.
          </div>
        )}

      </div>
    </section>
  );
}
