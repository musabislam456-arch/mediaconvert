'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';
import { formatSeconds } from '@/lib/audio-encoder';

interface WaveformCanvasProps {
  audioBuffer: AudioBuffer | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onSeek: (time: number) => void;
  trimStart?: number;
  trimEnd?: number;
  onTrimChange?: (start: number, end: number) => void;
  showTrimHandles?: boolean;
}

export function WaveformCanvas({
  audioBuffer,
  currentTime,
  duration,
  isPlaying,
  onSeek,
  trimStart = 0,
  trimEnd,
  onTrimChange,
  showTrimHandles = false,
}: WaveformCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const effectiveEnd = trimEnd !== undefined ? trimEnd : duration;

  // Render the waveform on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Time subdivisions
    const step = width / 6;
    for (let i = 1; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step, height);
      ctx.stroke();
    }

    // If we have an AudioBuffer, extract real peaks
    if (audioBuffer && duration > 0) {
      const channelData = audioBuffer.getChannelData(0);
      const totalSamples = channelData.length;
      const barWidth = 2.5;
      const gap = 1.5;
      const totalBars = Math.floor(width / (barWidth + gap));
      const samplesPerBar = Math.floor(totalSamples / totalBars);

      for (let i = 0; i < totalBars; i++) {
        let max = 0;
        const start = i * samplesPerBar;
        const end = Math.min(start + samplesPerBar, totalSamples);

        for (let j = start; j < end; j += 4) {
          const abs = Math.abs(channelData[j]);
          if (abs > max) max = abs;
        }

        // Non-linear scaling for visible quiet passages
        const barHeight = Math.max(3, Math.pow(max, 0.7) * (height * 0.85));
        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2;
        const barTime = (i / totalBars) * duration;

        // Determine bar color based on playback and trim regions
        const isPast = barTime <= currentTime;
        const isInTrim = barTime >= trimStart && barTime <= effectiveEnd;

        if (isPast) {
          ctx.fillStyle = '#06b6d4'; // Cyan 400 for played portion
        } else if (showTrimHandles && !isInTrim) {
          ctx.fillStyle = 'rgba(71, 85, 105, 0.4)'; // Dimmed out of trim
        } else {
          ctx.fillStyle = '#6366f1'; // Indigo 500 for unplayed active
        }

        // Rounded bar
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 1.5);
        ctx.fill();
      }
    } else {
      // Mock idle aesthetic waveform before file upload
      const barWidth = 3;
      const gap = 2;
      const totalBars = Math.floor(width / (barWidth + gap));
      for (let i = 0; i < totalBars; i++) {
        const factor = Math.sin(i * 0.12) * Math.cos(i * 0.05);
        const barHeight = Math.max(6, Math.abs(factor) * (height * 0.6) + 8);
        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2;

        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 1.5);
        ctx.fill();
      }
    }

    // Draw trim boundaries if enabled
    if (showTrimHandles && duration > 0) {
      const trimStartX = (trimStart / duration) * width;
      const trimEndX = (effectiveEnd / duration) * width;

      // Dimmed left region
      ctx.fillStyle = 'rgba(10, 15, 29, 0.65)';
      ctx.fillRect(0, 0, trimStartX, height);
      // Dimmed right region
      ctx.fillRect(trimEndX, 0, width - trimEndX, height);

      // Start handle line
      ctx.strokeStyle = '#10b981'; // Emerald
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(trimStartX, 0);
      ctx.lineTo(trimStartX, height);
      ctx.stroke();

      // End handle line
      ctx.strokeStyle = '#ef4444'; // Red
      ctx.beginPath();
      ctx.moveTo(trimEndX, 0);
      ctx.lineTo(trimEndX, height);
      ctx.stroke();
    }

    // Draw Playhead cursor
    if (duration > 0) {
      const playheadX = Math.max(0, Math.min(width, (currentTime / duration) * width));
      ctx.strokeStyle = '#f8fafc'; // White cursor
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();

      // Playhead top marker triangle
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(playheadX - 5, 0);
      ctx.lineTo(playheadX + 5, 0);
      ctx.lineTo(playheadX, 8);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }, [audioBuffer, currentTime, duration, trimStart, effectiveEnd, showTrimHandles]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || duration <= 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.width));
    const clickRatio = (e.clientX - rect.left) / rect.width;
    const seekTime = Math.max(0, Math.min(duration, clickRatio * duration));
    onSeek(seekTime);
    setIsDraggingPlayhead(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingPlayhead || !canvasRef.current || duration <= 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(clickRatio * duration);
  };

  const handlePointerUp = () => {
    setIsDraggingPlayhead(false);
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-2 select-none">
      <div className="relative w-full h-28 bg-[#0b101e] border border-slate-800 rounded-xl overflow-hidden shadow-inner group">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-pointer touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />

        {/* Time overlay indicator */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-300 pointer-events-none backdrop-blur-xs">
          {formatSeconds(currentTime)} / {formatSeconds(duration)}
        </div>
      </div>

      {/* Axis markers */}
      <div className="flex justify-between text-[10px] font-mono text-slate-400 px-1">
        <span>0:00</span>
        <span>{formatSeconds(duration * 0.25)}</span>
        <span>{formatSeconds(duration * 0.5)}</span>
        <span>{formatSeconds(duration * 0.75)}</span>
        <span>{formatSeconds(duration)}</span>
      </div>
    </div>
  );
}
