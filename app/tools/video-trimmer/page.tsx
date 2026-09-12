import React from 'react';
import type { Metadata } from 'next';
import { VideoTrimmerStudio } from '@/components/VideoTrimmerStudio';
import { Scissors, ShieldCheck, Zap, Film } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Video Trimmer Studio — MediaConvert',
  description:
    'Frame-accurate video trimmer and aspect ratio preview studio. Trim MP4 and WebM clips in your browser with zero cloud storage.',
};

export default function VideoTrimmerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-mono">
          <Scissors className="w-3.5 h-3.5 text-blue-400" />
          <span>In-Browser Canvas & MediaRecorder Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Video Trimmer & Frame Studio
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Scrub through video footage with frame precision, configure start and end boundaries, preview social aspect ratios (16:9, 9:16 Shorts/TikTok, 1:1), snap high-res thumbnail frames, and export trimmed video slices locally.
        </p>
      </div>

      {/* Main Studio Workbench */}
      <VideoTrimmerStudio />
    </div>
  );
}
