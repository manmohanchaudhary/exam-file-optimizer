'use client';

import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">ExamFileOptimizer</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900">How it Works</Link>
          <Link href="/#presets" className="text-sm font-medium text-slate-600 hover:text-slate-900">Presets</Link>
          <Link href="/#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-xl text-white tracking-tight">ExamFileOptimizer</span>
          </div>
          <p className="text-sm max-w-md">
            The fastest and most secure way to resize and compress photos, signatures, and documents for online exam forms.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Tools</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/photo-resize-for-ssc-form" className="hover:text-white transition-colors">SSC Photo Resizer</Link></li>
            <li><Link href="/signature-resize-for-exam" className="hover:text-white transition-colors">Exam Signature Optimizer</Link></li>
            <li><Link href="/20kb-photo-converter" className="hover:text-white transition-colors">20KB Photo Converter</Link></li>
            <li><Link href="/passport-photo-for-exam-forms" className="hover:text-white transition-colors">Passport Photo Maker</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
        &copy; {new Date().getFullYear()} ExamFileOptimizer. All rights reserved.
      </div>
    </footer>
  );
}
