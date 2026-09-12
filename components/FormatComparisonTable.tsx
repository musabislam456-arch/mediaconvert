'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AUDIO_FORMATS, AudioFormatInfo } from '@/lib/format-data';
import { Check, X, ArrowUpRight, ShieldCheck, Zap, Info } from 'lucide-react';

export function FormatComparisonTable() {
  const [selectedFormat, setSelectedFormat] = useState<string>('mp3');
  const activeInfo: AudioFormatInfo = AUDIO_FORMATS[selectedFormat] || AUDIO_FORMATS['mp3'];

  return (
    <div className="w-full space-y-6">
      {/* Format Selector Pills */}
      <div className="flex flex-wrap gap-2 items-center">
        {Object.values(AUDIO_FORMATS).map((fmt) => (
          <button
            key={fmt.id}
            type="button"
            onClick={() => setSelectedFormat(fmt.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              selectedFormat === fmt.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20 scale-105'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            {fmt.extension.toUpperCase()} • {fmt.type}
          </button>
        ))}
      </div>

      {/* Selected Format Highlight Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1322] via-[#090e1c] to-[#070b16] border border-slate-800/90 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/60 text-cyan-300">
                {activeInfo.extension}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">{activeInfo.name}</h3>
              <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                activeInfo.type === 'Uncompressed' ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40' :
                activeInfo.type === 'Lossless' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40' :
                'bg-blue-950/60 text-blue-300 border border-blue-800/40'
              }`}>
                {activeInfo.type}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{activeInfo.technicalOverview}</p>
          </div>

          <Link
            href={`/formats/${activeInfo.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors shrink-0"
          >
            <span>Full Format Guide & Specs</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
          </Link>
        </div>

        {/* Quick Specs Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70">
            <span className="text-slate-400 block text-[11px]">Typical Bitrate</span>
            <span className="font-mono font-bold text-slate-100 text-sm mt-0.5 block">{activeInfo.typicalBitrate}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70">
            <span className="text-slate-400 block text-[11px]">Compression Ratio</span>
            <span className="font-mono font-bold text-cyan-300 text-sm mt-0.5 block">{activeInfo.compressionRatio}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70">
            <span className="text-slate-400 block text-[11px]">Max Sample Rate</span>
            <span className="font-mono font-bold text-slate-100 text-sm mt-0.5 block">{activeInfo.maxSampleRate}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70">
            <span className="text-slate-400 block text-[11px]">Licensing Status</span>
            <span className="font-mono font-semibold text-emerald-400 text-xs mt-0.5 block truncate" title={activeInfo.licensing}>
              {activeInfo.licensing.split('(')[0]}
            </span>
          </div>
        </div>

        {/* Pros & Cons Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
            <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Architectural Strengths</span>
            </div>
            <ul className="space-y-1.5 text-slate-300">
              {activeInfo.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="font-semibold text-rose-400 flex items-center gap-1.5">
              <X className="w-4 h-4" />
              <span>Engineering Limitations</span>
            </div>
            <ul className="space-y-1.5 text-slate-300">
              {activeInfo.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Best For Tags & Encoding Tip */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1.5">
            <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider block">
              Optimal Production Use Cases:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeInfo.bestFor.map((item, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[11px]">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href="/tools/audio-converter"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              <span>Convert to {activeInfo.extension.toUpperCase()}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
