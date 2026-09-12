import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AUDIO_FORMATS } from '@/lib/format-data';
import { AudioConverterStudio } from '@/components/AudioConverterStudio';
import { Check, X, ArrowRight, ArrowLeft, Volume2, ShieldCheck, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MP3 Format Guide & Technical Specifications — MediaConvert',
  description:
    'Complete technical overview of MPEG-1 Audio Layer III (MP3). Codec history, MDCT compression, bitrate recommendations, and in-browser conversion.',
};

export default function Mp3FormatPage() {
  const fmt = AUDIO_FORMATS['mp3'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-cyan-400 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/#format-cheat-sheet" className="hover:text-cyan-400">
          Formats
        </Link>
        <span>/</span>
        <span className="text-cyan-400 font-bold">.MP3</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 text-xs font-mono">
          <span>{fmt.type} Psychoacoustic Codec</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          MP3 (MPEG-1 Audio Layer III) Guide & Specs
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          The ubiquitous audio format that defined digital music. Despite newer codecs offering greater mathematical efficiency, MP3 remains the absolute gold standard for podcast syndication and universal legacy playback.
        </p>
      </div>

      {/* Quick Specs Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0c1220] border border-slate-800">
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Developed By</span>
          <div className="text-sm font-bold text-white mt-1">{fmt.developer}</div>
        </div>
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">First Released</span>
          <div className="text-sm font-bold text-cyan-300 mt-1">{fmt.releaseYear}</div>
        </div>
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Standard Bitrate</span>
          <div className="text-sm font-bold text-white mt-1">{fmt.typicalBitrate}</div>
        </div>
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Compression Ratio</span>
          <div className="text-sm font-bold text-emerald-300 mt-1">{fmt.compressionRatio}</div>
        </div>
      </div>

      {/* Technical Deep Dive Article */}
      <div className="space-y-6 text-sm text-slate-300 leading-relaxed border-y border-slate-800/80 py-8">
        <h2 className="text-xl font-bold text-white">How MP3 Compression Works Under the Hood</h2>
        <p>
          MPEG-1 Audio Layer III uses a <strong>Modified Discrete Cosine Transform (MDCT)</strong> combined with a mathematical model of the human ear known as a <em>psychoacoustic model</em>. The human ear cannot distinguish quiet sounds occurring immediately after loud sounds (temporal masking) or frequencies adjacent to overwhelming resonant peaks (spectral masking).
        </p>
        <p>
          By systematically quantizing and discarding these masked frequencies, MP3 discards 85% to 90% of raw audio data while maintaining a subjectively clean listening experience.
        </p>

        <h3 className="text-base font-bold text-white pt-2">The Licensing Revolution of 2017</h3>
        <p>
          For decades, software developers creating MP3 encoders or decoders owed patent royalties to the Fraunhofer Institute and Technicolor. On April 23, 2017, the final core patents governing MP3 expired worldwide. Today, MP3 is completely royalty-free and open for unencumbered global use.
        </p>
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
          <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>Advantages of MP3</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {fmt.pros.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
          <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
            <X className="w-5 h-5" />
            <span>Limitations of MP3</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {fmt.cons.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Conversion Workbench for this format */}
      <div className="space-y-4 pt-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white">Convert to/from MP3 in Local Browser</h2>
          <p className="text-xs text-slate-400">
            Drop your MP3 here to inspect its waveform, normalize gain, or export to WAV master format.
          </p>
        </div>
        <AudioConverterStudio />
      </div>
    </div>
  );
}
