import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import GithubSection from '@/components/GithubSection';
import BuildingInPublic from '@/components/BuildingInPublic';
import LinkedInSection from '@/components/LinkedInSection';
import VisitorImpression from '@/components/VisitorImpression';
import ContactSection from '@/components/ContactSection';
import AiChatbot from '@/components/AiChatbot';
import Footer from '@/components/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';

export default function Home() {
  return (
    <>
      {/* Background tracker capturing visitor device & browser info */}
      <AnalyticsTracker />
      
      {/* Header bar with Dark Mode toggling */}
      <Navbar />
      
      {/* Page Body Sections */}
      <main className="flex-1 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <BuildingInPublic />
        <LinkedInSection />
        <VisitorImpression />
        <ContactSection />
      </main>
      
      {/* Floating AI Chat Assistant */}
      <AiChatbot />
      
      {/* Footer bar with newsletter action */}
      <Footer />
    </>
  );
}
