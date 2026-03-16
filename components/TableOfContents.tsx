'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const extractedHeadings: TOCItem[] = [];
    let match;
    
    // Simple slugify function matching rehype-slug
    const slugify = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    };

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text);
      extractedHeadings.push({ id, text, level });
    }

    setHeadings(extractedHeadings);

    // Set up intersection observer to highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    // Wait a bit for the DOM to render the markdown
    setTimeout(() => {
      extractedHeadings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 500);

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden sticky top-24">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white text-slate-900 font-bold hover:bg-slate-50 transition-colors md:cursor-default"
      >
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-blue-600" />
          <span>Table of Contents</span>
        </div>
        <div className="md:hidden">
          {isOpen ? <ChevronDown className="w-5 h-5 text-slate-500" /> : <ChevronRight className="w-5 h-5 text-slate-500" />}
        </div>
      </button>
      
      <div className={`p-4 border-t border-slate-200 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <ul className="space-y-3 text-sm">
          {headings.map((heading, index) => (
            <li 
              key={`${heading.id}-${index}`}
              className={`${heading.level === 3 ? 'ml-4' : ''}`}
            >
              <a 
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }
                }}
                className={`block transition-colors hover:text-blue-600 ${
                  activeId === heading.id 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-slate-600'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
