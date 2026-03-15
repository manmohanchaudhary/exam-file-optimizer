'use client';

import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="font-bold text-2xl tracking-tight">
              <span className="text-[#0056b3]">Exam</span>
              <span className="text-[#28a745]">Resize</span>
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/ssc-photo-resizer" className="text-sm font-medium text-slate-600 hover:text-slate-900">SSC</Link>
          <Link href="/rrb-photo-resizer" className="text-sm font-medium text-slate-600 hover:text-slate-900">RRB</Link>
          <Link href="/ibps-photo-resizer" className="text-sm font-medium text-slate-600 hover:text-slate-900">IBPS</Link>
          <Link href="/sbi-photo-resizer" className="text-sm font-medium text-slate-600 hover:text-slate-900">SBI</Link>
          <Link href="/rbi-photo-resizer" className="text-sm font-medium text-slate-600 hover:text-slate-900">RBI</Link>
          <Link href="/upsc-photo-resizer" className="text-sm font-medium text-slate-600 hover:text-slate-900">UPSC</Link>
          <Link href="/neet-photo-resizer" className="text-sm font-medium text-slate-600 hover:text-slate-900">NEET</Link>
          <Link href="/jee-photo-resizer" className="text-sm font-medium text-slate-600 hover:text-slate-900">JEE</Link>
          <Link href="/blog" className="text-sm font-medium text-[#0056b3] hover:text-[#004494]">Blog</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center mb-4">
            <span className="font-bold text-2xl tracking-tight">
              <span className="text-[#0056b3]">Exam</span>
              <span className="text-[#28a745]">Resize</span>
            </span>
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
