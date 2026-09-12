'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Volume2, 
  Scissors, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [formatsDropdownOpen, setFormatsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMobileMenuOpen(false);
      setToolsDropdownOpen(false);
      setFormatsDropdownOpen(false);
    });
    return () => cancelAnimationFrame(handle);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      id="main-navigation-header"
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40'
          : 'bg-[#090d16]/80 backdrop-blur-sm border-b border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          id="brand-logo-link"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
        >
          {/* Waveform Logo Icon */}
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <div className="w-full h-full bg-[#0b101d] rounded-[10px] flex items-center justify-center gap-0.5 px-1.5 overflow-hidden">
              <span className="w-1 bg-cyan-400 rounded-full h-3 group-hover:h-5 transition-all duration-300" />
              <span className="w-1 bg-cyan-300 rounded-full h-6 group-hover:h-4 transition-all duration-300" />
              <span className="w-1 bg-blue-400 rounded-full h-4 group-hover:h-7 transition-all duration-300" />
              <span className="w-1 bg-indigo-400 rounded-full h-7 group-hover:h-5 transition-all duration-300" />
              <span className="w-1 bg-cyan-400 rounded-full h-2 group-hover:h-4 transition-all duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                Media<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Convert</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 rounded">
                Client-Side
              </span>
            </div>
            <span className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
              Audio & Video Utilities
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Tools Menu */}
          <div 
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button
              id="tools-menu-button"
              type="button"
              className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/tools')
                  ? 'text-cyan-400 bg-slate-800/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
            >
              <span>Core Tools</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
            </button>

            {toolsDropdownOpen && (
              <div 
                id="tools-dropdown-menu"
                className="absolute top-full left-0 w-80 mt-1 p-2 bg-[#0e1424] border border-slate-800 rounded-xl shadow-2xl shadow-black/80 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  In-Browser Utilities
                </div>
                <Link
                  href="/tools/audio-converter"
                  id="nav-tool-audio-converter"
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/70 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 group-hover:scale-105 transition-transform">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 flex items-center gap-2">
                      Audio Converter & Lab
                      <span className="text-[10px] px-1.5 py-0.2 bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 rounded">Active</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Decode, waveform inspect & convert MP3, WAV, OGG, WebM
                    </p>
                  </div>
                </Link>

                <Link
                  href="/tools/video-trimmer"
                  id="nav-tool-video-trimmer"
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/70 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-blue-950/70 border border-blue-800/40 text-blue-400 group-hover:scale-105 transition-transform">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-100 group-hover:text-blue-300 flex items-center gap-2">
                      Video Trimmer Studio
                      <span className="text-[10px] px-1.5 py-0.2 bg-blue-950/80 text-blue-300 border border-blue-800/40 rounded">Canvas + Cut</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Sub-second scrubber, crop presets & local slice export
                    </p>
                  </div>
                </Link>

                <Link
                  href="/tools/audio-to-text"
                  id="nav-tool-audio-to-text"
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/70 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-indigo-950/70 border border-indigo-800/40 text-indigo-400 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 flex items-center gap-2">
                      Audio to Text & Subtitles
                      <span className="text-[10px] px-1.5 py-0.2 bg-indigo-950/80 text-indigo-300 border border-indigo-800/40 rounded">Live / SRT</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Voice notes, transcription guides & WebVTT/SRT generator
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Formats Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setFormatsDropdownOpen(true)}
            onMouseLeave={() => setFormatsDropdownOpen(false)}
          >
            <button
              id="formats-menu-button"
              type="button"
              className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/formats')
                  ? 'text-cyan-400 bg-slate-800/60'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
              onClick={() => setFormatsDropdownOpen(!formatsDropdownOpen)}
            >
              <span>Format Guides</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${formatsDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
            </button>

            {formatsDropdownOpen && (
              <div 
                id="formats-dropdown-menu"
                className="absolute top-full left-0 w-72 mt-1 p-2 bg-[#0e1424] border border-slate-800 rounded-xl shadow-2xl shadow-black/80 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Technical Specifications
                </div>
                <Link
                  href="/formats/mp3"
                  id="nav-format-mp3"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/70 text-slate-200 hover:text-cyan-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">.mp3</span>
                    <span className="text-sm font-medium">MP3 Guide & Specs</span>
                  </div>
                  <span className="text-xs text-slate-400">Lossy</span>
                </Link>
                <Link
                  href="/formats/wav"
                  id="nav-format-wav"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/70 text-slate-200 hover:text-cyan-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">.wav</span>
                    <span className="text-sm font-medium">WAV Guide & Specs</span>
                  </div>
                  <span className="text-xs text-slate-400">Raw PCM</span>
                </Link>
                <Link
                  href="/formats/ogg"
                  id="nav-format-ogg"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/70 text-slate-200 hover:text-cyan-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">.ogg</span>
                    <span className="text-sm font-medium">OGG Vorbis / Opus</span>
                  </div>
                  <span className="text-xs text-slate-400">FOSS</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            id="nav-link-blog"
            className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive('/blog')
                ? 'text-cyan-400 bg-slate-800/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Guides & Articles
          </Link>

          <Link
            href="/about"
            id="nav-link-about"
            className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive('/about')
                ? 'text-cyan-400 bg-slate-800/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            About Us
          </Link>

          <Link
            href="/contact"
            id="nav-link-contact"
            className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive('/contact')
                ? 'text-cyan-400 bg-slate-800/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA Button & Privacy Tag */}
        <div className="hidden md:flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>0 Bytes Uploaded (100% Private)</span>
          </div>

          <Link
            href="/tools/audio-converter"
            id="nav-cta-launch-tool"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 active:scale-[0.98] transition-all"
          >
            <span>Open Tool</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden">
          <button
            id="mobile-menu-toggle-button"
            type="button"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer-menu"
          className="lg:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
            Tools
          </div>
          <div className="grid grid-cols-1 gap-1">
            <Link
              href="/tools/audio-converter"
              id="mobile-link-audio-converter"
              className="flex items-center gap-3 p-2 rounded-lg text-slate-200 hover:bg-slate-800/60"
            >
              <Volume2 className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-sm font-medium">Audio Converter & Waveform Lab</div>
                <div className="text-xs text-slate-400">MP3, WAV, OGG, WebM transcode</div>
              </div>
            </Link>
            <Link
              href="/tools/video-trimmer"
              id="mobile-link-video-trimmer"
              className="flex items-center gap-3 p-2 rounded-lg text-slate-200 hover:bg-slate-800/60"
            >
              <Scissors className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-sm font-medium">Video Trimmer Studio</div>
                <div className="text-xs text-slate-400">Timeline scrub, aspect presets & slice</div>
              </div>
            </Link>
            <Link
              href="/tools/audio-to-text"
              id="mobile-link-audio-to-text"
              className="flex items-center gap-3 p-2 rounded-lg text-slate-200 hover:bg-slate-800/60"
            >
              <FileText className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-sm font-medium">Audio to Text & Subtitles</div>
                <div className="text-xs text-slate-400">Speech recognition, SRT/VTT notes</div>
              </div>
            </Link>
          </div>

          <div className="border-t border-slate-800/80 pt-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">
              Format Guides
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Link
                href="/formats/mp3"
                className="p-2 rounded bg-slate-900/60 border border-slate-800 text-center text-xs font-mono text-slate-300 hover:text-cyan-400"
              >
                MP3 Guide
              </Link>
              <Link
                href="/formats/wav"
                className="p-2 rounded bg-slate-900/60 border border-slate-800 text-center text-xs font-mono text-slate-300 hover:text-cyan-400"
              >
                WAV Guide
              </Link>
              <Link
                href="/formats/ogg"
                className="p-2 rounded bg-slate-900/60 border border-slate-800 text-center text-xs font-mono text-slate-300 hover:text-cyan-400"
              >
                OGG Guide
              </Link>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-3 space-y-1">
            <Link
              href="/blog"
              className="block p-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800/60"
            >
              Articles & Guides
            </Link>
            <Link
              href="/about"
              className="block p-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800/60"
            >
              About Us & Architecture
            </Link>
            <Link
              href="/contact"
              className="block p-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800/60"
            >
              Contact Support
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/tools/audio-converter"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950"
            >
              Launch Converter Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
