import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS, BlogPost } from '@/lib/blog-data';
import { Clock, ArrowLeft, ArrowRight, Share2, Tag, BookOpen, Volume2, ShieldCheck } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found — MediaConvert',
    };
  }

  return {
    title: `${post.title} — MediaConvert Guides`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Split content by paragraphs/headings
  const sections = post.content.trim().split('\n\n');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-cyan-400 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-cyan-400">
          Articles
        </Link>
        <span>/</span>
        <span className="text-cyan-400 font-bold truncate max-w-xs">{post.title}</span>
      </div>

      {/* Header */}
      <header className="space-y-4 pb-8 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
            {post.category}
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{post.readTime}</span>
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">{post.publishedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {post.description}
        </p>

        {/* Author Bio Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
              {post.author.name[0]}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-100">{post.author.name}</div>
              <div className="text-xs text-slate-400">{post.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/tools/audio-converter"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Try Converter Tool</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="prose prose-invert max-w-none space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
        {sections.map((section, idx) => {
          const trimmed = section.trim();
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl sm:text-2xl font-bold text-white pt-4 pb-1 border-b border-slate-800/60">
                {trimmed.replace('### ', '')}
              </h3>
            );
          }
          if (trimmed.startsWith('#### ')) {
            return (
              <h4 key={idx} className="text-base sm:text-lg font-bold text-cyan-300 pt-2">
                {trimmed.replace('#### ', '')}
              </h4>
            );
          }
          if (trimmed.startsWith('---')) {
            return <hr key={idx} className="border-slate-800 my-8" />;
          }
          if (trimmed.startsWith('> ')) {
            return (
              <blockquote key={idx} className="border-l-4 border-cyan-400 bg-cyan-950/20 px-4 py-3 rounded-r-xl italic text-slate-200 text-sm my-4">
                {trimmed.replace('> ', '')}
              </blockquote>
            );
          }
          if (trimmed.startsWith('|')) {
            // Render Markdown Table
            const rows = trimmed.split('\n').map((row) =>
              row
                .split('|')
                .filter((cell) => cell.trim() !== '')
                .map((cell) => cell.trim())
            );
            const headers = rows[0] || [];
            const dataRows = rows.slice(2); // Skip separator

            return (
              <div key={idx} className="overflow-x-auto my-6 rounded-xl border border-slate-800">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 text-slate-200 border-b border-slate-800">
                      {headers.map((h, i) => (
                        <th key={i} className="p-3 font-semibold font-mono text-cyan-300">
                          {h.replace(/\*\*/g, '')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-[#0a0f1d]">
                    {dataRows.map((r, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/30">
                        {r.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 text-slate-300 font-mono text-xs">
                            {cell.replace(/\*\*/g, '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
            const listItems = trimmed.split('\n');
            return (
              <ul key={idx} className="space-y-2 pl-5 list-disc marker:text-cyan-400 text-slate-300">
                {listItems.map((li, lIdx) => (
                  <li key={lIdx}>
                    {li.replace(/^[-*]\s+|\d+\.\s+/, '')}
                  </li>
                ))}
              </ul>
            );
          }
          return <p key={idx}>{trimmed}</p>;
        })}
      </main>

      {/* Article Footer & Tags */}
      <footer className="pt-8 border-t border-slate-800/80 space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 mr-2">Topics:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c1426] via-[#09101e] to-[#070b16] border border-cyan-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <h4 className="text-base font-bold text-white">Put These Principles Into Practice</h4>
            <p className="text-xs text-slate-400 mt-1">
              Verify bitrates, analyze waveform dynamics, and transcode audio 100% locally in your browser.
            </p>
          </div>
          <Link
            href="/tools/audio-converter"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shrink-0 transition-all"
          >
            <span>Launch MediaConvert</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
