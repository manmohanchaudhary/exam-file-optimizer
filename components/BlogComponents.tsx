"use client";

import React from "react";
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const BlogChart = ({
  type,
  data,
  title
}: {
  type: 'bar' | 'pie';
  data: any[];
  title?: string;
}) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="my-10 bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
      {title && <h4 className="text-base md:text-lg font-bold text-slate-900 mb-6 text-center">{title}</h4>}
      <div className="h-[350px] md:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 11 }}
                interval={0}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 11 }} 
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              />
              <Legend 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                wrapperStyle={{ 
                  paddingTop: '30px',
                  fontSize: '12px',
                  width: '100%'
                }} 
              />
              {Object.keys(data[0] || {}).filter(k => k !== 'name').map((key, index) => (
                <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} radius={[4, 4, 0, 0]} maxBarSize={50} />
              ))}
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                labelLine={false}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
              <Legend 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                wrapperStyle={{ 
                  paddingTop: '20px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const TipBox = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-5 my-8 flex gap-4 items-start shadow-sm">
    <Lightbulb className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
    <div className="text-emerald-900 text-sm md:text-base leading-relaxed">
      {title && <h4 className="font-bold mb-1">{title}</h4>}
      {children}
    </div>
  </div>
);

export const WarningBox = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-5 my-8 flex gap-4 items-start shadow-sm">
    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
    <div className="text-amber-900 text-sm md:text-base leading-relaxed">
      {title && <h4 className="font-bold mb-1">{title}</h4>}
      {children}
    </div>
  </div>
);

export const NoteBox = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5 my-8 flex gap-4 items-start shadow-sm">
    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
    <div className="text-blue-900 text-sm md:text-base leading-relaxed">
      {title && <h4 className="font-bold mb-1">{title}</h4>}
      {children}
    </div>
  </div>
);

export const StepBlock = ({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) => (
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

export const CTABlock = ({
  title,
  link,
  buttonText,
}: {
  title: string;
  link: string;
  buttonText: string;
}) => (
  <div className="bg-slate-900 rounded-2xl p-8 my-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-xl shadow-slate-900/10 overflow-hidden">
    <div className="mb-6 sm:mb-0 sm:mr-8 min-w-0">
      <h4 className="text-xl font-bold text-white mb-2 break-words">{title}</h4>
      <p className="text-slate-300 text-sm md:text-base leading-relaxed break-words">
        Free, fast, and secure online tool. No registration required.
      </p>
    </div>
    <a
      href={link}
      className="flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-all hover:scale-105 hover:shadow-lg w-full sm:w-auto flex-shrink-0 text-center break-words whitespace-normal"
    >
      {buttonText}
    </a>
  </div>
);

export const ResponsiveTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) => (
  <div className="my-8 w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm">
    {/* Desktop Table View */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {headers.map((header, i) => (
              <th
                key={i}
                className="py-4 px-6 font-semibold text-slate-900 text-sm whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-slate-50/50 transition-colors"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`py-4 px-6 text-sm ${cellIndex === 0 ? "font-bold text-slate-900" : "text-slate-700"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Stacked View */}
    <div className="md:hidden bg-white divide-y divide-slate-100">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="p-5 space-y-4">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {headers[cellIndex]}
              </span>
              <div
                className={`text-sm leading-relaxed ${cellIndex === 0 ? "font-bold text-slate-900" : "text-slate-700"}`}
              >
                {cell}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
