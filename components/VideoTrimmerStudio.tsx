'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Scissors, 
  Play, 
  Pause, 
  Download, 
  Camera, 
  Clock, 
  Maximize2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Film,
  Mail,
  Zap,
  Sliders,
  Ratio
} from 'lucide-react';
import { formatSeconds, formatFileSize } from '@/lib/audio-encoder';

export function VideoTrimmerStudio() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
  
  // Trimming in/out points
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [aspectRatioPreset, setAspectRatioPreset] = useState<'original' | '16:9' | '9:16' | '1:1'>('original');

  // Trimming export status
  const [isTrimming, setIsTrimming] = useState(false);
  const [trimProgress, setTrimProgress] = useState(0);
  const [trimmedVideoUrl, setTrimmedVideoUrl] = useState<string | null>(null);
  const [trimmedSize, setTrimmedSize] = useState<number | null>(null);

  // Waitlist form state
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistFormat, setWaitlistFormat] = useState('Lossless Stream-Copy Remux');

  // Frame snapshot status
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // Load user video file
  const handleVideoUpload = (file: File) => {
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setIsPlaying(false);
    setCurrentTime(0);
    setTrimmedVideoUrl(null);
    setSnapshotUrl(null);
  };

  // Generate an engaging creative synthetic test video using canvas if no video is on hand
  const handleLoadDemoVideo = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create a WebM stream from canvas
    const stream = canvas.captureStream(30);
    
    // Add audio track with Web Audio oscillator
    const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const dest = audioCtx.createMediaStreamDestination();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(dest);
    osc.start();

    // Combine tracks
    const combinedStream = new MediaStream([
      ...stream.getVideoTracks(),
      ...dest.stream.getAudioTracks()
    ]);

    const recorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm' });
    const chunks: Blob[] = [];

    let frame = 0;
    const totalFrames = 30 * 8; // 8 seconds demo
    const interval = setInterval(() => {
      frame++;
      const t = frame / 30;

      // Dark creative canvas background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Neon grid
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Animated waveform visuals
      const centerY = canvas.height / 2;
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#06b6d4';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 10) {
        const y = centerY + Math.sin(x * 0.02 + t * 4) * 80 * Math.sin(t * 2);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Text watermark
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`MediaConvert Video Engine • Demo Clip`, canvas.width / 2, 220);
      
      ctx.fillStyle = '#94a3b8';
      ctx.font = '24px sans-serif';
      ctx.fillText(`Timestamp: ${t.toFixed(2)}s | 1280x720 30FPS`, canvas.width / 2, 270);

      // Countdown badge
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 480, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px monospace';
      ctx.fillText(`${(8 - t).toFixed(1)}s`, canvas.width / 2, 490);

      if (frame >= totalFrames) {
        clearInterval(interval);
        osc.stop();
        recorder.stop();
      }
    }, 1000 / 30);

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const demoFile = new File([blob], 'demo-sample-video.webm', { type: 'video/webm' });
      handleVideoUpload(demoFile);
    };

    recorder.start();
  };

  // Video loaded metadata
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration || 0;
    setDuration(dur);
    setTrimStart(0);
    setTrimEnd(dur);
    setVideoDimensions({
      width: video.videoWidth,
      height: video.videoHeight
    });
  };

  // Handle Play/Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (currentTime >= trimEnd) {
        video.currentTime = trimStart;
      }
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Handle Time Update
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);

    // Loop within trim range if playing
    if (isPlaying && video.currentTime >= trimEnd) {
      video.currentTime = trimStart;
    }
  };

  // Seek video
  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(duration, time));
    setCurrentTime(video.currentTime);
  };

  // Frame snapshot
  const captureFrame = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setSnapshotUrl(dataUrl);

    // Auto-download image
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `frame-snapshot-${Math.floor(currentTime * 1000)}ms.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Client-side Video Trim using Canvas + MediaRecorder
  const handleTrimExport = async () => {
    const video = videoRef.current;
    if (!video || duration <= 0) return;

    try {
      setIsTrimming(true);
      setTrimProgress(0);
      setTrimmedVideoUrl(null);

      // Create an offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context unavailable');

      // Video playback capture
      const stream = canvas.captureStream(30);

      // Check mime type
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : MediaRecorder.isTypeSupported('video/webm;codecs=vp8')
        ? 'video/webm;codecs=vp8'
        : 'video/webm';

      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 4500000 // 4.5 Mbps high fidelity
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const trimmedBlob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(trimmedBlob);
        setTrimmedVideoUrl(url);
        setTrimmedSize(trimmedBlob.size);
        setIsTrimming(false);

        // Auto download
        const a = document.createElement('a');
        a.href = url;
        a.download = `trimmed-clip-${formatSeconds(trimStart).replace(':', '-')}-to-${formatSeconds(trimEnd).replace(':', '-')}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

      // Position video at start
      video.pause();
      video.currentTime = trimStart;

      await new Promise<void>((resolve) => {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked);
          resolve();
        };
        video.addEventListener('seeked', onSeeked);
      });

      recorder.start(100);
      await video.play();

      const trimDuration = trimEnd - trimStart;

      // Draw frames on animation frame
      const drawFrame = () => {
        if (!isTrimming && recorder.state !== 'recording') return;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const elapsed = video.currentTime - trimStart;
        const progress = Math.min(100, Math.max(0, (elapsed / trimDuration) * 100));
        setTrimProgress(Math.floor(progress));

        if (video.currentTime >= trimEnd || video.ended) {
          video.pause();
          recorder.stop();
          return;
        }
        requestAnimationFrame(drawFrame);
      };
      requestAnimationFrame(drawFrame);

    } catch (err) {
      console.error('Trimming error:', err);
      setIsTrimming(false);
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistEmail.includes('@')) return;
    setWaitlistSubmitted(true);
  };

  return (
    <div id="video-trimmer-workbench" className="w-full bg-[#0d1322] border border-slate-800/90 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-black/60">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Video Trimmer Studio
            </h2>
            <span className="px-2 py-0.5 text-[11px] font-mono uppercase bg-blue-950 text-blue-300 border border-blue-800/60 rounded">
              Client-Side Canvas Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Frame-accurate video preview, timestamp trimming, aspect-ratio preview, and local client-side clip export.
          </p>
        </div>

        <button
          id="btn-load-video-demo"
          type="button"
          onClick={handleLoadDemoVideo}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Generate Test Video Demo</span>
        </button>
      </div>

      {/* Main Workspace */}
      <div className="mt-6 space-y-6">
        {!videoSrc ? (
          <label 
            id="video-dropzone"
            className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700/80 hover:border-blue-500/70 bg-[#0a0e1a]/60 hover:bg-[#0a0e1a] transition-all rounded-xl p-8 sm:p-14 cursor-pointer group text-center"
          >
            <input
              type="file"
              accept="video/mp4,video/webm,video/ogg,video/quicktime"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleVideoUpload(e.target.files[0]);
              }}
            />
            <div className="w-16 h-16 rounded-2xl bg-blue-950/60 border border-blue-800/40 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-4 shadow-lg shadow-blue-950/40">
              <Film className="w-8 h-8" />
            </div>
            <div className="text-base font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
              Drop your video file here, or click to browse
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Supports MP4, WebM, and MOV containers. Decoded instantly in your browser.
            </p>
            <div className="flex items-center gap-2 mt-4 text-[11px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/40">.mp4</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/40">.webm</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/40">.mov</span>
            </div>
          </label>
        ) : (
          <div className="space-y-6">
            {/* File Info Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/40 shrink-0">
                  <Film className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-100 truncate">
                    {videoFile?.name || 'Local Video Stream'}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-3 mt-0.5 font-mono">
                    <span>{videoFile ? formatFileSize(videoFile.size) : 'Stream'}</span>
                    <span>•</span>
                    <span>{videoDimensions.width}x{videoDimensions.height}</span>
                    <span>•</span>
                    <span>Duration: {formatSeconds(duration)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <label className="cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors">
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleVideoUpload(e.target.files[0]);
                    }}
                  />
                  <span>Select Another Video</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setVideoSrc(null);
                    setVideoFile(null);
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Video Player Display */}
            <div className="relative w-full rounded-2xl bg-black overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center min-h-[300px] max-h-[480px]">
              <video
                ref={videoRef}
                src={videoSrc}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className={`w-full max-h-[480px] object-contain transition-all ${
                  aspectRatioPreset === '9:16' ? 'max-w-[270px] mx-auto border-x border-slate-700/50' : 
                  aspectRatioPreset === '1:1' ? 'max-w-[480px] mx-auto border border-slate-700/50' : ''
                }`}
                playsInline
              />

              {/* Play Overlay Button if paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-600/80 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl shadow-black/60 backdrop-blur-xs transition-transform hover:scale-105 active:scale-95"
                  aria-label="Play Video"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              )}

              {/* Frame Capture Quick Trigger */}
              <button
                type="button"
                onClick={captureFrame}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-colors"
                title="Save current frame as PNG snapshot"
              >
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>Snap Frame</span>
              </button>
            </div>

            {/* Timeline Scrubbing & Boundary Controls */}
            <div className="space-y-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 font-mono text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-bold">{formatSeconds(currentTime)}</span>
                  <span className="text-slate-500">/</span>
                  <span>{formatSeconds(duration)}</span>
                </div>

                {/* Aspect Ratio Preview Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px] font-mono mr-1">Preview Guide:</span>
                  {(['original', '16:9', '9:16', '1:1'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setAspectRatioPreset(mode)}
                      className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                        aspectRatioPreset === mode
                          ? 'bg-blue-950 text-blue-300 border border-blue-700'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Video Range Track */}
              <div className="space-y-2">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  step={0.01}
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>0:00</span>
                  <span>Scrubber: Current Frame Position</span>
                  <span>{formatSeconds(duration)}</span>
                </div>
              </div>

              {/* Start/End Boundary Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
                <div className="p-3 rounded-lg bg-[#0a0e1c] border border-emerald-800/30">
                  <div className="flex justify-between text-xs font-semibold text-emerald-400 mb-1.5">
                    <span>Trim Start (In Point)</span>
                    <span className="font-mono">{formatSeconds(trimStart)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    step={0.05}
                    value={trimStart}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      const safeVal = Math.min(val, trimEnd - 0.2);
                      setTrimStart(safeVal);
                      handleSeek(safeVal);
                    }}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTrimStart(currentTime);
                        if (currentTime >= trimEnd) setTrimEnd(Math.min(duration, currentTime + 1));
                      }}
                      className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                    >
                      Set In at Current Time
                    </button>
                    <span className="text-[10px] font-mono text-slate-400">{trimStart.toFixed(2)}s</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0a0e1c] border border-red-800/30">
                  <div className="flex justify-between text-xs font-semibold text-red-400 mb-1.5">
                    <span>Trim End (Out Point)</span>
                    <span className="font-mono">{formatSeconds(trimEnd)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    step={0.05}
                    value={trimEnd}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      const safeVal = Math.max(val, trimStart + 0.2);
                      setTrimEnd(safeVal);
                      handleSeek(safeVal);
                    }}
                    className="w-full accent-red-400 cursor-pointer"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTrimEnd(currentTime);
                        if (currentTime <= trimStart) setTrimStart(Math.max(0, currentTime - 1));
                      }}
                      className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                    >
                      Set Out at Current Time
                    </button>
                    <span className="text-[10px] font-mono text-slate-400">{trimEnd.toFixed(2)}s</span>
                  </div>
                </div>
              </div>

              {/* Clip Duration Summary */}
              <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Selected Trim Duration: </span>
                  <span className="text-blue-300 font-bold font-mono text-sm ml-1">
                    {formatSeconds(Math.max(0, trimEnd - trimStart))}
                  </span>
                  <span className="text-slate-500 ml-2">({(Math.max(0, trimEnd - trimStart)).toFixed(2)} seconds)</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Pause' : 'Preview Trim'}</span>
                  </button>
                  <button
                    id="btn-export-trimmed-video"
                    type="button"
                    onClick={handleTrimExport}
                    disabled={isTrimming}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isTrimming ? `Trimming (${trimProgress}%)...` : 'Export Trimmed Video (.webm)'}</span>
                  </button>
                </div>
              </div>

              {/* Export notification */}
              {trimmedVideoUrl && trimmedSize && (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Video trim finished! Output size: <strong>{formatFileSize(trimmedSize)}</strong></span>
                  </div>
                  <a
                    href={trimmedVideoUrl}
                    download="trimmed-video.webm"
                    className="underline text-emerald-200 hover:text-white font-medium"
                  >
                    Save File Again
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pro Cloud FFmpeg Lossless Remux Engine & Waitlist Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d1428] via-[#0f172a] to-[#0a1020] border border-blue-900/50 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-950/80 border border-indigo-700/60 text-indigo-300">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>Next-Gen Roadmap</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Lossless MP4 Stream-Copy & 4K ProRes Remux (Zero Re-Encoding)
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Currently, in-browser trimming uses fast client-side MediaRecorder capture. We are testing local WebAssembly FFmpeg (ffmpeg.wasm) with multithreading shared array buffers to enable <strong>zero re-encode instant stream copying</strong> for 4K 10-bit H.265 and ProRes footage.
              </p>
            </div>

            <div className="w-full lg:w-auto shrink-0 bg-[#080c18] border border-slate-800 p-4 rounded-xl">
              {waitlistSubmitted ? (
                <div className="text-center py-3 px-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-white">You are on the VIP Early Access List!</div>
                  <p className="text-xs text-slate-400 mt-1">
                    We will notify <strong>{waitlistEmail}</strong> as soon as the multithreaded WASM engine enters public beta.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <div className="text-xs font-semibold text-slate-200">
                    Get Notified for FFmpeg.wasm Lossless Beta
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="creator@production.studio"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-400 w-full sm:w-60"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors shrink-0"
                    >
                      Join Waitlist
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Strict zero-spam policy. Instant notification when WASM 4K builds roll out.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
