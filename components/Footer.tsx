import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Zap, 
  Globe2, 
  Github, 
  Terminal, 
  Volume2, 
  Scissors, 
  FileText 
} from 'lucide-react';

export function Footer() {
  return (
    <footer id="global-footer" className="bg-[#060911] border-t border-slate-800/80 text-slate-400 text-sm mt-auto">
      {/* Privacy Pledge Banner */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-cyan-950/20 via-slate-900/40 to-blue-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <span>The MediaConvert Zero-Data-Egress Promise</span>
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/60 text-cyan-300">
                  Local Browser Sandbox
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
                Your audio and video files are processed strictly inside your device’s local browser memory via Web Audio & Canvas APIs. Not a single byte is uploaded to any cloud server.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>No Cloud Uploads</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hardware-Accelerated</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>WebAssembly Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-[#0b101d] rounded-[10px] flex items-center justify-center gap-0.5 px-1.5">
                  <span className="w-0.5 bg-cyan-400 rounded-full h-3" />
                  <span className="w-0.5 bg-cyan-300 rounded-full h-5" />
                  <span className="w-0.5 bg-blue-400 rounded-full h-3" />
                  <span className="w-0.5 bg-indigo-400 rounded-full h-6" />
                  <span className="w-0.5 bg-cyan-400 rounded-full h-2" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                Media<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Convert</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              The modern audio and video utility suite crafted for creators, podcasters, video editors, and audio engineers who demand instant results and uncompromising data privacy.
            </p>
            <div className="pt-2 text-xs text-slate-400 font-mono space-y-1">
              <div>Engine: Web Audio API / Canvas / MediaRecorder</div>
              <div>Security: 100% In-Memory Local Execution</div>
            </div>
          </div>

          {/* Col 1: Core Tools */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono mb-4">
              Core Utilities
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/tools/audio-converter" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Audio Converter & Lab</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/video-trimmer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-blue-400" />
                  <span>Video Trimmer Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/audio-to-text" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Audio-to-Text & Subtitles</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/audio-converter" className="hover:text-cyan-400 transition-colors">
                  Waveform & Peak Inspector
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Format Guides */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono mb-4">
              Format Guides
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/formats/mp3" className="hover:text-cyan-400 transition-colors">
                  MP3 (MPEG-1 Layer III)
                </Link>
              </li>
              <li>
                <Link href="/formats/wav" className="hover:text-cyan-400 transition-colors">
                  WAV (PCM Audio RIFF)
                </Link>
              </li>
              <li>
                <Link href="/formats/ogg" className="hover:text-cyan-400 transition-colors">
                  OGG (Vorbis & Opus)
                </Link>
              </li>
              <li>
                <Link href="/blog/best-audio-format-for-podcasts" className="hover:text-cyan-400 transition-colors">
                  Format Comparison Matrix
                </Link>
              </li>
              <li>
                <Link href="/blog/understanding-lufs-audio-loudness" className="hover:text-cyan-400 transition-colors">
                  LUFS Loudness Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Articles */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono mb-4">
              Resources & Trust
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">
                  Engineering Blog & Guides
                </Link>
              </li>
              <li>
                <Link href="/blog/best-audio-format-for-podcasts" className="hover:text-cyan-400 transition-colors">
                  Best Format for Podcasts
                </Link>
              </li>
              <li>
                <Link href="/blog/video-compression-explained" className="hover:text-cyan-400 transition-colors">
                  Video Compression Explained
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Us & Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-400">
            &copy; {new Date().getFullYear()} MediaConvert Systems Inc. All audio/video conversions execute client-side.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-slate-400 hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-slate-400 hover:text-slate-300 transition-colors">
              Security Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
