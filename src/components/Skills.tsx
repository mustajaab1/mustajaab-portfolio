'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Database, Code, ShieldCheck, BarChart3, Wrench } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: 'Generative AI',
    icon: <BrainCircuit className="w-5 h-5 text-accent-teal" />,
    skills: ['LangChain', 'LangGraph', 'LlamaIndex', 'RAG', 'Prompt Engineering', 'Agentic AI', 'LLMOps'],
    color: 'border-accent-teal/30 hover:border-accent-teal/80 bg-accent-teal/5',
    tagColor: 'bg-accent-teal/10 text-accent-teal border-accent-teal/20',
  },
  {
    title: 'Machine Learning',
    icon: <ShieldCheck className="w-5 h-5 text-accent-purple" />,
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn'],
    color: 'border-accent-purple/30 hover:border-accent-purple/80 bg-accent-purple/5',
    tagColor: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
  },
  {
    title: 'Data Science',
    icon: <BarChart3 className="w-5 h-5 text-accent-cyan" />,
    skills: ['Pandas', 'NumPy', 'EDA', 'Feature Engineering'],
    color: 'border-accent-cyan/30 hover:border-accent-cyan/80 bg-accent-cyan/5',
    tagColor: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
  },
  {
    title: 'Databases & Vector DBs',
    icon: <Database className="w-5 h-5 text-accent-indigo" />,
    skills: ['PostgreSQL', 'Pinecone', 'ChromaDB', 'FAISS'],
    color: 'border-accent-indigo/30 hover:border-accent-indigo/80 bg-accent-indigo/5',
    tagColor: 'bg-accent-indigo/10 text-accent-indigo border-accent-indigo/20',
  },
  {
    title: 'Web Development',
    icon: <Code className="w-5 h-5 text-accent-purple" />,
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
    color: 'border-accent-purple/30 hover:border-accent-purple/80 bg-accent-purple/5',
    tagColor: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
  },
  {
    title: 'Developer Tools',
    icon: <Wrench className="w-5 h-5 text-accent-teal" />,
    skills: ['Git', 'GitHub', 'OpenCV', 'Streamlit'],
    color: 'border-accent-teal/30 hover:border-accent-teal/80 bg-accent-teal/5',
    tagColor: 'bg-accent-teal/10 text-accent-teal border-accent-teal/20',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-bg-primary grid-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Technical Stack
          </h2>
          <div className="w-16 h-1 bg-accent-teal mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto text-base sm:text-lg">
            Categorized skills and technologies I work with daily to build production applications.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`p-6 rounded-2xl bg-bg-tertiary border transition-all duration-300 shadow-sm relative group overflow-hidden ${category.color}`}
            >
              {/* Category Title & Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-bg-secondary border border-border-color group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg text-text-primary group-hover:translate-x-1 transition-transform duration-300">
                  {category.title}
                </h3>
              </div>

              {/* Skills List tags */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors duration-300 ${category.tagColor} hover:bg-opacity-20`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
