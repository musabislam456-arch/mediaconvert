import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — MediaConvert',
  description:
    'Terms of service and usage conditions for MediaConvert audio and video utilities.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-cyan-400 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-cyan-400 font-bold">Terms of Service</span>
      </div>

      <header className="space-y-3 pb-6 border-b border-slate-800/80">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-300">
          Last updated: January 1, 2026
        </p>
      </header>

      <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using MediaConvert (the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the utilities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">2. Permitted Commercial & Personal Use</h2>
          <p>
            MediaConvert is provided free of charge for both individual personal creative projects and commercial professional workflows, including podcast syndication, commercial video editing, broadcast mastering, and sound design.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">3. Intellectual Property Rights Over User Media</h2>
          <p>
            You retain 100% full, unencumbered ownership and all copyright rights to any audio or video files processed through the application. Because all transformations occur in local volatile memory, MediaConvert claims no license, title, or interest in your content.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">4. User Responsibilities & Prohibited Acts</h2>
          <p>
            You represent and warrant that you possess all necessary rights, licenses, or permissions to process, transcode, or extract audio from the media files you introduce into the browser sandbox. You agree not to attempt to reverse engineer, disrupt, or introduce malicious payloads into our web client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">5. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. While our client-side signal processing algorithms are built to conform with industry audio standards, MediaConvert makes no representations or warranties regarding uninterrupted availability, fitness for a specific broadcast requirement, or hardware compatibility.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, MediaConvert and its contributors shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">7. Governing Law & Contact</h2>
          <p>
            These terms are governed by the laws of the State of California. Questions regarding these Terms should be directed to: <a href="mailto:legal@mediaconvert.io" className="text-cyan-400 underline">legal@mediaconvert.io</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
