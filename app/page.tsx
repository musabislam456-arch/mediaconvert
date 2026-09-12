import React from 'react';
import Link from 'next/link';
import { 
  Volume2, 
  Scissors, 
  FileText, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Sliders, 
  CheckCircle2, 
  BookOpen, 
  Activity, 
  HelpCircle,
  Clock,
  HardDrive
} from 'lucide-react';
import { AudioConverterStudio } from '@/components/AudioConverterStudio';
import { FormatComparisonTable } from '@/components/FormatComparisonTable';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800/60 bg-gradient-to-b from-[#090d16] via-[#0b101e] to-[#080c17]">
        {/* Background glow & waveform grid */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent blur-3xl rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-mono font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Zero-Data-Egress Media Utilities</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              In-Browser Audio & Video Engine for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                Creators
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Fast format conversion, waveform inspection, precision video trimming, and speech transcription notes. Processed directly in local browser memory with 100% privacy.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>0 Bytes Cloud Upload</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Instant SSD Reading</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-indigo-400" />
                <span>No Waiting Queues</span>
              </span>
            </div>
          </div>

          {/* Interactive Live Tool Sandbox right on the Hero */}
          <div className="mt-12 lg:mt-16">
            <AudioConverterStudio />
          </div>
        </div>
      </section>

      {/* Core Tools Showcase */}
      <section id="core-tools-grid" className="py-16 lg:py-24 bg-[#080c16] border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              Complete Creator Toolkit
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Specialized Tools for Demanding Workflows
            </p>
            <p className="text-xs sm:text-sm text-slate-400">
              Each tool runs completely client-side in the user’s browser via Web Audio, HTML5 Canvas, and native hardware decoders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Tool 1: Audio Converter & Waveform Lab */}
            <div className="p-6 rounded-2xl bg-[#0c1220] border border-slate-800 hover:border-cyan-500/50 transition-all group flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                  <Volume2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    <span>Audio Converter & Lab</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">Active</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Decode raw PCM waveforms, check true peak amplitudes (dBFS), normalize audio gain, downmix stereo to mono, and export uncompressed 16-bit WAV or high-efficiency WebM.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>MP3, WAV, OGG, FLAC, AAC, WebM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Sub-millisecond interactive scrub canvas</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/80">
                <Link
                  href="/tools/audio-converter"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Launch Audio Converter</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Tool 2: Video Trimmer Studio */}
            <div className="p-6 rounded-2xl bg-[#0c1220] border border-slate-800 hover:border-blue-500/50 transition-all group flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                  <Scissors className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                    <span>Video Trimmer Studio</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/40">Canvas + Cut</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Frame-accurate scrubbing, dual in/out boundary sliders, aspect ratio guides for YouTube Shorts (9:16) and square feeds (1:1), and one-click frame snapshot capture.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>In-browser local slice rendering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Lossless remux roadmap waitlist</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/80">
                <Link
                  href="/tools/video-trimmer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Open Video Trimmer</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Tool 3: Audio to Text Notes */}
            <div className="p-6 rounded-2xl bg-[#0c1220] border border-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                    <span>Audio to Text & Subtitles</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">SRT / VTT</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Live speech dictation with continuous acoustic parsing, timestamped cue editor, SubRip (.srt) and WebVTT generator, and in-depth ASR acoustic engineering notes.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Speech recognition in 6+ languages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Whisper.cpp acoustic prep guidelines</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/80">
                <Link
                  href="/tools/audio-to-text"
                  className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Launch Transcription Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Format Comparison Cheat Sheet */}
      <section id="format-cheat-sheet" className="py-16 lg:py-24 bg-[#090d18] border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                Format Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Audio Format Comparison & Cheat Sheet
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Compare bitrate envelopes, compression mathematics, and browser compatibility across MP3, WAV, OGG, FLAC, and AAC.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Link
                href="/formats/mp3"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 font-mono"
              >
                MP3 Deep Dive
              </Link>
              <Link
                href="/formats/wav"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 font-mono"
              >
                WAV Deep Dive
              </Link>
              <Link
                href="/formats/ogg"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 font-mono"
              >
                OGG Deep Dive
              </Link>
            </div>
          </div>

          <FormatComparisonTable />
        </div>
      </section>

      {/* Why Client-Side Processing Matters */}
      <section className="py-16 lg:py-24 bg-[#070a13] border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              Security & Performance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why 100% Client-Side Processing Is Superior
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Traditional web converters upload your media to third-party Amazon S3 buckets. MediaConvert never touches your files.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Absolute Zero-Knowledge Privacy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Journalists with confidential whistleblowers, musicians with unreleased demos, and corporate video teams under strict NDAs can process media without fear of cloud data breaches or server logs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">No Bandwidth Waiting Time</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Why upload a 500 MB WAV file over a slow home Wi-Fi connection just to convert it? MediaConvert reads data directly from your local NVMe or SSD storage at bus speeds exceeding 2,500 MB/s.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 flex items-center justify-center">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">No Artificial File Size Caps</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Because there are zero cloud server infrastructure costs, you are not held hostage by artificial 50 MB limits, subscription paywalls, or queue timers. If your computer has the RAM, you can process it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles & Engineering Guides */}
      <section id="featured-blog-section" className="py-16 lg:py-24 bg-[#080c17] border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                Editorial & Field Guides
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Audio & Video Engineering Guides
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Rigorous, publication-grade technical articles on audio mastering, video codec mathematics, and loudness normalization.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#0c1220] border border-slate-800 hover:border-slate-700 transition-all group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-cyan-400 font-semibold">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block group">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">
                      {post.author.name[0]}
                    </div>
                    <span className="text-xs text-slate-400">{post.author.name}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Creator FAQ Section */}
      <section className="py-16 lg:py-24 bg-[#070b14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Creator Technical Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Does MediaConvert upload my files to any remote server or database?</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                No, absolutely not. All audio decoding, peak analysis, waveform generation, and video trimming run locally in your web browser utilizing HTML5 Canvas, the Web Audio API, and in-memory WebAssembly. You can disconnect your internet Wi-Fi after the web app loads and continue converting files.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>How does the WAV export maintain bit-perfect fidelity?</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                When you load an audio file, the browser decodes it to 32-bit floating point PCM audio buffers. Our custom client-side binary WAV encoder serializes standard RIFF chunk headers and quantizes linear PCM samples into uncompressed 16-bit little-endian binary bytes. The resulting file is identical to what a DAW like Pro Tools or Audacity would render.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>What are the recommended podcast audio settings?</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                For standard spoken-word podcasts, deliver a Mono MP3 at 96 kbps to 128 kbps Constant Bitrate (CBR) with a 44.1 kHz or 48 kHz sample rate, normalized to -19 LUFS (for mono) or -16 LUFS (for stereo) with a -1.0 dB True Peak ceiling. Read our full guide in the Blog section for details.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Is MediaConvert free for commercial podcast and video editing?</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                Yes. MediaConvert client-side utilities are 100% free for both personal and commercial creator workflows without watermarks, trial timers, or account registrations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
