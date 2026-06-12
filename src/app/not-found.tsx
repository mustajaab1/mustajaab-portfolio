import Link from 'next/link';
import { Bot, HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4 grid-bg">
      <div className="max-w-md w-full p-8 rounded-3xl bg-bg-tertiary border border-border-color shadow-2xl text-center glass-panel">
        
        {/* Animated icon */}
        <div className="inline-flex p-4 rounded-full bg-accent-teal/10 text-accent-teal mb-6 animate-bounce">
          <Bot className="w-10 h-10" />
        </div>

        <h1 className="text-4xl font-extrabold text-text-primary tracking-tight mb-2">404</h1>
        <h2 className="text-lg font-bold text-accent-teal mb-4 uppercase tracking-wider">Lost in Latent Space</h2>
        
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-8">
          The vector query for this page did not return any semantic dimensions. It has either moved to another index or was pruned during collection optimization.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3 bg-accent-teal hover:bg-accent-teal/80 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-accent-teal/10 hover:shadow-accent-teal/20 flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
          
          <Link
            href="/blog"
            className="w-full py-3 bg-bg-secondary hover:bg-bg-secondary/80 border border-border-color text-text-secondary hover:text-accent-teal font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-accent-teal" />
            Browse Tech Blog
          </Link>
        </div>

      </div>
    </div>
  );
}
