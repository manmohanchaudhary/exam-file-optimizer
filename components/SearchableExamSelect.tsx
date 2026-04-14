'use client';

import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import Fuse from 'fuse.js';
import { Exam } from '@/lib/presets';

interface Option {
  value: string;
  label: string;
  exam?: Exam;
}

interface GroupedOption {
  label: string;
  options: Option[];
}

interface SearchableExamSelectProps {
  exams: Exam[];
  value: string;
  onChange: (value: string, exam?: Exam) => void;
}

export default function SearchableExamSelect({ exams, value, onChange }: SearchableExamSelectProps) {
  const allOptions: Option[] = useMemo(() => {
    const opts = exams.map(exam => ({
      value: exam.id,
      label: exam.name,
      exam
    }));
    return [
      ...opts,
      { value: 'custom', label: 'Custom Requirements' }
    ];
  }, [exams]);

  const fuse = useMemo(() => new Fuse(allOptions, {
    keys: ['label', 'exam.category', 'value'],
    threshold: 0.4,
    ignoreLocation: true,
  }), [allOptions]);

  const groupedOptions = useMemo(() => {
    const popularIds = ['neet', 'jee', 'upsc', 'ssc', 'ibps'];
    const popularOptions = allOptions.filter(opt => popularIds.includes(opt.value));
    
    const groups: Record<string, Option[]> = {};
    allOptions.forEach(opt => {
      if (opt.value === 'custom') return;
      const category = opt.exam?.category || 'Other';
      if (!groups[category]) groups[category] = [];
      groups[category].push(opt);
    });

    const result: GroupedOption[] = [];
    
    if (popularOptions.length > 0) {
      result.push({ label: 'Popular Exams', options: popularOptions });
    }

    Object.keys(groups).sort().forEach(category => {
      result.push({ label: category, options: groups[category] });
    });

    result.push({ label: 'Custom', options: [allOptions.find(o => o.value === 'custom')!] });

    return result;
  }, [allOptions]);

  const [inputValue, setInputValue] = useState('');

  const displayedOptions = useMemo(() => {
    if (!inputValue.trim()) return groupedOptions;

    const results = fuse.search(inputValue);
    const matchedValues = new Set(results.map(r => r.item.value));

    const newGroups: GroupedOption[] = [];
    groupedOptions.forEach(group => {
      if (group.label === 'Popular Exams') return; 
      
      const filteredGroupOptions = group.options.filter(opt => matchedValues.has(opt.value));
      if (filteredGroupOptions.length > 0) {
        newGroups.push({ label: group.label, options: filteredGroupOptions });
      }
    });

    return newGroups;
  }, [inputValue, groupedOptions, fuse]);

  const selectedOption = allOptions.find(opt => opt.value === value) || null;

  return (
    <Select
      value={selectedOption}
      onChange={(selected) => {
        if (selected) {
          const opt = selected as Option;
          onChange(opt.value, opt.exam);
        }
      }}
      onInputChange={(newValue, actionMeta) => {
        if (actionMeta.action === 'input-change') {
          setInputValue(newValue);
        } else if (actionMeta.action === 'menu-close') {
          setInputValue('');
        }
      }}
      inputValue={inputValue}
      options={displayedOptions}
      placeholder="Search and select exam..."
      noOptionsMessage={() => "No results found. Try a different term or select 'Custom Requirements'."}
      filterOption={() => true} // Disable built-in filtering since we use Fuse.js
      isSearchable={true}
      className="react-select-container"
      classNamePrefix="react-select"
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: '2.5rem',
          borderColor: state.isFocused ? '#000' : '#e2e8f0',
          boxShadow: state.isFocused ? '0 0 0 1px #000' : 'none',
          '&:hover': {
            borderColor: state.isFocused ? '#000' : '#cbd5e1'
          },
          borderRadius: '0.5rem',
        }),
        option: (base, state) => ({
          ...base,
          paddingLeft: '1.5rem', // Indent options under categories
          backgroundColor: state.isSelected ? '#f1f5f9' : state.isFocused ? '#f8fafc' : 'transparent',
          color: state.isSelected ? '#0f172a' : '#334155',
          fontWeight: state.isSelected ? 600 : 400,
          cursor: 'pointer',
          '&:active': {
            backgroundColor: '#e2e8f0',
          }
        }),
        group: (base) => ({
          ...base,
          paddingTop: 0,
          paddingBottom: '0.5rem',
        }),
        groupHeading: (base) => ({
          ...base,
          fontWeight: 700,
          color: '#1e293b',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          padding: '0.5rem 0.75rem',
          backgroundColor: '#f1f5f9',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '0.25rem',
        })
      }}
    />
  );
}
