'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Instagram } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXAMS, Exam } from '@/lib/presets';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExamsMenuOpen, setIsExamsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExamsMenuOpen(false);
      }
    };

    if (isExamsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isExamsMenuOpen]);

  const groupedExams = EXAMS.reduce((acc, exam) => {
    const category = exam.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(exam);
    return acc;
  }, {} as Record<string, Exam[]>);

  const sortedCategories = Object.entries(groupedExams).sort(([catA], [catB]) => {
    if (catA === 'All India Exams') return -1;
    if (catB === 'All India Exams') return 1;
    if (catA === 'Other') return 1;
    if (catB === 'Other') return -1;
    return catA.localeCompare(catB);
  });

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="ExamResize Logo" 
              width={540} 
              height={120} 
              className="h-9 md:h-10 w-auto"
              priority
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div 
            className="relative"
            ref={dropdownRef}
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') {
                setIsExamsMenuOpen(true);
              }
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') {
                setIsExamsMenuOpen(false);
              }
            }}
          >
            <button 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 py-2"
              onClick={(e) => {
                e.preventDefault();
                setIsExamsMenuOpen(!isExamsMenuOpen);
              }}
              aria-expanded={isExamsMenuOpen ? "true" : "false"}
            >
              Exams 
              <motion.div
                animate={{ rotate: isExamsMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isExamsMenuOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] lg:w-[600px] bg-white border border-slate-200 rounded-xl shadow-xl z-50 flex py-4 px-4 lg:px-6 overflow-hidden"
                >
                  <div className="columns-2 lg:columns-3 gap-4 lg:gap-6 w-full">
                    {sortedCategories.map(([category, exams]) => (
                      <div key={category} className="flex flex-col mb-6 break-inside-avoid">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
                          {category.replace(/_/g, ' ')}
                        </h3>
                        <div className="flex flex-col space-y-1">
                          {exams.map((exam) => {
                            let href = `/${exam.id}-photo-resizer`;
                            if (exam.id === 'ssc') href = '/photo-resize-for-ssc-form';
                            if (exam.id === 'otet-2026') href = '/otet-photo-resize-2026';
                            if (exam.id === 'dsssb') href = '/dsssb-image-optimizer';
                            if (exam.id === 'ssb-odisha') href = '/ssb-odisha-image-resizer';
                            
                            return (
                              <Link 
                                key={exam.id} 
                                href={href} 
                                onClick={() => setIsExamsMenuOpen(false)}
                                className="py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors break-words"
                                title={exam.name}
                              >
                                {exam.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/blog" className="text-sm font-medium text-[#0056b3] hover:text-[#004494]">Blog</Link>
          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">About</Link>
          <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900">Contact Us</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none relative w-10 h-10 flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white border-b border-slate-200 absolute top-16 left-0 w-full shadow-lg overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <nav className="flex flex-col px-4 py-4 space-y-6">
              {sortedCategories.map(([category, exams]) => (
                <div key={category} className="flex flex-col">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    {category.replace(/_/g, ' ')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {exams.map((exam) => {
                      let href = `/${exam.id}-photo-resizer`;
                      if (exam.id === 'ssc') href = '/photo-resize-for-ssc-form';
                      if (exam.id === 'otet-2026') href = '/otet-photo-resize-2026';
                      if (exam.id === 'dsssb') href = '/dsssb-image-optimizer';
                      if (exam.id === 'ssb-odisha') href = '/ssb-odisha-image-resizer';

                      return (
                        <Link 
                          key={exam.id} 
                          href={href} 
                          onClick={() => setIsMobileMenuOpen(false)} 
                          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors break-words"
                          title={exam.name}
                        >
                          {exam.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              <div className="border-t border-slate-100 pt-4 flex flex-col space-y-4">
                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-[#0056b3] hover:text-[#004494]">Blog</Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-600 hover:text-slate-900">About</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-600 hover:text-slate-900">Contact Us</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center mb-6">
              <Image 
                src="/logo.png" 
                alt="ExamResize Logo" 
                width={540} 
                height={120} 
                className="h-9 md:h-10 w-auto brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-8 text-slate-400">
              The fastest and most secure way to resize and compress photos, signatures, and documents for online exam forms.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://x.com/ExamResize" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                aria-label="Follow us on X (Twitter)"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/examresize.online/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-slate-100 font-semibold mb-6 text-sm uppercase tracking-wider">Tools</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/photo-resize-for-ssc-form" className="hover:text-white transition-colors">SSC Photo Resizer</Link></li>
              <li><Link href="/signature-resize-for-exam" className="hover:text-white transition-colors">Signature Optimizer</Link></li>
              <li><Link href="/20kb-photo-converter" className="hover:text-white transition-colors">20KB Photo Resizer</Link></li>
              <li><Link href="/passport-photo-for-exam-forms" className="hover:text-white transition-colors">Passport Photo Maker</Link></li>
              <li><Link href="/document-compressor" className="hover:text-white transition-colors">Document Compressor</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-slate-100 font-semibold mb-6 text-sm uppercase tracking-wider">Popular Exams</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/photo-resize-for-ssc-form" className="hover:text-white transition-colors">SSC</Link></li>
              <li><Link href="/rrb-photo-resizer" className="hover:text-white transition-colors">RRB</Link></li>
              <li><Link href="/ibps-photo-resizer" className="hover:text-white transition-colors">IBPS</Link></li>
              <li><Link href="/sbi-photo-resizer" className="hover:text-white transition-colors">SBI</Link></li>
              <li><Link href="/rbi-photo-resizer" className="hover:text-white transition-colors">RBI</Link></li>
              <li><Link href="/upsc-photo-resizer" className="hover:text-white transition-colors">UPSC</Link></li>
              <li><Link href="/neet-photo-resizer" className="hover:text-white transition-colors">NEET</Link></li>
              <li><Link href="/jee-photo-resizer" className="hover:text-white transition-colors">JEE</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-slate-100 font-semibold mb-6 text-sm uppercase tracking-wider">Exam Guides</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/ssc-photo-size-guide" className="hover:text-white transition-colors">SSC Guide</Link></li>
              <li><Link href="/rrb-photo-size-guide" className="hover:text-white transition-colors">RRB Guide</Link></li>
              <li><Link href="/ibps-photo-size-guide" className="hover:text-white transition-colors">IBPS Guide</Link></li>
              <li><Link href="/neet-photo-size-guide" className="hover:text-white transition-colors">NEET Guide</Link></li>
              <li><Link href="/jee-photo-size-guide" className="hover:text-white transition-colors">JEE Guide</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-slate-100 font-semibold mb-6 text-sm uppercase tracking-wider">Support & Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Updates</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} ExamResize.online. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Files processed securely & locally
          </p>
        </div>
      </div>
    </footer>
  );
}
