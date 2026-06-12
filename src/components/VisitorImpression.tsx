'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, FileText, Briefcase, Handshake, Zap } from 'lucide-react';
import Link from 'next/link';

const ROLES_SEEKING = [
  'AI Engineering',
  'Generative AI Development',
  'Machine Learning Engineering',
  'Applied AI Architecture',
  'LLM Systems Engineering',
  'AI Product Development',
];

const AVAILABILITY = [
  {
    icon: <Briefcase className="w-5 h-5 text-accent-teal" />,
    title: 'Internships',
    desc: 'Seeking summer or semester-long remote/on-site internships in AI/ML engineering.',
  },
  {
    icon: <Zap className="w-5 h-5 text-accent-cyan" />,
    title: 'Freelance & Projects',
    desc: 'Available for technical consulting, vector databases setup, and LLM integrations.',
  },
  {
    icon: <Handshake className="w-5 h-5 text-accent-purple" />,
    title: 'Research & Open Source',
    desc: 'Interested in collaborative research papers and contributing to GenAI SDK libraries.',
  },
];

export default function VisitorImpression() {
  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="recruiter-impression" className="py-20 bg-bg-primary grid-bg relative border-t border-border-color/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Roles Seeking (Col 6) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs text-accent-teal uppercase font-bold tracking-wider mb-2 block">
                Recruiter Quick View
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-6 flex items-center gap-2">
                <Target className="w-8 h-8 text-accent-teal animate-pulse" />
                What I&apos;m Looking For
              </h2>
              
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8">
                I am looking to leverage my software engineering discipline and GenAI experimentation history within forward-thinking groups. I am actively pursuing opportunities in:
              </p>

              {/* Roles Badges list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {ROLES_SEEKING.map((role) => (
                  <div
                    key={role}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-bg-tertiary border border-border-color hover:border-accent-teal/40 transition-colors shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent-teal shrink-0" />
                    <span className="text-xs font-bold text-text-primary">{role}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleScrollToContact}
                  className="px-5 py-3 bg-accent-teal hover:bg-accent-teal/80 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-md shadow-accent-teal/10"
                >
                  Initiate Discussion
                </button>
                <Link
                  href="/recruiter"
                  className="px-5 py-3 bg-bg-tertiary border border-border-color hover:border-accent-teal rounded-xl text-xs font-semibold text-text-primary transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-accent-teal" />
                  Evaluate Candidate (3 Min Guide)
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Block: Arrangements Availability (Col 6) */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {AVAILABILITY.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-bg-tertiary border border-border-color shadow-sm flex items-start gap-4 hover:border-accent-teal/30 transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-bg-secondary border border-border-color group-hover:bg-accent-teal/5 group-hover:border-accent-teal/30 transition-all shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base text-text-primary mb-1.5 group-hover:text-accent-teal transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
