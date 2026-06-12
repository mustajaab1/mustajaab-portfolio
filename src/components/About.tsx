'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Brain, Users, Lightbulb } from 'lucide-react';

const CARD_DATA = [
  {
    icon: <GraduationCap className="w-6 h-6 text-accent-teal" />,
    title: 'GIKI Student',
    desc: 'Pursuing BS in Software Engineering (2023 - 2027) at one of Pakistan\'s premier engineering institutes.',
  },
  {
    icon: <Brain className="w-6 h-6 text-accent-purple" />,
    title: 'AI Engineer & Builder',
    desc: 'Specializing in Generative AI, RAG architectures, Agentic workflows, vector search, and LLMOps.',
  },
  {
    icon: <Users className="w-6 h-6 text-accent-cyan" />,
    title: 'Tech Leader',
    desc: 'Heading major tech teams (20+ and 50+ members) in student clubs, building real-world platforms.',
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-accent-indigo" />,
    title: 'Problem Solver',
    desc: 'Passionate about bridging modern AI developments with actual user needs to resolve real-world inefficiencies.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-bg-tertiary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            About Me
          </h2>
          <div className="w-16 h-1 bg-accent-teal mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto text-base sm:text-lg">
            Engineering robust systems at the intersection of classical software engineering and modern generative artificial intelligence.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Bio text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-5 text-text-primary">
                Who is Mustajaab?
              </h3>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4">
                I am a Software Engineering student at Ghulam Ishaq Khan Institute (GIKI) with a deep technical focus on AI. I spend my time building AI agents, experimenting with semantic search indices, and deploying full stack solutions.
              </p>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
                From coding custom web registration systems handling thousands of users to writing multi-agent workflows with LangGraph, I focus on building products that are fast, intuitive, and intelligently automated.
              </p>
              <div className="p-4 rounded-xl bg-bg-primary border border-border-color glass-panel">
                <span className="text-xs text-text-tertiary uppercase font-bold tracking-wider">Current Focus</span>
                <p className="text-sm font-semibold text-accent-teal mt-1">
                  Production LLMOps, Multi-document Vector Indexes, and Agentic Workflows.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Feature Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CARD_DATA.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-bg-primary border border-border-color hover:border-accent-teal/40 transition-all flex flex-col gap-4 shadow-sm group relative overflow-hidden"
              >
                <div className="p-3 w-fit rounded-xl bg-bg-secondary border border-border-color group-hover:bg-accent-teal/5 group-hover:border-accent-teal/30 transition-all">
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-text-primary mb-2 group-hover:text-accent-teal transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent-teal to-accent-cyan group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
