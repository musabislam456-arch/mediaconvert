'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Play, 
  Pause, 
  Download, 
  Volume2, 
  Sliders, 
  RotateCcw, 
  FileAudio, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Scissors,
  Radio,
  Clock,
  HardDrive
} from 'lucide-react';
import { WaveformCanvas } from '@/components/WaveformCanvas';
import { audioBufferToWav, formatSeconds, formatFileSize } from '@/lib/audio-encoder';

interface AudioConverterStudioProps {
  initialFormat?: string;
  showFullGuides?: boolean;
}

export function AudioConverterStudio({ initialFormat = 'wav', showFullGuides = true }: AudioConverterStudioProps) {
  const [file, setFile] = useState<File | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Conversion settings
  const [targetFormat, setTargetFormat] = useState<'wav' | 'webm'>(initialFormat === 'webm' ? 'webm' : 'wav');
  const [forceMono, setForceMono] = useState(false);
  const [gainBoost, setGainBoost] = useState(1.0); // 1.0 = 0dB
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [enableTrim, setEnableTrim] = useState(false);
  
  // Export status
  const [isExporting, setIsExporting] = useState(false);
  const [exportedUrl, setExportedUrl] = useState<string | null>(null);
  const [exportedSize, setExportedSize] = useState<number | null>(null);

  // Audio nodes refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Initialize Web Audio Context
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  // Decode file into AudioBuffer
  const handleFileProcess = async (selectedFile: File) => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      stopPlayback();
      setExportedUrl(null);

      const ctx = getAudioContext();
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      // Decode audio
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      setFile(selectedFile);
      setAudioBuffer(decoded);
      setDuration(decoded.duration);
      setTrimStart(0);
      setTrimEnd(decoded.duration);
      setCurrentTime(0);
      pausedAtRef.current = 0;
    } catch (err) {
      console.error('Decoding failed:', err);
      setErrorMsg('Failed to decode audio. Please ensure the file is a valid audio format (MP3, WAV, OGG, AAC, WebM).');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a procedural synth sample for quick instant preview
  const handleLoadSample = async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      stopPlayback();
      const ctx = getAudioContext();
      
      const sampleRate = 44100;
      const lengthSec = 6.0;
      const numSamples = Math.floor(sampleRate * lengthSec);
      const buffer = ctx.createBuffer(2, numSamples, sampleRate);
      
      const left = buffer.getChannelData(0);
      const right = buffer.getChannelData(1);

      // Create an energetic electronic synth arpeggio with pleasant harmonics
      const frequencies = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C, E, G, C, E, G
      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const noteIndex = Math.floor(t * 4) % frequencies.length;
        const freq = frequencies[noteIndex];
        const envelope = Math.exp(-((t * 4) % 1) * 3);
        
        // Harmonics
        const base = Math.sin(2 * Math.PI * freq * t) * envelope;
        const overtone = Math.sin(2 * Math.PI * (freq * 2) * t) * 0.3 * envelope;
        const sub = Math.sin(2 * Math.PI * (freq * 0.5) * t) * 0.4;
        
        // Spatial pan
        left[i] = (base + overtone + sub) * 0.35 * (0.6 + 0.4 * Math.sin(t * 3));
        right[i] = (base + overtone + sub) * 0.35 * (0.6 - 0.4 * Math.sin(t * 3));
      }

      setFile(new File([new Blob(['sample'])], 'synthesizer-arpeggio-demo.wav', { type: 'audio/wav' }));
      setAudioBuffer(buffer);
      setDuration(lengthSec);
      setTrimStart(0);
      setTrimEnd(lengthSec);
      setCurrentTime(0);
      pausedAtRef.current = 0;
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Playback handlers
  const startPlayback = (fromSec?: number) => {
    if (!audioBuffer) return;
    const ctx = getAudioContext();
    stopPlayback();

    const seekTo = fromSec !== undefined ? fromSec : pausedAtRef.current;
    const boundedSeek = Math.max(0, Math.min(duration, seekTo));

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;

    const gainNode = ctx.createGain();
    gainNode.gain.value = gainBoost;

    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    sourceNodeRef.current = source;
    gainNodeRef.current = gainNode;
    startTimeRef.current = ctx.currentTime - boundedSeek;

    source.start(0, boundedSeek);
    setIsPlaying(true);

    const updateTimer = () => {
      if (!sourceNodeRef.current) return;
      const elapsed = ctx.currentTime - startTimeRef.current;
      if (elapsed >= (enableTrim ? trimEnd : duration)) {
        stopPlayback();
        setCurrentTime(enableTrim ? trimStart : 0);
        pausedAtRef.current = enableTrim ? trimStart : 0;
        return;
      }
      setCurrentTime(elapsed);
      animFrameRef.current = requestAnimationFrame(updateTimer);
    };
    animFrameRef.current = requestAnimationFrame(updateTimer);
  };

  const stopPlayback = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      } catch {}
      sourceNodeRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pausedAtRef.current = currentTime;
      stopPlayback();
    } else {
      startPlayback(currentTime);
    }
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    pausedAtRef.current = time;
    if (isPlaying) {
      startPlayback(time);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Update gain on the fly
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = gainBoost;
    }
  }, [gainBoost]);

  // Execute client-side conversion / export
  const handleExport = async () => {
    if (!audioBuffer) return;
    try {
      setIsExporting(true);
      setErrorMsg(null);

      const effectiveStart = enableTrim ? trimStart : 0;
      const effectiveEnd = enableTrim ? trimEnd : duration;

      if (targetFormat === 'wav') {
        // Pure local 16-bit PCM RIFF WAV encoder
        const wavBlob = audioBufferToWav(audioBuffer, {
          startSec: effectiveStart,
          endSec: effectiveEnd,
          gain: gainBoost,
          forceMono: forceMono,
        });

        const url = URL.createObjectURL(wavBlob);
        setExportedUrl(url);
        setExportedSize(wavBlob.size);

        // Trigger automatic download
        const a = document.createElement('a');
        const originalName = file?.name.replace(/\.[^/.]+$/, '') || 'converted-audio';
        a.href = url;
        a.download = `${originalName}-converted.wav`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        // WebM Audio export using MediaRecorder
        const ctx = getAudioContext();
        const dest = ctx.createMediaStreamDestination();
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;

        const gainNode = ctx.createGain();
        gainNode.gain.value = gainBoost;
        source.connect(gainNode);
        gainNode.connect(dest);

        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm';

        const recorder = new MediaRecorder(dest.stream, { mimeType });
        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          const webmBlob = new Blob(chunks, { type: mimeType });
          const url = URL.createObjectURL(webmBlob);
          setExportedUrl(url);
          setExportedSize(webmBlob.size);

          const a = document.createElement('a');
          const originalName = file?.name.replace(/\.[^/.]+$/, '') || 'converted-audio';
          a.href = url;
          a.download = `${originalName}-converted.webm`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setIsExporting(false);
        };

        recorder.start();
        const durationSlice = effectiveEnd - effectiveStart;
        source.start(0, effectiveStart, durationSlice);

        setTimeout(() => {
          recorder.stop();
          source.stop();
        }, durationSlice * 1000 + 200);
        return;
      }
    } catch (err) {
      console.error('Export error:', err);
      setErrorMsg('Export failed. Please check browser permissions and audio buffer.');
    } finally {
      setIsExporting(false);
    }
  };

  // Peak amplitude calculation
  const getPeakDbfs = () => {
    if (!audioBuffer) return 'N/A';
    const ch0 = audioBuffer.getChannelData(0);
    let max = 0;
    for (let i = 0; i < ch0.length; i += 10) {
      const abs = Math.abs(ch0[i]);
      if (abs > max) max = abs;
    }
    if (max === 0) return '-∞ dBFS';
    const db = 20 * Math.log10(max);
    return `${db.toFixed(1)} dBFS`;
  };

  return (
    <div id="audio-converter-workbench" className="w-full bg-[#0d1322] border border-slate-800/90 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-black/60">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Audio Converter & Waveform Lab
            </h2>
            <span className="px-2 py-0.5 text-[11px] font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-800/60 rounded">
              Web Audio API
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Convert, inspect PCM waveform, boost gain, and export audio with zero cloud uploads.
          </p>
        </div>

        <button
          id="btn-load-sample"
          type="button"
          onClick={handleLoadSample}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Load Test Synth Demo</span>
        </button>
      </div>

      {/* Error notification */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Workspace Area */}
      <div className="mt-6 space-y-6">
        {/* Upload Dropzone */}
        {!audioBuffer ? (
          <label 
            id="audio-dropzone"
            className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700/80 hover:border-cyan-500/70 bg-[#0a0e1a]/60 hover:bg-[#0a0e1a] transition-all rounded-xl p-8 sm:p-12 cursor-pointer group text-center"
          >
            <input
              type="file"
              accept="audio/*,video/mp4,video/webm"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileProcess(e.target.files[0]);
                }
              }}
            />
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-4 shadow-lg shadow-cyan-950/40">
              <Upload className="w-7 h-7" />
            </div>
            <div className="text-base font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
              {isLoading ? 'Decoding Audio in Browser...' : 'Drop your audio file here, or click to browse'}
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Supports MP3, WAV, OGG, FLAC, AAC, M4A, and WebM. Processed 100% locally.
            </p>
            <div className="flex items-center gap-2 mt-4 text-[11px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/40">.mp3</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/40">.wav</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/40">.ogg</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/40">.flac</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/40">.m4a</span>
            </div>
          </label>
        ) : (
          <div className="space-y-6">
            {/* Loaded File Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 shrink-0">
                  <FileAudio className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-100 truncate">
                    {file?.name || 'In-Memory Audio Buffer'}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-3 mt-0.5 font-mono">
                    <span>{file ? formatFileSize(file.size) : 'Calculated'}</span>
                    <span>•</span>
                    <span>{audioBuffer.sampleRate} Hz</span>
                    <span>•</span>
                    <span>{audioBuffer.numberOfChannels === 1 ? 'Mono' : 'Stereo'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <label className="cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors">
                  <input
                    type="file"
                    accept="audio/*,video/mp4,video/webm"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileProcess(e.target.files[0]);
                    }}
                  />
                  <span>Replace File</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    stopPlayback();
                    setAudioBuffer(null);
                    setFile(null);
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Waveform Visualizer */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300 uppercase tracking-wider font-mono">
                  PCM Waveform & Time Scrub
                </span>
                <span className="font-mono">
                  Click or drag waveform to scrub playback
                </span>
              </div>

              <WaveformCanvas
                audioBuffer={audioBuffer}
                currentTime={currentTime}
                duration={duration}
                isPlaying={isPlaying}
                onSeek={handleSeek}
                trimStart={trimStart}
                trimEnd={trimEnd}
                showTrimHandles={enableTrim}
              />

              {/* Playback Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    id="btn-play-pause-audio"
                    type="button"
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Play Audio</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSeek(enableTrim ? trimStart : 0)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Reset to beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <div className="font-mono text-xs text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                    {formatSeconds(currentTime)} <span className="text-slate-500">/</span> {formatSeconds(duration)}
                  </div>
                </div>

                {/* Trim Toggle */}
                <button
                  type="button"
                  onClick={() => setEnableTrim(!enableTrim)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    enableTrim
                      ? 'bg-cyan-950 border-cyan-700 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>{enableTrim ? 'Trimming Active' : 'Trim Audio Segment'}</span>
                </button>
              </div>

              {/* Trimmer Sliders if enabled */}
              {enableTrim && (
                <div className="p-4 rounded-xl bg-[#090e1c] border border-cyan-800/40 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
                  <div>
                    <label className="text-xs font-semibold text-emerald-400 flex items-center justify-between mb-1">
                      <span>Start Point (In)</span>
                      <span className="font-mono">{formatSeconds(trimStart)}</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={duration}
                      step={0.05}
                      value={trimStart}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setTrimStart(Math.min(val, trimEnd - 0.1));
                      }}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-red-400 flex items-center justify-between mb-1">
                      <span>End Point (Out)</span>
                      <span className="font-mono">{formatSeconds(trimEnd)}</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={duration}
                      step={0.05}
                      value={trimEnd}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setTrimEnd(Math.max(val, trimStart + 0.1));
                      }}
                      className="w-full accent-red-400 cursor-pointer"
                    />
                  </div>
                  <div className="col-span-full text-[11px] text-slate-400 font-mono">
                    Output Clip Duration: <span className="text-cyan-300">{formatSeconds(Math.max(0, trimEnd - trimStart))}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Audio Technical Inspection Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Sample Rate</div>
                <div className="text-sm font-semibold text-slate-200 font-mono mt-0.5">
                  {audioBuffer.sampleRate.toLocaleString()} Hz
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Channel Mode</div>
                <div className="text-sm font-semibold text-slate-200 font-mono mt-0.5">
                  {audioBuffer.numberOfChannels === 1 ? '1 (Mono)' : `${audioBuffer.numberOfChannels} (Stereo)`}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Peak Amplitude</div>
                <div className="text-sm font-semibold text-cyan-300 font-mono mt-0.5">
                  {getPeakDbfs()}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Uncompressed Rate</div>
                <div className="text-sm font-semibold text-slate-200 font-mono mt-0.5">
                  {Math.round((audioBuffer.sampleRate * audioBuffer.numberOfChannels * 16) / 1000)} kbps
                </div>
              </div>
            </div>

            {/* Conversion Settings & Export Panel */}
            <div className="p-5 rounded-xl bg-gradient-to-b from-[#0e1628] to-[#0a0f1d] border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Export & Format Options</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Format selection */}
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5">Target Audio Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTargetFormat('wav')}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        targetFormat === 'wav'
                          ? 'bg-cyan-950/80 border-cyan-600 text-cyan-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold">WAV (PCM)</div>
                      <div className="text-[10px] text-slate-400">16-bit Studio Master</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetFormat('webm')}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        targetFormat === 'webm'
                          ? 'bg-cyan-950/80 border-cyan-600 text-cyan-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold">WebM (Opus)</div>
                      <div className="text-[10px] text-slate-400">High-efficiency web</div>
                    </button>
                  </div>
                </div>

                {/* Channel mixing */}
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5">Channel Configuration</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setForceMono(false)}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        !forceMono
                          ? 'bg-cyan-950/80 border-cyan-600 text-cyan-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">Preserve Stereo</div>
                      <div className="text-[10px] text-slate-400">2-Channel mix</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setForceMono(true)}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        forceMono
                          ? 'bg-cyan-950/80 border-cyan-600 text-cyan-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">Force Mono</div>
                      <div className="text-[10px] text-slate-400">Optimal for voice</div>
                    </button>
                  </div>
                </div>

                {/* Gain Adjustment */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                    <span>Gain Boost / Normalization</span>
                    <span className="font-mono text-cyan-400">
                      {gainBoost === 1.0 ? '0.0 dB (Original)' : `${(20 * Math.log10(gainBoost)).toFixed(1)} dB`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.25}
                    max={2.5}
                    step={0.05}
                    value={gainBoost}
                    onChange={(e) => setGainBoost(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>-12 dB</span>
                    <span>Unity (0 dB)</span>
                    <span>+8 dB</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Bit-accurate processing rendered in local RAM</span>
                </div>

                <button
                  id="btn-export-audio"
                  type="button"
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting ? 'Encoding in Browser...' : `Export & Download .${targetFormat}`}</span>
                </button>
              </div>

              {/* Export Success Message */}
              {exportedUrl && exportedSize && (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Conversion complete! Output file: <strong>{formatFileSize(exportedSize)}</strong></span>
                  </div>
                  <a
                    href={exportedUrl}
                    download={`converted-audio.${targetFormat}`}
                    className="underline text-emerald-200 hover:text-white font-medium"
                  >
                    Download Again
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
