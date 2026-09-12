import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AUDIO_FORMATS } from '@/lib/format-data';
import { AudioConverterStudio } from '@/components/AudioConverterStudio';
import { Check, X, ArrowRight, ArrowLeft, Volume2, ShieldCheck, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'OGG (Vorbis & Opus) Format Guide & Specs — MediaConvert',
  description:
    'Complete technical overview of OGG container, Vorbis codec, and modern Opus. Audio quality per bit, gaming engines, and open-source licensing.',
};

export default function OggFormatPage() {
  const fmt = AUDIO_FORMATS['ogg'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Breadcrumb */}
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
        <span className="text-cyan-400 font-bold">.OGG</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
          <span>{fmt.type} Open Source Multimedia Container</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          OGG (Vorbis & Opus) Guide & Specs
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Created by the Xiph.Org Foundation as an open, royalty-free alternative to proprietary codecs. Today, Ogg Vorbis and Opus power Spotify’s desktop client, Unity game engines, and low-latency WebRTC streams.
        </p>
      </div>

      {/* Quick Specs Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0c1220] border border-slate-800">
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Maintained By</span>
          <div className="text-sm font-bold text-white mt-1">{fmt.developer}</div>
        </div>
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">First Released</span>
          <div className="text-sm font-bold text-cyan-300 mt-1">{fmt.releaseYear}</div>
        </div>
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Licensing</span>
          <div className="text-sm font-bold text-emerald-400 mt-1">100% Free / BSD</div>
        </div>
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Typical Bitrate</span>
          <div className="text-sm font-bold text-white mt-1">{fmt.typicalBitrate}</div>
        </div>
      </div>

      {/* Technical Deep Dive Article */}
      <div className="space-y-6 text-sm text-slate-300 leading-relaxed border-y border-slate-800/80 py-8">
        <h2 className="text-xl font-bold text-white">Container vs Codec: Untangling OGG, Vorbis & Opus</h2>
        <p>
          It is essential to recognize that <strong>OGG is a container format</strong>, while <strong>Vorbis</strong> and <strong>Opus</strong> are audio compression codecs housed within it. 
        </p>
        <p>
          - <strong>Ogg Vorbis</strong>: Developed in 2000 as a direct competitor to MP3. At identical bitrates (e.g. 128 kbps), Vorbis consistently outperforms MP3 in blind ABX listening tests, preserving high-transient percussive attacks and cymbal sizzle without annoying &ldquo;swishy&rdquo; MP3 artifacts.
        </p>
        <p>
          - <strong>Opus (IETF RFC 6716)</strong>: The modern successor to Vorbis. Opus combines Skype’s SILK speech codec and Xiph’s CELT music codec. It can operate seamlessly from 6 kbps narrowband speech up to 510 kbps 5.1 surround sound with imperceptible latency (5 ms to 20 ms), making it the uncontested standard for WebRTC and Discord.
        </p>

        <h3 className="text-base font-bold text-white pt-2">Why Game Developers Choose Ogg</h3>
        <p>
          Unlike MP3 which inherently injects silent padding samples at the beginning of files (breaking seamless music loops), Ogg Vorbis supports sample-accurate gapless looping out of the box. Game developers in Unity, Unreal, and Godot rely on Ogg for continuous ambient background soundtracks.
        </p>
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
          <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>Advantages of OGG</span>
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
            <span>Limitations of OGG</span>
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

      {/* Converter Sandbox */}
      <div className="space-y-4 pt-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white">OGG & WebM Audio Lab</h2>
          <p className="text-xs text-slate-400">
            Decode OGG files, view realtime PCM waveforms, or export to WebM Opus audio in your browser.
          </p>
        </div>
        <AudioConverterStudio initialFormat="webm" />
      </div>
    </div>
  );
}
