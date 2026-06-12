'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquareCode, CheckCircle, AlertTriangle } from 'lucide-react';
import { submitContactForm } from '@/app/actions';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await submitContactForm(null, formData);
      setStatus({
        success: result.success,
        message: result.message,
      });

      if (result.success) {
        // Trigger recruiter delight confetti animation
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#14b8a6', '#06b6d4', '#6366f1'],
        });
        // Clear form
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus({
        success: false,
        message: 'Something went wrong, please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-bg-tertiary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-2.5">
            <MessageSquareCode className="w-8 h-8 text-accent-teal" />
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-accent-teal mx-auto rounded-full mb-6" />
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Have a project idea, an open internship opportunity, or want to discuss generative AI architecture? Leave a message!
          </p>
        </div>

        {/* Form & Info Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Info Details Column (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="p-6 rounded-2xl bg-bg-primary border border-border-color shadow-sm h-full flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xl text-text-primary mb-4">Contact Details</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-8">
                  Feel free to reach out via email directly or connect through professional socials. I will respond to your inquiry within 24 hours.
                </p>

                <div className="flex flex-col gap-5">
                  <a
                    href="mailto:mustajaabx@gmail.com"
                    className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-bg-secondary/60 border border-transparent hover:border-border-color/60 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-bg-secondary border border-border-color text-accent-teal group-hover:bg-accent-teal group-hover:text-white transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-text-tertiary block font-bold uppercase tracking-wide">Email</span>
                      <span className="text-xs sm:text-sm font-semibold text-text-primary">mustajaabx@gmail.com</span>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/mustajaab/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-bg-secondary/60 border border-transparent hover:border-border-color/60 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-bg-secondary border border-border-color text-accent-cyan group-hover:bg-accent-cyan group-hover:text-white transition-all">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-tertiary block font-bold uppercase tracking-wide">LinkedIn</span>
                      <span className="text-xs sm:text-sm font-semibold text-text-primary">linkedin.com/in/mustajaab/</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-3.5 p-3 rounded-xl border border-transparent">
                    <div className="p-2.5 rounded-lg bg-bg-secondary border border-border-color text-accent-purple">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-text-tertiary block font-bold uppercase tracking-wide">Location</span>
                      <span className="text-xs sm:text-sm font-semibold text-text-primary">GIKI, Pakistan / Multan, Pakistan</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recruiter availability sign */}
              <div className="p-4 rounded-xl bg-accent-teal/5 border border-accent-teal/20 mt-6 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent-teal shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-text-primary">Available for Internships</h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed mt-0.5">
                    Ready to join teams for Summer 2026/2027 internship cohorts or remote contract workloads.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Input Column (Col 7) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-bg-primary border border-border-color shadow-sm glass-panel">
              <h3 className="font-bold text-lg text-text-primary mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-text-secondary">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      className="px-3 py-2.5 rounded-xl bg-bg-tertiary border border-border-color focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none text-xs sm:text-sm text-text-primary transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-text-secondary">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. johndoe@company.com"
                      className="px-3 py-2.5 rounded-xl bg-bg-tertiary border border-border-color focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none text-xs sm:text-sm text-text-primary transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-text-secondary">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="e.g. Internship Opportunity / Collaboration"
                    className="px-3 py-2.5 rounded-xl bg-bg-tertiary border border-border-color focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none text-xs sm:text-sm text-text-primary transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-text-secondary">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your inquiry details..."
                    className="px-3 py-2.5 rounded-xl bg-bg-tertiary border border-border-color focus:border-accent-teal focus:ring-1 focus:ring-accent-teal outline-none text-xs sm:text-sm text-text-primary transition-all resize-none"
                  />
                </div>

                {/* Status messages */}
                {status && (
                  <div
                    className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs font-semibold ${
                      status.success
                        ? 'bg-accent-teal/10 border-accent-teal/30 text-accent-teal'
                        : 'bg-red-500/10 border-red-500/30 text-red-500'
                    }`}
                  >
                    {status.success ? (
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-3.5 bg-accent-teal hover:bg-accent-teal/80 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-accent-teal/10 hover:shadow-accent-teal/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {loading ? 'Sending Request...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
