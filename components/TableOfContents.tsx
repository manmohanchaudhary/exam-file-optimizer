"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const headings = React.useMemo(() => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const extractedHeadings: TOCItem[] = [];
    let match;

    const slugify = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    };

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      let text = match[2].trim();
      
      // Remove markdown bold/italic formatting
      text = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/__/g, '').replace(/_/g, '');
      
      const id = slugify(text);
      extractedHeadings.push({ id, text, level });
    }
    return extractedHeadings;
  }, [content]);

  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Set up intersection observer to highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // If multiple are visible, pick the first one
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 1.0,
      },
    );

    // Wait a bit for the DOM to render the markdown
    setTimeout(() => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 500);

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="md:sticky md:top-28 md:bg-slate-50/50 md:border md:border-slate-200 md:rounded-2xl md:p-6 md:shadow-sm">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-bold hover:bg-slate-100 transition-colors md:hidden mb-6"
      >
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-blue-600" />
          <span>Table of Contents</span>
        </div>
        <div>
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-500" />
          )}
        </div>
      </button>

      {/* Desktop & Expanded Mobile Content */}
      <div className={`${isOpen ? "block mb-8" : "hidden md:block"}`}>
        <h4 className="hidden md:block text-xs font-bold text-slate-900 mb-4 uppercase tracking-wider">
          On this page
        </h4>
        <nav className="border-l border-slate-200">
          <ul className="space-y-0">
            {headings.map((heading, index) => (
              <li key={`${heading.id}-${index}`}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(heading.id);
                    if (element) {
                      // Account for sticky header
                      const y =
                        element.getBoundingClientRect().top +
                        window.scrollY -
                        100;
                      window.scrollTo({ top: y, behavior: "smooth" });
                      setIsOpen(false);
                      setActiveId(heading.id);
                    }
                  }}
                  className={`block py-2 -ml-px border-l-2 transition-all text-sm leading-tight ${
                    activeId === heading.id
                      ? "border-blue-600 text-blue-600 font-semibold"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900"
                  } ${heading.level === 3 ? "pl-8" : "pl-4"}`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
