'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Download, ArrowRight, Star, GitBranch } from 'lucide-react';

const TYPING_WORDS = ['GenAI Developer', 'Software Engineering Student'];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [stats, setStats] = useState({ stars: 20, repos: 15 });

  // Load stats from our backend API route
  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) {
          setStats({
            stars: data.stats.totalStars || 20,
            repos: data.profile.public_repos || 15,
          });
        }
      })
      .catch((err) => console.log('GitHub stats fetch failed', err));
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = TYPING_WORDS[currentWordIndex];
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullWord) {
          setIsDeleting(true);
          setTypingSpeed(1500); // Wait at end
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
          setTypingSpeed(500); // Wait before typing next
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-12 grid-bg">
      {/* Dynamic Glow Auroras */}
      <div className="aurora-glow aurora-teal top-1/4 left-1/4" />
      <div className="aurora-glow aurora-purple bottom-1/4 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Profile Bio details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-accent-teal/30 text-accent-teal text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-teal animate-ping" />
              Open to Opportunities
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-text-primary leading-tight">
              Building AI Applications <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-accent-teal via-accent-cyan to-accent-indigo bg-clip-text text-transparent">
                That Deliver Real Impact
              </span>
            </h1>

            {/* Typing Subheadline */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start mb-6">
              <span className="text-xl sm:text-2xl font-semibold text-text-secondary">
                I am a{' '}
                <span className="text-accent-teal font-bold typing-cursor">
                  {currentText}
                </span>
              </span>
            </div>

            <p className="text-base sm:text-lg text-text-tertiary max-w-2xl mb-10 leading-relaxed">
              AI Engineer focused on Generative AI, RAG Systems, AI Agents, LangChain, LangGraph, NLP, and Full Stack Development. Let&apos;s build intelligent solutions.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
              <button
                onClick={() => handleScrollTo('projects')}
                className="px-6 py-3.5 bg-accent-teal hover:bg-accent-teal/80 text-white font-semibold rounded-xl transition-all shadow-lg shadow-accent-teal/10 hover:shadow-accent-teal/20 flex items-center justify-center gap-2 cursor-pointer group"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link
                href="/recruiter"
                className="px-6 py-3.5 bg-bg-tertiary hover:bg-bg-secondary text-text-primary border border-border-color hover:border-accent-teal rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                Recruiter Quick Review
              </Link>

              <button
                onClick={() => handleScrollTo('contact')}
                className="px-6 py-3.5 bg-transparent text-text-secondary hover:text-accent-teal font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Contact Me
              </button>
            </div>

            {/* Stats Preview & Social Row */}
            <div className="flex flex-col sm:flex-row items-center gap-8 pt-6 border-t border-border-color/60 w-full justify-between lg:justify-start lg:gap-12">
              {/* Social Icons */}
              <div className="flex gap-4">
                <a
                  href="https://github.com/mustajaab1"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-bg-tertiary border border-border-color hover:border-accent-teal hover:text-accent-teal transition-all shadow-sm flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/mustajaab/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-bg-tertiary border border-border-color hover:border-accent-teal hover:text-accent-teal transition-all shadow-sm flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="mailto:mustajaabx@gmail.com"
                  className="p-3 rounded-xl bg-bg-tertiary border border-border-color hover:border-accent-teal hover:text-accent-teal transition-all shadow-sm flex items-center justify-center"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              {/* Stars & Repos Preview */}
              <div className="flex gap-6 text-sm text-text-secondary font-semibold">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                  <span>{stats.stars} Stars</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GitBranch className="w-4.5 h-4.5 text-accent-cyan" />
                  <span>{stats.repos} Repositories</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Glowing Profile Picture Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative mt-12 lg:mt-0"
          >
            <div className="relative group">
              {/* Backlight Aurora Shadow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent-teal via-accent-cyan to-accent-indigo opacity-75 blur-xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse pointer-events-none" />
              
              {/* Profile Image Border frame */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-1.5 bg-gradient-to-tr from-accent-teal via-accent-cyan to-accent-indigo shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-bg-tertiary border-4 border-bg-tertiary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://github.com/mustajaab1.png"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://github.com/mustajaab1.png';
                    }}
                    alt="Mustajaab Qadri"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Floating micro badges (interactive AI indicators) */}
              {/* <span className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl bg-bg-tertiary border border-border-color shadow-lg text-[10px] font-bold text-accent-teal flex items-center gap-1 animate-bounce duration-1000">
                🚀 AI Builder
              </span>
              <span className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl bg-bg-tertiary border border-border-color shadow-lg text-[10px] font-bold text-accent-cyan flex items-center gap-1">
                💻 Software Eng.
              </span> */}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
