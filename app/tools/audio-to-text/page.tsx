import React from 'react';
import type { Metadata } from 'next';
import { AudioToTextStudio } from '@/components/AudioToTextStudio';
import { FileText, ShieldCheck, Zap, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Audio to Text & Transcription Suite — MediaConvert',
  description:
    'Real-time speech recognition, SRT/VTT subtitle generator, and comprehensive audio engineering notes for Automated Speech Recognition (ASR).',
};

export default function AudioToTextPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-mono">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span>Speech Recognition & Cue Formatter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Audio to Text & Subtitle Studio
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Dictate live speech with browser ASR, edit timestamped subtitle cues, export SubRip (.srt) and WebVTT files, and learn acoustic optimization techniques for neural transcription models like Whisper.
        </p>
      </div>

      {/* Main Studio Workbench */}
      <AudioToTextStudio />
    </div>
  );
}
