import React from 'react';
import type { Metadata } from 'next';
import { AudioConverterStudio } from '@/components/AudioConverterStudio';
import { FormatComparisonTable } from '@/components/FormatComparisonTable';
import { Volume2, ShieldCheck, Zap, Layers, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Audio Converter & Waveform Lab — MediaConvert',
  description:
    'Client-side audio converter and waveform inspector. Convert MP3, WAV, OGG, FLAC, and WebM with peak amplitude metering and zero cloud uploads.',
};

export default function AudioConverterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Local Digital Signal Processing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Audio Converter & Waveform Studio
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Inspect uncompressed PCM waveforms, detect dynamic peak ceilings, normalize gain levels, downmix stereo channels, and transcode audio formats with zero server latency and bit-perfect accuracy.
        </p>
      </div>

      {/* Main Studio Workbench */}
      <AudioConverterStudio />

      {/* Deep-Dive Technical Guide & Specs */}
      <div className="pt-8 border-t border-slate-800/80 space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Audio Format Architecture & Codec Deep Dive
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Select any container or codec below to analyze its underlying mathematical transforms, licensing history, and best practices.
          </p>
        </div>

        <FormatComparisonTable />
      </div>
    </div>
  );
}
