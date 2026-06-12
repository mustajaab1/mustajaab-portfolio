'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLanguage = '';

  const parseInline = (text: string) => {
    // Basic inline formatter for **bold** and `code`
    const parts: React.ReactNode[] = [];
    let i = 0;
    
    while (i < text.length) {
      // Bold check
      if (text.startsWith('**', i)) {
        const endBold = text.indexOf('**', i + 2);
        if (endBold !== -1) {
          parts.push(<strong key={i} className="font-bold text-text-primary">{text.slice(i + 2, endBold)}</strong>);
          i = endBold + 2;
          continue;
        }
      }
      
      // Inline Code check
      if (text.startsWith('\`', i)) {
        const endCode = text.indexOf('\`', i + 1);
        if (endCode !== -1) {
          parts.push(
            <code key={i} className="px-1.5 py-0.5 rounded bg-bg-secondary text-accent-teal font-mono text-xs border border-border-color">
              {text.slice(i + 1, endCode)}
            </code>
          );
          i = endCode + 1;
          continue;
        }
      }

      // Regular character
      parts.push(text[i]);
      i++;
    }
    
    return parts;
  };

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];

    // Code block detection
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        elements.push(
          <pre key={`code-${idx}`} className="p-4 rounded-xl bg-bg-primary border border-border-color overflow-x-auto my-4 font-mono text-xs text-text-primary relative shadow-sm">
            <span className="absolute top-2 right-3 text-[9px] uppercase font-bold text-text-tertiary">{codeLanguage || 'Code'}</span>
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
        codeLanguage = '';
      } else {
        inCodeBlock = true;
        codeLanguage = line.trim().slice(3);
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-8 mb-4 border-b border-border-color/60 pb-2">
          {parseInline(line.slice(2))}
        </h1>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={idx} className="text-xl sm:text-2xl font-bold text-text-primary mt-6 mb-3">
          {parseInline(line.slice(3))}
        </h2>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={idx} className="text-lg sm:text-xl font-bold text-text-primary mt-4 mb-2">
          {parseInline(line.slice(4))}
        </h3>
      );
      continue;
    }

    // Lists
    if (line.trim().startsWith('- ')) {
      elements.push(
        <ul key={idx} className="list-disc pl-5 my-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
          <li>{parseInline(line.trim().slice(2))}</li>
        </ul>
      );
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      continue;
    }

    // Default Paragraph
    elements.push(
      <p key={idx} className="text-xs sm:text-sm text-text-secondary leading-relaxed my-3">
        {parseInline(line)}
      </p>
    );
  }

  return <div className="markdown-renderer-container flex flex-col gap-1.5">{elements}</div>;
}
