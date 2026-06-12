'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Filter, Code, Cpu, Activity, X } from 'lucide-react';
import { trackProjectView } from '@/app/actions';

interface Project {
  id: string;
  name: string;
  categories: string[];
  description: string;
  tech: string[];
  github: string;
  demo: string;
  gradient: string;
  // Case study details
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  challenges: string;
  results: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'pdf-chatbot',
    name: 'AI PDF Chatbot',
    categories: ['GenAI', 'RAG'],
    description: 'LangChain-powered RAG application for semantic document search and conversational interaction with PDFs.',
    tech: ['Python', 'LangChain', 'FAISS', 'OpenAI', 'Streamlit'],
    github: 'https://github.com/mustajaab1/AI-PDF-Chatbot',
    demo: 'https://github.com/mustajaab1/AI-PDF-Chatbot',
    gradient: 'from-teal-500 via-cyan-500 to-indigo-600',
    problem: 'Standard search inside voluminous PDF documents is limited to exact keyword matches, leading to inefficient manual lookup and lack of synthesis across disjoint pages.',
    solution: 'Engineered a Retrieval-Augmented Generation (RAG) system. Documents are chunked using an active recursive splitter, embedded via OpenAI models, indexed into a local FAISS vector-store, and queried dynamically to provide synthesised contextual answers with citation ranges.',
    architecture: ['PDF Upload', 'Text Chunking', 'OpenAI Embeddings', 'FAISS Indexing', 'Context Retrieval', 'GPT Model Synthesis', 'Interactive Chat UI'],
    features: ['Multi-file concurrent upload', 'Recursive boundary chunking', 'Sub-second vector lookup', 'Source page citations', 'Streamed word replies'],
    challenges: 'Handling table formatting inside PDF pages and resolving context-window pollution during complex retrieval.',
    results: 'Enabled users to find specific clauses and insights 10x faster than traditional search, maintaining high relevance scores.',
  },
  {
    id: 'mindmate',
    name: 'MindMate',
    categories: ['NLP', 'Computer Vision'],
    description: 'AI-powered mental health platform using NLP and Computer Vision for emotion detection and wellness recommendations.',
    tech: ['Python', 'OpenCV', 'Machine Learning', 'Streamlit'],
    github: 'https://github.com/mustajaab1/MindMate',
    demo: 'https://github.com/mustajaab1/MindMate',
    gradient: 'from-purple-500 via-pink-500 to-indigo-600',
    problem: 'Mental health assessment tools often rely on static forms which lack objective real-time sentiment evaluation.',
    solution: 'Designed a real-time emotion tracker using OpenCV face landmarks detection paired with NLP text-sentiment extraction to analyze users\' mood shifts and recommend personalized wellness content.',
    architecture: ['Camera Feed', 'OpenCV Face Detection', 'Facial Landmark Analysis', 'Emotion Classification', 'User Journal Entry', 'NLTK Sentiment Score', 'Rule Engine Recommendation'],
    features: ['Real-time facial expression tracking', 'Interactive journal analysis', 'Automated breathing exercises trigger', 'Historical mood analytics charting'],
    challenges: 'Maintaining classification accuracy across variable lighting conditions and managing resource utilization on client webcams.',
    results: 'Achieved an emotion classification accuracy of 88% in standard lighting, lowering response time for custom recommendations to 120ms.',
  },
  {
    id: 'resume-analyzer',
    name: 'AI Resume Analyzer',
    categories: ['NLP', 'GenAI'],
    description: 'Intelligent resume screening and matching system using NLP and LLM technologies.',
    tech: ['Python', 'LangChain', 'Transformers', 'Streamlit'],
    github: 'https://github.com/mustajaab1/AI-Resume-Analyzer',
    demo: 'https://github.com/mustajaab1/AI-Resume-Analyzer',
    gradient: 'from-blue-500 via-indigo-600 to-purple-600',
    problem: 'HR managers waste hundreds of hours manually auditing resumes that fail to align with core job description specifications.',
    solution: 'Developed an automated parser that extracts structured skills and experience from PDFs using LLMs, performing a semantic comparison and highlighting fit ratios and gaps.',
    architecture: ['Resume PDF Input', 'Text Extraction (PyPDF)', 'HuggingFace Named Entity Recognition', 'Job Desc Semantic Matching', 'LangChain Assessment Chains', 'Fit Analysis Dashboard'],
    features: ['Detailed skills extraction matrix', 'Structured gap analysis', 'Automated cover letter recommendations', 'Bulk upload processing'],
    challenges: 'Extracting clean text structure from non-standard multi-column resume PDFs.',
    results: 'Cut down candidate screening workloads by 60% while matching talent based on semantic competence rather than exact wording.',
  },
  {
    id: 'looks-maximizer',
    name: 'LooksMaximizer',
    categories: ['Computer Vision'],
    description: 'Facial analysis application using computer vision and machine learning.',
    tech: ['Python', 'OpenCV', 'NumPy', 'Scikit-learn'],
    github: 'https://github.com/mustajaab1/LooksMaximizer',
    demo: 'https://github.com/mustajaab1/LooksMaximizer',
    gradient: 'from-amber-500 via-orange-500 to-rose-600',
    problem: 'Analyzing facial features for symmetry and proportions usually requires expensive manual annotation by dermatologists or photographers.',
    solution: 'Engineered an OpenCV script that uses Dlib facial landmark predictors to calculate geometric symmetry, angles, and facial index metrics automatically.',
    architecture: ['Portrait Photo Input', 'Face Detection (Dlib)', '68 Landmark Mapping', 'Geometric Proportions Calculation', 'Symmetry Index Estimation', 'Visualization Map Output'],
    features: ['Facial symmetry scoring', 'Jawline angle detection', 'Proportion report cards', 'Symmetry guide overlays'],
    challenges: 'Normalizing rotation, tilt, and scaling variations of head poses in portrait files.',
    results: 'Symmetry calculations are fully completed in less than 300ms, outputting highly consistent reports.',
  },
  {
    id: 'gikify',
    name: 'Gikify',
    categories: ['Full Stack'],
    description: 'Campus marketplace platform built using modern full-stack technologies.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
    github: 'https://github.com/mustajaab1/Gikify',
    demo: 'https://github.com/mustajaab1/Gikify',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    problem: 'GIKI campus lacks a secure, dedicated ecosystem for students to buy, sell, or rent textbooks and household items.',
    solution: 'Built a responsive web application featuring custom authentication, item catalog listings, search matching, and transactional communications.',
    architecture: ['React Client', 'Express REST API Router', 'PostgreSQL Schema', 'Prisma ORM Queries', 'Cloudinary Image CDN', 'Notification Dispatcher'],
    features: ['User verification via GIKI email', 'Item filters and search catalog', 'Real-time chatting with sellers', 'Dashboard management for user listings'],
    challenges: 'Designing real-time messaging sync and securing private endpoint routes.',
    results: 'Supported 100+ active student registrations during the first week of internal deployment and processed transactions smoothly.',
  },
];

