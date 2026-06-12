'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, FileDown, Printer, Briefcase, Award, ShieldAlert, Cpu } from 'lucide-react';

export default function RecruiterPortal() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-12 px-4 sm:px-6 lg:px-8">
      {/* Print-specific stylesheet wrapper */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          nav, button, footer, .no-print {
            display: none !important;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: transparent !important;
          }
          .print-header {
            border-bottom: 2px solid #000 !important;
            padding-bottom: 12px !important;
          }
          h2, h3, h4 {
            color: black !important;
          }
          a {
            text-decoration: underline !important;
            color: black !important;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto print-container">
        
        {/* Back Link & Printing Row (no-print) */}
        <div className="flex justify-between items-center mb-8 no-print">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent-teal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <div className="flex gap-2">
            <a
              href="/resume.pdf"
              download="Mustajaab_Qadri_Resume.pdf"
              className="px-4 py-2 border border-border-color hover:border-accent-teal hover:text-accent-teal text-text-secondary rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer bg-bg-tertiary shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Print CV
            </a>
            <a
              href="/resume.pdf"
              download="Mustajaab_Qadri_Resume.pdf"
              className="px-4 py-2 bg-accent-teal hover:bg-accent-teal/80 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-accent-teal/10"
            >
              <FileDown className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Resume Body */}
        <div className="p-8 sm:p-10 rounded-3xl bg-bg-tertiary border border-border-color shadow-xl print-container">
          
          {/* Header */}
          <div className="print-header mb-8 pb-6 border-b border-border-color/60">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
                  Mustajaab Qadri
                </h1>
                <p className="text-sm font-bold text-accent-teal mt-1">
                  AI Engineer &bull; GenAI Developer &bull; BS Software Engineering Student
                </p>
              </div>

              <div className="flex flex-col gap-1.5 text-xs text-text-secondary font-medium">
                <a href="mailto:mustajaabx@gmail.com" className="flex items-center gap-1.5 hover:text-accent-teal">
                  <Mail className="w-3.5 h-3.5 text-accent-teal" />
                  mustajaabx@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/mustajaab/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent-teal">
                  <svg className="w-3.5 h-3.5 text-accent-teal fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  linkedin.com/in/mustajaab/
                </a>
                <a href="https://github.com/mustajaab1" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent-teal">
                  <svg className="w-3.5 h-3.5 text-accent-teal fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  github.com/mustajaab1
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 no-print">
            <div className="p-4 rounded-xl bg-accent-teal/5 border border-accent-teal/15">
              <span className="text-[10px] text-accent-teal font-bold uppercase tracking-wide block">Institution</span>
              <span className="text-xs font-bold text-text-primary mt-0.5 block">GIKI Software Engineering</span>
            </div>
            <div className="p-4 rounded-xl bg-accent-cyan/5 border border-accent-cyan/15">
              <span className="text-[10px] text-accent-cyan font-bold uppercase tracking-wide block">Core Focus</span>
              <span className="text-xs font-bold text-text-primary mt-0.5 block">RAG, AI Agents, LangGraph</span>
            </div>
            <div className="p-4 rounded-xl bg-accent-purple/5 border border-accent-purple/15">
              <span className="text-[10px] text-accent-purple font-bold uppercase tracking-wide block">Availability</span>
              <span className="text-xs font-bold text-text-primary mt-0.5 block">Available for Internships</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase text-accent-teal tracking-wider mb-2.5 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              Executive Profile
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Passionate AI Engineer specializing in Generative AI, LLMs, RAG Systems, AI Agents, LangChain, LangGraph, NLP, and Full Stack Development. Focused on translating machine learning milestones into secure, stateful, and enterprise-grade business interfaces.
            </p>
          </div>

          {/* Technical Skills Matrix */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase text-accent-teal tracking-wider mb-3.5 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Technical Skills Matrix
            </h3>
            <div className="flex flex-col gap-3">
              <div>
                <span className="text-[10px] text-text-tertiary font-bold uppercase block mb-1">Generative AI & Models</span>
                <p className="text-xs font-semibold text-text-secondary">
                  LangChain, LangGraph, LlamaIndex, RAG Systems, Prompt Engineering, Agentic AI, LLMOps
                </p>
              </div>
              <div>
                <span className="text-[10px] text-text-tertiary font-bold uppercase block mb-1">Machine Learning & Data</span>
                <p className="text-xs font-semibold text-text-secondary">
                  PyTorch, TensorFlow, Keras, Scikit-learn, Pandas, NumPy, Exploratory Data Analysis, Feature Engineering
                </p>
              </div>
              <div>
                <span className="text-[10px] text-text-tertiary font-bold uppercase block mb-1">Databases & Web Dev</span>
                <p className="text-xs font-semibold text-text-secondary">
                  PostgreSQL, Pinecone, ChromaDB, FAISS, React, Next.js, Node.js, JavaScript, TypeScript, Tailwind CSS, Streamlit
                </p>
              </div>
            </div>
          </div>

          {/* Project Highlights Case studies */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase text-accent-teal tracking-wider mb-4 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              Project Highlights
            </h3>

            <div className="flex flex-col gap-5">
              <div className="p-4 rounded-xl bg-bg-primary border border-border-color">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm text-text-primary">AI PDF Chatbot</h4>
                  <span className="text-[10px] font-bold text-accent-teal uppercase">RAG System</span>
                </div>
                <p className="text-[11px] text-text-tertiary mb-2">Python, LangChain, FAISS, OpenAI, Streamlit</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong>Problem:</strong> Context window limitations and slow search times in large PDF texts.<br />
                  <strong>Solution:</strong> Deployed hierarchical recursive splitting and semantic index caching using FAISS, slashing page query latency to sub-seconds.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-bg-primary border border-border-color">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm text-text-primary">MindMate</h4>
                  <span className="text-[10px] font-bold text-accent-purple uppercase">Computer Vision / NLP</span>
                </div>
                <p className="text-[11px] text-text-tertiary mb-2">Python, OpenCV, Machine Learning</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong>Problem:</strong> Standard assessments lack real-time physiological indicators.<br />
                  <strong>Solution:</strong> Built real-time OpenCV landmarks capture that tracks micro-expressions alongside journal sentiment index parsing to customize recommendation feeds.
                </p>
              </div>
            </div>
          </div>

          {/* Leadership Progression */}
          <div>
            <h3 className="text-sm font-bold uppercase text-accent-teal tracking-wider mb-4 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Leadership Experience
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-l-2 border-accent-teal/40 pl-3">
                <div>
                  <h4 className="font-bold text-xs text-text-primary">Microsoft Learn Student Club GIKI</h4>
                  <p className="text-[10px] text-text-secondary">Learning & Development Head | Tech Head | Web Member</p>
                </div>
                <span className="text-[10px] text-text-tertiary font-bold sm:text-right">Led 20-member team &bull; Increased engagement 30-50%</span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-l-2 border-accent-teal/40 pl-3">
                <div>
                  <h4 className="font-bold text-xs text-text-primary">SOPHEP GIKI</h4>
                  <p className="text-[10px] text-text-secondary">Tech Head | GIMUN Liaison Head | Tech Subhead</p>
                </div>
                <span className="text-[10px] text-text-tertiary font-bold sm:text-right">Managed 50-member team &bull; Built portal for 1,000+ users</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
