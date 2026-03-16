import React from 'react';
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';

export const TipBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6 rounded-r-lg flex gap-3 items-start">
    <Lightbulb className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
    <div className="text-emerald-900 text-sm md:text-base leading-relaxed">{children}</div>
  </div>
);

export const WarningBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg flex gap-3 items-start">
    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
    <div className="text-amber-900 text-sm md:text-base leading-relaxed">{children}</div>
  </div>
);

export const NoteBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg flex gap-3 items-start">
    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
    <div className="text-blue-900 text-sm md:text-base leading-relaxed">{children}</div>
  </div>
);

export const StepBlock = ({ number, title, children }: { number: number, title: string, children: React.ReactNode }) => (
  <div className="my-8">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex-shrink-0">
        {number}
      </div>
      <h3 className="text-xl font-bold text-slate-900 m-0">{title}</h3>
    </div>
    <div className="pl-11 text-slate-700 leading-relaxed">
      {children}
    </div>
  </div>
);

export const CTABlock = ({ title, link, buttonText }: { title: string, link: string, buttonText: string }) => (
  <div className="bg-slate-900 rounded-xl p-6 my-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-lg">
    <div className="mb-4 sm:mb-0 sm:mr-6">
      <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
      <p className="text-slate-300 text-sm">Free, fast, and secure online tool.</p>
    </div>
    <a 
      href={link} 
      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-emerald-400 hover:bg-emerald-500 transition-colors w-full sm:w-auto flex-shrink-0"
    >
      {buttonText}
    </a>
  </div>
);