const FILTERS = ['All', 'GenAI', 'RAG', 'AI Agents', 'NLP', 'Computer Vision', 'Full Stack'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.categories.includes(activeFilter));

  const handleCardClick = async (project: Project) => {
    setSelectedProject(project);
    // Silent background analytics record
    try {
      await trackProjectView(project.name);
    } catch (err) {
      console.log('Project view record failed', err);
    }
  };

  return (
    <section id="projects" className="py-20 bg-bg-primary grid-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            AI & Engineering Showcase
          </h2>
          <div className="w-16 h-1 bg-accent-teal mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto text-base sm:text-lg">
            A curation of my generative AI projects, NLP search indexers, and full stack systems. Click any card to read the complete technical case study.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-accent-teal text-white border-accent-teal shadow-md shadow-accent-teal/10'
                  : 'bg-bg-tertiary text-text-secondary border-border-color hover:border-accent-teal hover:text-accent-teal'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleCardClick(project)}
                className="group rounded-2xl bg-bg-tertiary border border-border-color hover:border-accent-teal/40 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                {/* Visual Header */}
                <div className={`h-40 w-full bg-gradient-to-tr ${project.gradient} relative flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />
                  <div className="relative z-10 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold tracking-wider text-xl uppercase">
                    {project.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  {/* Category Pill Overlays */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                    {project.categories.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded bg-black/35 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-text-primary mb-2.5 group-hover:text-accent-teal transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack & Action Row */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-bg-secondary text-text-secondary border border-border-color">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-bg-secondary text-text-tertiary border border-border-color">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold text-accent-teal group-hover:text-accent-teal/80 transition-colors pt-2 border-t border-border-color/60">
                      <span>Read Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Case Study Detailed Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-bg-tertiary border border-border-color shadow-2xl p-6 sm:p-8 md:p-10 z-10 no-scrollbar"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl bg-bg-primary hover:bg-bg-secondary text-text-secondary border border-border-color hover:border-accent-teal hover:text-accent-teal transition-all cursor-pointer"
                  aria-label="Close Case Study"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Banner title */}
                <div className="mb-8 pr-10">
                  <div className="flex gap-2 mb-3">
                    {selectedProject.categories.map((c) => (
                      <span key={c} className="text-[10px] font-bold bg-accent-teal/10 text-accent-teal px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {c}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                    {selectedProject.name}
                  </h3>
                </div>

                <hr className="border-border-color/60 mb-8" />

                {/* Grid content sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left case study column (Col 2) */}
                  <div className="md:col-span-2 flex flex-col gap-6">
                    <div>
                      <h4 className="font-bold text-sm uppercase text-accent-teal tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Code className="w-4 h-4" />
                        Problem Statement
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {selectedProject.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm uppercase text-accent-teal tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Cpu className="w-4 h-4" />
                        Solution Implemented
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>

                    {/* Architecture diagram steps */}
                    <div>
                      <h4 className="font-bold text-sm uppercase text-accent-teal tracking-wider mb-4">
                        Architecture Flow Diagram
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 p-4 rounded-2xl bg-bg-primary border border-border-color">
                        {selectedProject.architecture.map((step, idx) => (
                          <React.Fragment key={step}>
                            {idx > 0 && <span className="text-text-tertiary text-xs">→</span>}
                            <span className="px-2.5 py-1.5 rounded-lg bg-bg-tertiary border border-border-color text-xs font-semibold text-text-primary shadow-sm hover:border-accent-teal/50 transition-colors">
                              {step}
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right specs column (Col 1) */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="font-bold text-sm uppercase text-text-primary tracking-wider mb-3">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded bg-bg-secondary text-xs font-bold text-text-secondary border border-border-color">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm uppercase text-text-primary tracking-wider mb-3">
                        Key Features
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {selectedProject.features.map((f) => (
                          <li key={f} className="text-xs text-text-secondary flex items-start gap-1.5 leading-relaxed">
                            <span className="text-accent-teal mt-0.5">•</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-accent-teal/5 border border-accent-teal/20">
                      <h4 className="font-bold text-xs uppercase text-accent-teal tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        Engineering Results
                      </h4>
                      <p className="text-[11px] text-text-secondary leading-relaxed">
                        {selectedProject.results}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 mt-4">
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-bg-secondary border border-border-color hover:border-accent-teal text-text-primary text-xs font-semibold transition-all"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent-teal hover:bg-accent-teal/80 text-white text-xs font-semibold transition-all shadow-md shadow-accent-teal/10"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
