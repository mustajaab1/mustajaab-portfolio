'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Flame, ShieldAlert, CheckSquare, Target, Lightbulb, Compass, Award } from 'lucide-react';

interface PublicUpdate {
  id: string;
  focus: string;
  streak: number;
  experiment: string;
  win: string;
  lesson: string;
  createdAt: string;
}

const NOW_LEARNING = [
  {
    area: 'LangGraph Workflows',
    progress: 85,
    roadmap: 'State graphs, routing functions, agent loops, parallel node execution.',
    project: 'AI Chat Assistant',
    milestone: 'Completed cyclic graph conditional router implementation.',
  },
  {
    area: 'RAG Systems',
    progress: 95,
    roadmap: 'Parent document retrieval, summary retrieval, hybrid keyword/vector search.',
    project: 'AI PDF Chatbot',
    milestone: 'Integrated FAISS indexing with citation retrieval.',
  },
  {
    area: 'Agentic AI',
    progress: 80,
    roadmap: 'Function calling tools, goal execution plans, memory persistence.',
    project: 'AI Resume Analyzer',
    milestone: 'Built automated resume parser utilizing tool-calling schemas.',
  },
  {
    area: 'LLMOps',
    progress: 70,
    roadmap: 'Model monitoring, prompt caching, evaluation frameworks (Ragas).',
    project: 'Portfolio Chatbot API',
    milestone: 'Configured request token counting & rate-limiting middleware.',
  },
  {
    area: 'Vector Databases',
    progress: 90,
    roadmap: 'HNSW indices, cosine similarity, metadata tagging, database scaling.',
    project: 'AI PDF Chatbot',
    milestone: 'Successfully deployed Pinecone & ChromaDB collections.',
  },
  {
    area: 'Advanced NLP',
    progress: 75,
    roadmap: 'Entity extraction, transformer fine-tuning, sequence modeling.',
    project: 'MindMate',
    milestone: 'Implemented custom facial landmarks geometry tracker.',
  },
];

const ROADMAP_DAYS = [
  { day: 'Day 1', title: 'Foundations', desc: 'Deep dive into Python LLM bindings, API token configurations, and system prompt formatting.' },
  { day: 'Day 15', title: 'RAG Applications', desc: 'Implementing vector similarity algorithms, recursive chunking splitters, and semantic retrieval.' },
  { day: 'Day 30', title: 'AI Agents', desc: 'Developing automated tool-use binds, feedback reasoning loops, and function parameters validation.' },
  { day: 'Day 60', title: 'LangGraph Workflows', desc: 'Structuring stateful multi-agent systems, conditional routers, and task execution handoffs.' },
  { day: 'Day 90', title: 'Production AI Systems', desc: 'Model evaluation checks, low-latency prompt cache, security guardrails, and cloud deployment.' },
];

