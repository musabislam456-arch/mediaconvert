import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Cpu, Zap, Lock, Terminal, Globe2, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About MediaConvert — The Zero-Data-Egress Media Utilities Platform',
  description:
    'Learn about our engineering philosophy: processing high-fidelity audio and video entirely within client-side browser memory without third-party cloud data egress.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Local-First Engineering Manifesto</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Eliminating the Cloud Middleman for Audio & Video
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          MediaConvert was engineered with a radical proposition: your proprietary media files, confidential voice notes, and high-bitrate video footage should never touch a third-party cloud server.
        </p>
      </div>

      {/* Core Mission & The Problem */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-slate-800/80 py-10">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">The Flaw in Traditional Online Converters</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            For twenty years, online file converters forced users into a dangerous bargain: upload your private files across public internet cables to remote cloud servers, wait in long queue lines, and hope the server administrator deletes your footage afterward.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            For investigative journalists, medical professionals dictating patient charts, corporate legal teams under non-disclosure agreements, and independent musicians with unreleased stems, this legacy architecture is an unacceptable security vulnerability.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-cyan-400">The Modern Browser As A Digital Audio Workstation</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            With the advent of the <strong>Web Audio API</strong>, <strong>HTML5 Canvas MediaStreams</strong>, and <strong>WebAssembly (WASM)</strong>, personal laptops and smartphones now possess dedicated hardware video decoders and multi-core signal processors.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            MediaConvert executes all transforms in your browser’s volatile RAM. When you close the tab, every intermediate buffer is instantly erased. Zero logs, zero analytics on your audio, zero server costs passed to you.
          </p>
        </div>
      </div>

      {/* Architectural Pillars */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">Our Core Engineering Principles</h2>
          <p className="text-xs text-slate-400">The strict technical constraints that govern every line of code we ship.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0c1220] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">1. Absolute Zero-Egress</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never instantiate upload endpoints for user media files. Inspect your browser’s Network DevTools tab at any time: no POST requests transmitting binary media are ever initiated.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c1220] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">2. Pure Local Hardware Speed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Why choke your workflow with home Wi-Fi upload speeds? We tap directly into your local NVMe or SSD bus, reading gigabytes of PCM data instantaneously.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c1220] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">3. Mathematical Precision</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              From 64-bit floating point waveform decoders to bit-accurate 16-bit RIFF WAV serializations, we adhere strictly to AES, ITU-R BS.1770, and EBU R128 audio standards.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Engineering Team */}
      <div className="space-y-6 pt-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Engineering Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-bold text-cyan-400">
              MV
            </div>
            <div>
              <div className="text-sm font-bold text-white">Marcus Vance</div>
              <div className="text-xs text-cyan-400 font-mono">Head of Audio Architecture</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Former mastering engineer and DSP programmer specializing in spatial psychoacoustics and client-side PCM quantization.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-bold text-blue-400">
              ER
            </div>
            <div>
              <div className="text-sm font-bold text-white">Elena Rostova</div>
              <div className="text-xs text-blue-400 font-mono">Video Infrastructure Lead</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Codec researcher with 12 years of experience optimizing H.265 and AV1 intra-frame motion estimation pipelines.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-bold text-indigo-400">
              AT
            </div>
            <div>
              <div className="text-sm font-bold text-white">Dr. Aris Thorne</div>
              <div className="text-xs text-indigo-400 font-mono">Chief Security Officer</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cryptographic systems auditor and privacy advocate focused on browser isolation boundaries and memory sanitation.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0d1527] via-[#091020] to-[#070b16] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white">Experience Zero-Upload Media Utilities</h3>
          <p className="text-xs text-slate-400">Test the local audio lab with our procedural synth demo or your own files.</p>
        </div>
        <Link
          href="/tools/audio-converter"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 shrink-0 transition-all"
        >
          Open Audio Studio
        </Link>
      </div>
    </div>
  );
}
