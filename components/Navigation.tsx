'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXAMS, Exam } from '@/lib/presets';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExamsMenuOpen, setIsExamsMenuOpen] = useState(false);

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
            onMouseEnter={() => setIsExamsMenuOpen(true)}
            onMouseLeave={() => setIsExamsMenuOpen(false)}
          >
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 py-2">
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
                          {exams.map((exam) => (
                            <Link 
                              key={exam.id} 
                              href={`/${exam.id}-photo-resizer`} 
                              onClick={() => setIsExamsMenuOpen(false)}
                              className="py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors break-words"
                              title={exam.name}
                            >
                              {exam.name}
                            </Link>
                          ))}
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
                    {exams.map((exam) => (
                      <Link 
                        key={exam.id} 
                        href={`/${exam.id}-photo-resizer`} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors break-words"
                        title={exam.name}
                      >
                        {exam.name}
                      </Link>
                    ))}
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

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center mb-4">
            <Image 
              src="/logo.png" 
              alt="ExamResize Logo" 
              width={540} 
              height={120} 
              className="h-9 md:h-10 w-auto brightness-0 invert"
            />
          </div>
          <p className="text-sm max-w-md">
            The fastest and most secure way to resize and compress photos, signatures, and documents for online exam forms.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Tools</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/ssc-photo-resizer" className="hover:text-white transition-colors">SSC Photo Resizer</Link></li>
            <li><Link href="/signature-resize-for-exam" className="hover:text-white transition-colors">Signature Optimizer</Link></li>
            <li><Link href="/20kb-photo-converter" className="hover:text-white transition-colors">20KB Photo Resizer</Link></li>
            <li><Link href="/passport-photo-for-exam-forms" className="hover:text-white transition-colors">Passport Photo Maker</Link></li>
            <li><Link href="/document-compressor" className="hover:text-white transition-colors">Document Compressor</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Popular Exams</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/ssc-photo-resizer" className="hover:text-white transition-colors">SSC</Link></li>
            <li><Link href="/rrb-photo-resizer" className="hover:text-white transition-colors">RRB</Link></li>
            <li><Link href="/ibps-photo-resizer" className="hover:text-white transition-colors">IBPS</Link></li>
            <li><Link href="/sbi-photo-resizer" className="hover:text-white transition-colors">SBI</Link></li>
            <li><Link href="/rbi-photo-resizer" className="hover:text-white transition-colors">RBI</Link></li>
            <li><Link href="/upsc-photo-resizer" className="hover:text-white transition-colors">UPSC</Link></li>
            <li><Link href="/neet-photo-resizer" className="hover:text-white transition-colors">NEET</Link></li>
            <li><Link href="/jee-photo-resizer" className="hover:text-white transition-colors">JEE</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Exam Guides</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/ssc-photo-size-guide" className="hover:text-white transition-colors">SSC Photo Size Guide</Link></li>
            <li><Link href="/rrb-photo-size-guide" className="hover:text-white transition-colors">RRB Photo Size Guide</Link></li>
            <li><Link href="/ibps-photo-size-guide" className="hover:text-white transition-colors">IBPS Photo Size Guide</Link></li>
            <li><Link href="/neet-photo-size-guide" className="hover:text-white transition-colors">NEET Photo Size Guide</Link></li>
            <li><Link href="/jee-photo-size-guide" className="hover:text-white transition-colors">JEE Photo Size Guide</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Support & Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Updates</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
        <p className="mb-4 text-slate-300">Images are processed securely and are not stored on our servers.</p>
        <p>&copy; 2026 ExamResize.online — Free photo and signature resizing tool for exam applications.</p>
      </div>
    </footer>
  );
}
