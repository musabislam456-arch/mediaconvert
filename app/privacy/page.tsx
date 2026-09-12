import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — MediaConvert Zero-Data-Egress Pledge',
  description:
    'Our comprehensive privacy policy detailing our zero-data-egress architecture: zero files uploaded, zero server logs, 100% in-browser processing.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-cyan-400 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-cyan-400 font-bold">Privacy Policy</span>
      </div>

      <header className="space-y-3 pb-6 border-b border-slate-800/80">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Effective Date: January 1, 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          MediaConvert Privacy Policy & Data Architecture
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          At MediaConvert, privacy is not a marketing afterthought—it is our primary architectural constraint.
        </p>
      </header>

      {/* Summary Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-[#0a101d] border border-emerald-800/40 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <Lock className="w-4 h-4" />
          <span>Executive Summary: Zero Media Egress</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          MediaConvert does not operate remote transcoding servers. When you open an audio or video file in our tools, it is decoded, analyzed, trimmed, and converted strictly inside your personal device’s local browser sandbox (RAM). Zero bytes of your audio, video, or speech transcripts are ever transmitted to our servers or any third-party infrastructure.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">1. Scope of Processing</h2>
          <p>
            This Privacy Policy applies to all utilities accessible on the MediaConvert domain, including the Audio Converter & Waveform Lab, Video Trimmer Studio, Audio to Text transcription workspace, and Format Guide repositories.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">2. Local-First Processing Guarantee</h2>
          <p>
            Traditional online converters upload your media payload across HTTPS connections to cloud workers (e.g. AWS EC2, S3 buckets). MediaConvert utilizes modern W3C standards:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li><strong>Web Audio API:</strong> Audio decoding occurs natively via your operating system’s audio driver.</li>
            <li><strong>HTML5 Canvas & MediaRecorder:</strong> Video scrubbing, aspect previews, and trim slicing occur directly in local GPU/CPU pipelines.</li>
            <li><strong>Web Speech API:</strong> Live microphone dictation uses browser-native speech engines.</li>
          </ul>
          <p>
            At no point in the lifecycle of any operation does MediaConvert create network socket streams or HTTP multipart uploads containing your files.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">3. Information We Collect</h2>
          <p>
            Because we do not require account registration, we do not collect personal identifiers, passwords, or credit card numbers. The only minimal data we may collect includes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li><strong>Aggregate Traffic Metrics:</strong> Anonymous server-level HTTP request headers (IP address, browser user-agent, requested URL) to maintain infrastructure availability and mitigate DDoS attacks.</li>
            <li><strong>User-Initiated Correspondence:</strong> If you submit a message via our Contact form, we retain your supplied name, email, and message solely to respond to your inquiry.</li>
            <li><strong>Waitlist Submissions:</strong> If you voluntarily join our FFmpeg.wasm waitlist, your email is stored securely and used only for release announcements.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">4. Cookies and Local Storage</h2>
          <p>
            MediaConvert does not use invasive advertising trackers or cross-site tracking cookies. We may use local client-side key-value browser storage (\`localStorage\`) solely to persist your local user interface preferences (such as selected theme or volume state).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">5. Third-Party Integrations</h2>
          <p>
            Our web application is static and does not sell, rent, or monetize your usage data. Any optional client embed scripts (such as customer support widgets) are governed by their respective privacy disclosures.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white">6. Contact for Privacy Inquiries</h2>
          <p>
            If you have questions regarding our security architecture or wish to conduct a responsible disclosure audit, contact our security officer at: <a href="mailto:security@mediaconvert.io" className="text-cyan-400 underline">security@mediaconvert.io</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
