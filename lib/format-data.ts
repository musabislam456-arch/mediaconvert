export interface AudioFormatInfo {
  id: string;
  name: string;
  extension: string;
  mimeType: string;
  type: 'Lossy' | 'Lossless' | 'Uncompressed';
  developer: string;
  releaseYear: number;
  maxSampleRate: string;
  bitDepth: string;
  typicalBitrate: string;
  compressionRatio: string;
  licensing: string;
  browserSupport: string;
  bestFor: string[];
  pros: string[];
  cons: string[];
  technicalOverview: string;
  encodingAdvice: string;
}

export const AUDIO_FORMATS: Record<string, AudioFormatInfo> = {
  mp3: {
    id: 'mp3',
    name: 'MP3 (MPEG-1 Audio Layer III)',
    extension: '.mp3',
    mimeType: 'audio/mpeg',
    type: 'Lossy',
    developer: 'Fraunhofer IIS & MPEG',
    releaseYear: 1993,
    maxSampleRate: '48 kHz',
    bitDepth: '16-bit equivalent (floating)',
    typicalBitrate: '128 - 320 kbps',
    compressionRatio: '10:1 to 12:1',
    licensing: 'Patents expired in 2017 (Free to use worldwide)',
    browserSupport: '100% universal across all browsers, mobile OS, and hardware',
    bestFor: [
      'Podcast syndication and RSS distribution',
      'Web audio playback with universal legacy compatibility',
      'Spoken word, audiobooks, and background music',
      'Car stereos and older embedded hardware players'
    ],
    pros: [
      'Universal compatibility with every device manufactured in the last 30 years',
      'Mature ID3 metadata support for artwork, chapters, and timestamps',
      'Compact file size with acceptable psychoacoustic perceptual transparency at 192-320 kbps',
      'Patent-free since Fraunhofer licensing sunset in April 2017'
    ],
    cons: [
      'Lossy compression discards subtle high-frequency spatial harmonics above 16-18 kHz',
      'Introduces padding latency delay (typically 528–1052 samples of silence at start)',
      'Cannot reproduce true gapless playback without proprietary encoder hacks',
      'Lower audio quality per bit compared to modern codecs like AAC or Opus'
    ],
    technicalOverview:
      'MP3 uses a modified discrete cosine transform (MDCT) and psychoacoustic masking algorithms to remove frequencies imperceptible to the human auditory system. It suppresses quieter signals masked by louder neighboring frequencies (temporal and spectral masking).',
    encodingAdvice:
      'Use 320 kbps CBR or VBR 0 (LAME) for music production master distribution. For spoken podcasts, 96 kbps to 128 kbps mono achieves pristine speech intelligibility with minimal bandwidth.'
  },
  wav: {
    id: 'wav',
    name: 'WAV (Waveform Audio File Format)',
    extension: '.wav',
    mimeType: 'audio/wav',
    type: 'Uncompressed',
    developer: 'Microsoft & IBM',
    releaseYear: 1991,
    maxSampleRate: '192 kHz+ (Up to hardware limits)',
    bitDepth: '16-bit, 24-bit, 32-bit float',
    typicalBitrate: '1,411 kbps (16-bit/44.1kHz Stereo) to 4,608 kbps (24-bit/96kHz)',
    compressionRatio: '1:1 (No compression)',
    licensing: 'Open Standard / Public Domain RIFF specification',
    browserSupport: 'Universal native decoding in all modern desktop and mobile browsers',
    bestFor: [
      'Digital Audio Workstations (DAW) recording and multitrack editing',
      'Mastering reference files for distribution to Apple Music and Spotify',
      'Foley, sound effects, and game audio sample libraries',
      'Archival preservation and forensic audio analysis'
    ],
    pros: [
      'Zero generational loss — bit-perfect mathematical reproduction of recorded audio',
      'Native support for 32-bit floating point, virtually eliminating digital clipping during production',
      'Zero latency decoding overhead, ideal for real-time DSP plugins and synthesizers',
      'Universal standard across Pro Tools, Ableton, Logic, and Reaper'
    ],
    cons: [
      'Enormous file sizes (approx 10.5 MB per minute of stereo 16-bit/44.1kHz audio)',
      'RIFF format 32-bit pointer limits standard WAV files to a maximum size of 4 GB (RF64 required beyond)',
      'Inconsistent tag metadata handling between different audio editing software',
      'Unsuitable for direct web streaming or mobile cellular bandwidth'
    ],
    technicalOverview:
      'WAV stores linear pulse-code modulation (LPCM) sample values directly inside a Resource Interchange File Format (RIFF) container. Each sample is a quantized voltage amplitude measurement with no predictive or perceptual filtering.',
    encodingAdvice:
      'Record in 24-bit / 48 kHz for modern video synchronization and headroom. Export master files in 24-bit PCM. For web delivery, always convert to AAC, WebM, or MP3 unless delivering raw stems.'
  },
  ogg: {
    id: 'ogg',
    name: 'OGG Vorbis / OGG Opus',
    extension: '.ogg',
    mimeType: 'audio/ogg',
    type: 'Lossy',
    developer: 'Xiph.Org Foundation',
    releaseYear: 2000,
    maxSampleRate: '48 kHz (Opus) / 96 kHz (Vorbis)',
    bitDepth: 'Floating point internal representation',
    typicalBitrate: '64 - 192 kbps (Vorbis) / 32 - 128 kbps (Opus)',
    compressionRatio: '12:1 to 20:1',
    licensing: '100% Free, Open Source (BSD-style), Patent-Unencumbered',
    browserSupport: 'Native in Chrome, Firefox, Edge, Safari 15+ (Opus audio/webm)',
    bestFor: [
      'Video game sound engines (Unity, Unreal Engine, Godot) for background loops',
      'Spotify streaming tier (Spotify uses Ogg Vorbis at 96, 160, and 320 kbps)',
      'Real-time low-latency VoIP communications and WebRTC audio',
      'FOSS applications requiring zero royalty liabilities'
    ],
    pros: [
      'Completely open source with zero royalty obligations or licensing audits',
      'Superior acoustic quality to MP3 at identical bitrates, especially in high-transient percussive material',
      'Native support for sample-accurate gapless loops (essential for game soundtracks)',
      'Vorbis comment metadata system is lightweight and UTF-8 clean'
    ],
    cons: [
      'Apple ecosystem historically delayed native Ogg Vorbis container support in QuickTime',
      'Older standalone hardware in-car stereos rarely recognize .ogg files',
      'Often confused between Vorbis codec, Opus codec, and the OGG container encapsulation',
      'Less widely recognized by casual non-technical end users compared to MP3'
    ],
    technicalOverview:
      'OGG is an open multimedia container created by Xiph.Org. Inside, Vorbis utilizes window-switching modified discrete cosine transforms and vector quantization noise modeling. Modern implementations favor Opus inside WebM or OGG, which combines SILK (voice) and CELT (music) engines.',
    encodingAdvice:
      'For game audio, Vorbis Quality 6 (approx 160-192 kbps) delivers audiophile-grade transparency. For voice or modern web applications, use Opus at 64 kbps stereo for astounding clarity that outperforms 128 kbps MP3.'
  },
  flac: {
    id: 'flac',
    name: 'FLAC (Free Lossless Audio Codec)',
    extension: '.flac',
    mimeType: 'audio/flac',
    type: 'Lossless',
    developer: 'Josh Coalson / Xiph.Org Foundation',
    releaseYear: 2001,
    maxSampleRate: '655.35 kHz',
    bitDepth: '4 to 32-bit (Typically 16 or 24-bit)',
    typicalBitrate: '600 - 1,000 kbps (Dynamic VBR)',
    compressionRatio: '2:1 (Average 50% reduction of WAV)',
    licensing: 'Open Source (GPL/BSD), Patent-Free',
    browserSupport: 'Native in all major browsers (Chrome, Firefox, Safari 11+, Edge)',
    bestFor: [
      'Audiophile music archives and Bandcamp lossless purchases',
      'Preserving studio masters without consuming full raw WAV storage footprint',
      'Tidal HiFi and Qobuz high-resolution streaming'
    ],
    pros: [
      'Bit-exact lossless decompression identical to original studio WAV master',
      'Cuts storage footprint by 40% to 60% compared to raw WAV',
      'Fast symmetrical decoding suitable for low-power mobile devices',
      'Full metadata tagging support including embedded cover art'
    ],
    cons: [
      'Much larger than MP3 or AAC (not ideal for metered mobile data)',
      'Legacy Apple iOS Music app prefers ALAC (Apple Lossless) over raw FLAC containers'
    ],
    technicalOverview:
      'FLAC uses linear prediction (LPC) to predict audio samples based on preceding samples, then encodes the residual difference using variable-length Rice entropy coding.',
    encodingAdvice:
      'Use FLAC compression level 5 (the default sweet spot between compression time and file size). Since FLAC is lossless, higher compression numbers only increase encoding time, not audio quality.'
  },
  aac: {
    id: 'aac',
    name: 'AAC (Advanced Audio Coding)',
    extension: '.aac / .m4a',
    mimeType: 'audio/aac',
    type: 'Lossy',
    developer: 'MPEG consortium (Fraunhofer, Dolby, Sony, Bell Labs)',
    releaseYear: 1997,
    maxSampleRate: '96 kHz',
    bitDepth: 'Floating point internal',
    typicalBitrate: '128 - 256 kbps',
    compressionRatio: '12:1 to 16:1',
    licensing: 'Patent pool via Via Licensing Alliance',
    browserSupport: 'Universal native playback across desktop and mobile browsers',
    bestFor: [
      'Apple Music (256 kbps AAC) and YouTube video audio tracks',
      'Mobile streaming apps requiring minimal data usage with high fidelity',
      'Bluetooth audio codecs (AAC codec supported on iPhone and AirPods)'
    ],
    pros: [
      'Significantly higher audio clarity and dynamic fidelity than MP3 at equivalent bitrates',
      'Native gapless playback support built into container specifications',
      'High sample rate support up to 96 kHz'
    ],
    cons: [
      'Commercial encoder licensing fees apply to hardware and standalone app developers'
    ],
    technicalOverview:
      'AAC offers 48 full-bandwidth audio channels, arbitrary bitrates, complex prediction filters, and temporal noise shaping (TNS), significantly outperforming legacy MPEG-1 Layer 3.',
    encodingAdvice:
      'Encode at 256 kbps LC-AAC for near-transparent music delivery. Apple and YouTube consider 256 kbps AAC the gold standard for consumer delivery.'
  }
};
