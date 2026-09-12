import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import { BookOpen, Clock, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creator Guides & Engineering Blog — MediaConvert',
  description:
    'Technical field guides on audio mastering, video codec mathematics, podcast distribution, LUFS normalization, and client-side privacy architectures.',
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Engineering Publication</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Media Architecture Guides & Technical Insights
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Comprehensive, fluff-free technical breakdowns covering audio mastering, video compression codecs, browser DSP architectures, and podcasting standards.
        </p>
      </div>

      {/* Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post, idx) => (
          <article
            key={post.slug}
            className={`p-6 sm:p-8 rounded-2xl bg-[#0c1220] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl ${
              idx === 0 ? 'md:col-span-2 bg-gradient-to-br from-[#0e1629] via-[#0c1220] to-[#080d19] border-cyan-900/50' : ''
            }`}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
                  {post.category}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{post.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>{post.publishedDate}</span>
                </div>
              </div>

              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className={`font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight ${
                  idx === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'
                }`}>
                  {post.title}
                </h2>
              </Link>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                  {post.author.name[0]}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">{post.author.name}</div>
                  <div className="text-[11px] text-slate-400">{post.author.role}</div>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
