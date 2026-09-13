import type {Metadata} from 'next';
import './globals.css';
import {Navbar} from '@/components/Navbar';
import {Footer} from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://mediaconvert.toolbay.site'),
  title: 'MediaConvert — Fast Audio & Video Utility Suite (Client-Side)',
  description:
    'Modern client-side audio and video utility suite. Fast format conversion, precision video trimming, waveform inspection, transcription notes, and creator guides.',
  keywords: [
    'audio converter',
    'video trimmer',
    'mp3 converter',
    'wav to mp3',
    'ogg to mp3',
    'client side audio converter',
    'audio transcription notes',
    'podcast audio format',
    'video compression',
  ],
  authors: [{name: 'MediaConvert Systems'}],
  creator: 'MediaConvert',
  openGraph: {
    title: 'MediaConvert — Fast Audio & Video Utility Suite',
    description:
      'Client-side audio & video converter, video trimmer, waveform analyzer, and creator format guides.',
    type: 'website',
    url: 'https://mediaconvert.toolbay.site',
    siteName: 'MediaConvert',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'MediaConvert — Fast Audio & Video Utility Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MediaConvert — Fast Audio & Video Utility Suite',
    description:
      'Client-side audio & video converter, video trimmer, waveform analyzer, and creator format guides.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/icon',
    shortcut: '/icon',
    apple: '/apple-icon',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: '8dLMBNTBkGFQ3zq4GYwdQbjC1ciAalZ87g56dZR1mks',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className="bg-[#090d16] text-slate-100 min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* CHATBOT_SCRIPT_START */}
        {/* Paste client's chatbot <script> embed code here */}
        {/* CHATBOT_SCRIPT_END */}
      </body>
    </html>
  );
}
