'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Award, CheckCircle, ChevronRight, Trophy } from 'lucide-react';

const TIMELINE_YEARS = [
  {
    year: '2023',
    title: 'GIKI BS Software Engineering',
    desc: 'Started academic studies in Software Engineering at Ghulam Ishaq Khan Institute (GIKI), building foundations in algorithms and system designs.',
  },
  {
    year: '2024',
    title: 'Tech Leadership Roles',
    desc: 'Began heading technical divisions in student societies. Spearheaded campus portals and organized multi-event web dashboards.',
  },
  {
    year: '2025',
    title: 'Started Building AI Apps',
    desc: 'Pivoted focus toward Generative AI, building chatbots, machine learning models, and exploring vector search systems.',
  },
  {
    year: '2026',
    title: 'Advanced AI Focus',
    desc: 'Mastering Agentic workflows, multi-document RAG, LangChain, and collaborative workflows in LangGraph.',
  },
  {
    year: 'Future',
    title: 'AI / GenAI Engineer',
    desc: 'Driving business automation through production-ready AI agents and high-fidelity LLMOps architectures.',
  },
];

const LEADERSHIP_ROLES = [
  {
    organization: 'Microsoft Learn Student Club GIKI',
    progression: [
      { role: 'Learning & Development Head', duration: 'Present' },
      { role: 'Tech Head', duration: 'Past' },
      { role: 'Web Development Team Member', duration: 'Past' },
    ],
    bullets: [
      'Managed and directed a 20-member tech and learning team.',
      'Organized large-scale academic bootcamps, workshops, and technical webinars.',
      'Boosted overall student learning engagement metrics by 30% to 50%.',
    ],
  },
  {
    organization: 'SOPHEP GIKI',
    progression: [
      { role: 'Tech Head', duration: 'Present' },
      { role: 'GIMUN Liaison Head', duration: 'Past' },
      { role: 'Tech & Sponsorship Subhead', duration: 'Past' },
    ],
    bullets: [
      'Managed 50-member team spanning logistics, tech, and operations.',
      'Built a centralized web registration and ticketing portal supporting 1,000+ attendees.',
      'Automated check-ins and reduced administrative manual work by over 40%.',
    ],
  },
];

export default function Experience() {
  const [activeYearIndex, setActiveYearIndex] = useState(3); // Default to 2026

  return (
    <section id="experience" className="py-20 bg-bg-tertiary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Experience & Journey
          </h2>
          <div className="w-16 h-1 bg-accent-teal mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto text-base sm:text-lg">
            My career timeline and leadership history building tech solutions in the university ecosystem.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Interactive Career Timeline (Col 5) */}
          <div className="lg:col-span-5">
            <h3 className="text-xl font-bold mb-6 text-text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent-teal" />
              Career Timeline
            </h3>

            <div className="flex flex-col gap-4">
              {/* Year Selectors */}
              <div className="flex flex-row overflow-x-auto pb-2 gap-2 no-scrollbar border-b border-border-color/60 lg:border-b-0 lg:flex-col lg:border-l lg:border-border-color/60 lg:pl-4">
                {TIMELINE_YEARS.map((t, idx) => {
                  const isActive = activeYearIndex === idx;
                  return (
                    <button
                      key={t.year}
                      onClick={() => setActiveYearIndex(idx)}
                      className={`px-4 py-2 text-left rounded-xl transition-all duration-300 text-sm font-semibold cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-accent-teal/10 text-accent-teal border-l-2 border-accent-teal lg:-ml-[18px]'
                          : 'text-text-secondary hover:text-accent-teal'
                      }`}
                    >
                      <span className="block text-xs font-bold opacity-60 uppercase">{t.year === 'Future' ? 'Goal' : 'Year'}</span>
                      {t.year}
                    </button>
                  );
                })}
              </div>

              {/* Year Description Card */}
              <div className="p-6 rounded-2xl bg-bg-primary border border-border-color mt-4 relative overflow-hidden min-h-[160px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeYearIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h4 className="font-bold text-lg text-text-primary mb-2">
                      {TIMELINE_YEARS[activeYearIndex].title}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {TIMELINE_YEARS[activeYearIndex].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-teal/5 rounded-full blur-xl pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Leadership Roles (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h3 className="text-xl font-bold mb-2 text-text-primary flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent-teal" />
              Leadership Experience
            </h3>

            {LEADERSHIP_ROLES.map((role) => (
              <motion.div
                key={role.organization}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-bg-primary border border-border-color shadow-sm relative overflow-hidden"
              >
                {/* Header */}
                <div className="mb-4">
                  <h4 className="font-bold text-lg text-text-primary">
                    {role.organization}
                  </h4>
                  {/* Progression tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {role.progression.map((p, pIdx) => (
                      <span
                        key={p.role}
                        className={`text-xs px-2.5 py-1 rounded-md border flex items-center gap-1 ${
                          pIdx === 0
                            ? 'bg-accent-teal/10 text-accent-teal border-accent-teal/20 font-bold'
                            : 'bg-bg-secondary text-text-secondary border-border-color'
                        }`}
                      >
                        {pIdx > 0 && <ChevronRight className="w-3 h-3 text-text-tertiary" />}
                        {p.role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <ul className="flex flex-col gap-2.5 mt-5">
                  {role.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-text-secondary leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-accent-teal mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