export default function BuildingInPublic() {
  const [updates, setUpdates] = useState<PublicUpdate[]>([]);
  const [streak, setStreak] = useState(42);

  useEffect(() => {
    fetch('/api/building-in-public')
      .then((res) => res.json())
      .then((data) => {
        if (data.updates) {
          setUpdates(data.updates);
          if (data.updates.length > 0) {
            setStreak(data.updates[0].streak);
          }
        }
      })
      .catch((err) => console.log('Building in public fetch error:', err));
  }, []);

  return (
    <section id="building-in-public" className="py-20 bg-bg-primary grid-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-2">
            <Flame className="w-8 h-8 text-orange-500 animate-pulse" />
            Building in Public
          </h2>
          <div className="w-16 h-1 bg-accent-teal mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Documenting my engineering roadmap, daily coding streaks, and latest experiment breakthroughs as I construct intelligent systems.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Currently Learning Roadmap (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6 text-text-primary flex items-center gap-2">
                <Compass className="w-5 h-5 text-accent-teal" />
                Active Learning Roadmap
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {NOW_LEARNING.map((item) => (
                  <div key={item.area} className="p-5 rounded-2xl bg-bg-tertiary border border-border-color shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-sm text-text-primary">{item.area}</h4>
                        <span className="text-xs font-bold text-accent-teal">{item.progress}%</span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="h-1.5 w-full bg-bg-secondary rounded-full mb-4 overflow-hidden">
                        <div
                          className="h-full bg-accent-teal rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      
                      <p className="text-xs text-text-secondary leading-relaxed mb-3">
                        <strong>Concepts:</strong> {item.roadmap}
                      </p>
                    </div>

                    <div className="text-[10px] text-text-tertiary border-t border-border-color/60 pt-2.5 mt-2 flex justify-between font-semibold">
                      <span>Project: {item.project}</span>
                      <span className="text-accent-cyan">Milestone Complete</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 90-Day Journey Progress */}
            <div className="p-6 rounded-2xl bg-bg-tertiary border border-border-color shadow-sm">
              <h3 className="text-sm font-bold uppercase text-text-tertiary tracking-wider mb-6 flex items-center gap-2">
                <Award className="w-4 h-4 text-accent-teal" />
                90-Day AI Engineer Timeline
              </h3>

              <div className="relative border-l border-border-color/80 pl-6 ml-4 flex flex-col gap-6">
                {ROADMAP_DAYS.map((r) => (
                  <div key={r.day} className="relative">
                    {/* Circle Node indicator */}
                    <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-accent-teal border-2 border-bg-tertiary shadow" />
                    <span className="text-[10px] font-bold text-accent-teal block mb-0.5">{r.day}</span>
                    <h5 className="font-bold text-sm text-text-primary mb-1">{r.title}</h5>
                    <p className="text-xs text-text-secondary leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Logs (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <Terminal className="w-5 h-5 text-accent-teal" />
                Developer Logs
              </h3>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 text-xs font-bold">
                <Flame className="w-4 h-4 fill-orange-500 animate-pulse" />
                <span>{streak} Day Streak</span>
              </div>
            </div>

            {/* Terminal logs list */}
            <div className="flex flex-col gap-6 overflow-y-auto max-h-[850px] pr-2 no-scrollbar">
              {updates.map((update, idx) => (
                <div
                  key={update.id}
                  className="p-5 rounded-2xl bg-bg-tertiary border border-border-color shadow-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent-teal" />
                  
                  {/* Log timestamp */}
                  <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider block mb-3">
                    Log Entry #{updates.length - idx} • {new Date(update.createdAt).toLocaleDateString()}
                  </span>

                  {/* Core items */}
                  <div className="flex flex-col gap-4 text-xs">
                    <div>
                      <span className="font-bold text-text-primary uppercase tracking-wide text-[10px] text-accent-teal block mb-1 flex items-center gap-1">
                        <Target className="w-3.5 h-3.5" />
                        Current Focus:
                      </span>
                      <p className="text-text-secondary leading-relaxed pl-4 border-l border-border-color/60">
                        {update.focus}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-text-primary uppercase tracking-wide text-[10px] text-accent-cyan block mb-1 flex items-center gap-1">
                        <Terminal className="w-3.5 h-3.5" />
                        AI Experiment:
                      </span>
                      <p className="text-text-secondary leading-relaxed pl-4 border-l border-border-color/60 font-mono text-[11px]">
                        {update.experiment}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="font-bold text-text-primary uppercase tracking-wide text-[10px] text-emerald-500 block mb-1 flex items-center gap-1">
                          <CheckSquare className="w-3.5 h-3.5" />
                          Weekly Win:
                        </span>
                        <p className="text-text-secondary leading-relaxed pl-4 border-l border-border-color/60 text-[11px]">
                          {update.win}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-text-primary uppercase tracking-wide text-[10px] text-amber-500 block mb-1 flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5" />
                          Key Lesson:
                        </span>
                        <p className="text-text-secondary leading-relaxed pl-4 border-l border-border-color/60 text-[11px]">
                          {update.lesson}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
