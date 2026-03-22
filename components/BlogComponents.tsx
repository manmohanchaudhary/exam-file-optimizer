import React from 'react';
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';

export const TipBox = ({ title, children }: { title?: string, children: React.ReactNode }) => (
  <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-5 my-8 flex gap-4 items-start shadow-sm">
    <Lightbulb className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
    <div className="text-emerald-900 text-sm md:text-base leading-relaxed">
      {title && <h4 className="font-bold mb-1">{title}</h4>}
      {children}
    </div>
  </div>
);

export const WarningBox = ({ title, children }: { title?: string, children: React.ReactNode }) => (
  <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-5 my-8 flex gap-4 items-start shadow-sm">
    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
    <div className="text-amber-900 text-sm md:text-base leading-relaxed">
      {title && <h4 className="font-bold mb-1">{title}</h4>}
      {children}
    </div>
  </div>
);

export const NoteBox = ({ title, children }: { title?: string, children: React.ReactNode }) => (
  <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5 my-8 flex gap-4 items-start shadow-sm">
    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
    <div className="text-blue-900 text-sm md:text-base leading-relaxed">
      {title && <h4 className="font-bold mb-1">{title}</h4>}
      {children}
    </div>
  </div>
);

export const StepBlock = ({ number, title, children }: { number: number, title: string, children: React.ReactNode }) => (
  <div className="my-10 relative">
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex-shrink-0 shadow-sm">
        {number}
      </div>
      <h3 className="text-xl font-bold text-slate-900 m-0">{title}</h3>
    </div>
    <div className="pl-12 text-slate-700 leading-relaxed border-l-2 border-slate-100 ml-4 pb-2">
      {children}
    </div>
  </div>
);

export const CTABlock = ({ title, link, buttonText }: { title: string, link: string, buttonText: string }) => (
  <div className="bg-slate-900 rounded-2xl p-8 my-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-xl shadow-slate-900/10 overflow-hidden">
    <div className="mb-6 sm:mb-0 sm:mr-8 min-w-0">
      <h4 className="text-xl font-bold text-white mb-2 break-words">{title}</h4>
      <p className="text-slate-300 text-sm md:text-base leading-relaxed break-words">Free, fast, and secure online tool. No registration required.</p>
    </div>
    <a 
      href={link} 
      className="flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-all hover:scale-105 hover:shadow-lg w-full sm:w-auto flex-shrink-0 text-center break-words whitespace-normal"
    >
      {buttonText}
    </a>
  </div>
);
