'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Mic, 
  MicOff, 
  Copy, 
  Check, 
  Download, 
  Volume2, 
  Clock, 
  Sparkles, 
  ShieldAlert, 
  Layers, 
  BookOpen, 
  ListOrdered 
} from 'lucide-react';

interface TranscriptItem {
  id: string;
  timestamp: string;
  speaker: string;
  text: string;
  seconds: number;
}

export function AudioToTextStudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptItems, setTranscriptItems] = useState<TranscriptItem[]>([
    {
      id: '1',
      timestamp: '00:00:02',
      speaker: 'Speaker 1',
      text: 'Welcome to the audio transcription studio. You can dictate notes live or edit timestamps directly.',
      seconds: 2
    },
    {
      id: '2',
      timestamp: '00:00:07',
      speaker: 'Speaker 2',
      text: 'All transcription and subtitle exports run entirely in your local browser with zero cloud storage.',
      seconds: 7
    }
  ]);
  const [currentInterim, setCurrentInterim] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'notes'>('editor');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [copied, setCopied] = useState(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    }
    return true;
  });

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check SpeechRecognition support in browser
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage;

      recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            const finalTxt = item[0].transcript.trim();
            if (finalTxt) {
              const nowSec = Math.floor(Date.now() / 1000) % 3600;
              const mins = Math.floor(nowSec / 60).toString().padStart(2, '0');
              const secs = (nowSec % 60).toString().padStart(2, '0');
              
              setTranscriptItems((prev) => [
                ...prev,
                {
                  id: Math.random().toString(36).substring(7),
                  timestamp: `00:${mins}:${secs}`,
                  speaker: 'Speaker 1',
                  text: finalTxt,
                  seconds: nowSec
                }
              ]);
            }
          } else {
            interim += item[0].transcript;
          }
        }
        setCurrentInterim(interim);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition warning:', e);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        setCurrentInterim('');
      };

      recognitionRef.current = recognition;
    } catch {
      requestAnimationFrame(() => setSpeechSupported(false));
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [selectedLanguage]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.lang = selectedLanguage;
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCopyText = () => {
    const raw = transcriptItems.map((t) => `[${t.timestamp}] ${t.speaker}: ${t.text}`).join('\n\n');
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Export as .srt subtitle format
  const exportAsSrt = () => {
    let srtContent = '';
    transcriptItems.forEach((item, index) => {
      const idx = index + 1;
      const startMs = item.seconds * 1000;
      const endMs = startMs + 3500; // default 3.5s reading window

      const formatSrtTime = (ms: number) => {
        const hrs = Math.floor(ms / 3600000).toString().padStart(2, '0');
        const mins = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
        const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
        const millis = (ms % 1000).toString().padStart(3, '0');
        return `${hrs}:${mins}:${secs},${millis}`;
      };

      srtContent += `${idx}\n${formatSrtTime(startMs)} --> ${formatSrtTime(endMs)}\n${item.speaker}: ${item.text}\n\n`;
    });

    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript-subtitles.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Export as .vtt format
  const exportAsVtt = () => {
    let vttContent = 'WEBVTT - Generated by MediaConvert Local Suite\n\n';
    transcriptItems.forEach((item) => {
      const startMs = item.seconds * 1000;
      const endMs = startMs + 3500;

      const formatVttTime = (ms: number) => {
        const hrs = Math.floor(ms / 3600000).toString().padStart(2, '0');
        const mins = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
        const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
        const millis = (ms % 1000).toString().padStart(3, '0');
        return `${hrs}:${mins}:${secs}.${millis}`;
      };

      vttContent += `${formatVttTime(startMs)} --> ${formatVttTime(endMs)}\n<v ${item.speaker}>${item.text}\n\n`;
    });

    const blob = new Blob([vttContent], { type: 'text/vtt;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript-subtitles.vtt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Export as plain txt
  const exportAsTxt = () => {
    const raw = transcriptItems.map((t) => `[${t.timestamp}] ${t.speaker}: ${t.text}`).join('\n\n');
    const blob = new Blob([raw], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript-notes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div id="audio-to-text-workbench" className="w-full bg-[#0d1322] border border-slate-800/90 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-black/60">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Audio to Text & Transcription Suite
            </h2>
            <span className="px-2 py-0.5 text-[11px] font-mono uppercase bg-indigo-950 text-indigo-300 border border-indigo-800/60 rounded">
              Web Speech & SRT Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Live browser dictation, timestamp cue editor, SRT/VTT subtitle generator, and engineering notes.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'editor'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Transcription Workspace</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ASR Engineering Notes</span>
          </button>
        </div>
      </div>

      {activeTab === 'editor' ? (
        <div className="mt-6 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800 gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleRecording}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-400 text-white animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    <span>Stop Dictation</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>Live Mic Dictation</span>
                  </>
                )}
              </button>

              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-400 font-mono"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish (ES)</option>
                <option value="fr-FR">French (FR)</option>
                <option value="de-DE">German (DE)</option>
                <option value="ja-JP">Japanese (JA)</option>
              </select>

              {!speechSupported && (
                <span className="text-xs text-amber-400 font-mono">
                  (Web Speech API active on Chrome/Safari/Edge)
                </span>
              )}
            </div>

            {/* Export Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyText}
                className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy All'}</span>
              </button>
              <button
                type="button"
                onClick={exportAsSrt}
                className="px-3 py-1.5 text-xs rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-200 flex items-center gap-1.5 transition-colors font-mono"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .SRT</span>
              </button>
              <button
                type="button"
                onClick={exportAsVtt}
                className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors font-mono"
              >
                <Download className="w-3.5 h-3.5" />
                <span>.VTT</span>
              </button>
              <button
                type="button"
                onClick={exportAsTxt}
                className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors font-mono"
              >
                <span>.TXT</span>
              </button>
            </div>
          </div>

          {/* Real-time Interim Banner */}
          {isRecording && (
            <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/60 flex items-center gap-3 text-xs text-indigo-200 animate-in fade-in">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping shrink-0" />
              <div>
                <span className="font-semibold text-white mr-1">Listening:</span>
                <span className="italic text-indigo-300">
                  {currentInterim || 'Speak into your microphone to transcribe in real time...'}
                </span>
              </div>
            </div>
          )}

          {/* Transcript List Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Timestamp Cues ({transcriptItems.length})</span>
              <button
                type="button"
                onClick={() => {
                  const nowSec = Math.floor(Date.now() / 1000) % 3600;
                  setTranscriptItems((prev) => [
                    ...prev,
                    {
                      id: Math.random().toString(36).substring(7),
                      timestamp: `00:${Math.floor(nowSec / 60).toString().padStart(2, '0')}:${(nowSec % 60).toString().padStart(2, '0')}`,
                      speaker: `Speaker ${prev.length % 2 === 0 ? 1 : 2}`,
                      text: '',
                      seconds: nowSec
                    }
                  ]);
                }}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                + Add Timestamp Cue
              </button>
            </div>

            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {transcriptItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row items-start sm:items-center gap-3"
                >
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 w-5">#{index + 1}</span>
                    <input
                      type="text"
                      value={item.timestamp}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTranscriptItems((prev) =>
                          prev.map((it) => (it.id === item.id ? { ...it, timestamp: val } : it))
                        );
                      }}
                      className="w-20 px-2 py-1 text-xs font-mono rounded bg-slate-800 border border-slate-700 text-cyan-300 text-center"
                    />
                    <input
                      type="text"
                      value={item.speaker}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTranscriptItems((prev) =>
                          prev.map((it) => (it.id === item.id ? { ...it, speaker: val } : it))
                        );
                      }}
                      className="w-24 px-2 py-1 text-xs font-semibold rounded bg-slate-800 border border-slate-700 text-indigo-300"
                    />
                  </div>

                  <input
                    type="text"
                    value={item.text}
                    placeholder="Enter transcribed sentence..."
                    onChange={(e) => {
                      const val = e.target.value;
                      setTranscriptItems((prev) =>
                        prev.map((it) => (it.id === item.id ? { ...it, text: val } : it))
                      );
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setTranscriptItems((prev) => prev.filter((it) => it.id !== item.id));
                    }}
                    className="text-slate-500 hover:text-red-400 text-xs px-1 shrink-0"
                    title="Remove cue"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Detailed Transcription Engineering Notes */
        <div className="mt-6 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>The Audio Engineer&apos;s Guide to High-Accuracy Transcription</span>
            </h3>
            <p className="text-slate-400">
              Modern Automated Speech Recognition (ASR) engines like OpenAI Whisper, Conformer, and Google DeepSpeech rely heavily on acoustic pre-processing. Garbage audio in produces hallucinated or mangled transcriptions out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#090e1c] border border-slate-800 space-y-2">
              <div className="font-semibold text-indigo-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>1. The 16 kHz Mono Standard</span>
              </div>
              <p className="text-xs text-slate-400">
                Nearly every ASR model is trained on 16 kHz, single-channel (Mono) audio. Supplying 96 kHz or 48 kHz stereo multitrack audio forces the transcription pipeline to downsample on the fly, introducing resampling phase jitter. Downmix to Mono using MediaConvert before feeding to Whisper.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090e1c] border border-slate-800 space-y-2">
              <div className="font-semibold text-cyan-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>2. High-Pass Filtering (80 Hz Cut)</span>
              </div>
              <p className="text-xs text-slate-400">
                Sub-bass vibrations from air conditioners, table bumps, and plosive mouth air bursts sit below 80 Hz. While human listeners tune them out, neural ASR attention heads waste feature-map dimensions analyzing sub-bass rumble, spiking Word Error Rates (WER).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090e1c] border border-slate-800 space-y-2">
              <div className="font-semibold text-emerald-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>3. Dynamic Range Compression</span>
              </div>
              <p className="text-xs text-slate-400">
                When one speaker whispers while another laughs loudly, fixed threshold acoustic decoders lose words during quiet passages. Applying light vocal compression (2:1 to 3:1 ratio with fast attack) levels vocal amplitudes for uniform recognition.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090e1c] border border-slate-800 space-y-2">
              <div className="font-semibold text-amber-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>4. Client-Side vs Cloud Whisper</span>
              </div>
              <p className="text-xs text-slate-400">
                With WebAssembly and WebGPU (Transformers.js), Whisper Tiny and Base can run directly inside browser client RAM, providing 100% confidential speech-to-text without GDPR, HIPAA, or cloud subscription fees.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
