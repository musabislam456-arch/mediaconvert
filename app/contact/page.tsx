'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, ShieldCheck, CheckCircle2, Clock, MapPin, Send, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Support',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Creator Support & Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Get in Touch with MediaConvert
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Have feedback on our audio algorithms, feature requests for video trimming, or security disclosures? Our engineering team responds within 24 business hours.
        </p>
      </div>

      {/* Main Grid: Form + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#0c1220] border border-slate-800 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white">Message Dispatched Successfully</h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your ticket has been logged with our developer dispatch queue. We will respond to <strong>{formData.email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', category: 'General Support', subject: '', message: '' });
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                Submit Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-2">Send an Engineering Inquiry</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Chen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="creator@studio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option>General Support</option>
                    <option>Codec / Format Feature Request</option>
                    <option>Audio DSP Bug Report</option>
                    <option>Video Trimmer WASM Inquiries</option>
                    <option>Security & Privacy Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Issue with 32-bit float WAV playback..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your workflow, browser version, sample rate, or inquiry in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-y"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Expected response: &lt; 24h</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Sending...' : 'Transmit Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0c1220] border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Direct Channels
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">General & Technical Support</span>
                <a href="mailto:support@mediaconvert.io" className="text-cyan-400 hover:underline font-mono font-medium">
                  support@mediaconvert.io
                </a>
              </div>
              <div>
                <span className="text-slate-400 block">Security Audits & Responsible Disclosure</span>
                <a href="mailto:security@mediaconvert.io" className="text-emerald-400 hover:underline font-mono font-medium">
                  security@mediaconvert.io
                </a>
              </div>
              <div>
                <span className="text-slate-400 block">Press & Editorial Syndicate</span>
                <a href="mailto:press@mediaconvert.io" className="text-indigo-400 hover:underline font-mono font-medium">
                  press@mediaconvert.io
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1426] to-[#070b16] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Need Immediate Assistance?</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Check our extensive technical guides for instant solutions regarding sample rate mismatches, podcast LUFS mastering, and video container remuxing.
            </p>
            <Link
              href="/blog"
              className="inline-block text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-1"
            >
              Browse Engineering Guides &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
