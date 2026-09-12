/**
 * Pure client-side AudioBuffer to 16-bit PCM RIFF WAV encoder.
 * Executes entirely in the user's browser without uploading any data.
 */

export function audioBufferToWav(
  buffer: AudioBuffer,
  options: {
    startSec?: number;
    endSec?: number;
    gain?: number;
    forceMono?: boolean;
  } = {}
): Blob {
  const sampleRate = buffer.sampleRate;
  const numChannels = options.forceMono ? 1 : buffer.numberOfChannels;
  
  const startSec = Math.max(0, options.startSec ?? 0);
  const endSec = Math.min(buffer.duration, options.endSec ?? buffer.duration);
  const startSample = Math.floor(startSec * sampleRate);
  const endSample = Math.max(startSample + 1, Math.floor(endSec * sampleRate));
  const sampleLength = endSample - startSample;
  
  const gain = options.gain ?? 1.0;
  
  // 16-bit PCM = 2 bytes per sample
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = sampleLength * blockAlign;
  const headerSize = 44;
  const totalSize = headerSize + dataSize;
  
  const arrayBuffer = new ArrayBuffer(totalSize);
  const view = new DataView(arrayBuffer);
  
  // Helper to write ASCII strings to DataView
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };
  
  // RIFF chunk descriptor
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true); // ChunkSize
  writeString(8, 'WAVE');
  
  // "fmt " sub-chunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // BitsPerSample
  
  // "data" sub-chunk
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);
  
  // Extract channel PCM data
  let channelData: Float32Array[] = [];
  if (options.forceMono && buffer.numberOfChannels > 1) {
    const ch0 = buffer.getChannelData(0);
    const ch1 = buffer.getChannelData(1);
    const mono = new Float32Array(sampleLength);
    for (let i = 0; i < sampleLength; i++) {
      const idx = startSample + i;
      mono[i] = ((ch0[idx] || 0) + (ch1[idx] || 0)) * 0.5;
    }
    channelData = [mono];
  } else {
    for (let c = 0; c < numChannels; c++) {
      channelData.push(buffer.getChannelData(c).subarray(startSample, endSample));
    }
  }
  
  // Write interleaved 16-bit PCM samples
  let offset = 44;
  for (let i = 0; i < sampleLength; i++) {
    for (let c = 0; c < numChannels; c++) {
      let sample = channelData[c][i] * gain;
      // Soft clamp to prevent harsh digital clipping
      sample = Math.max(-1, Math.min(1, sample));
      // Convert float [-1.0, 1.0] to int16 [-32768, 32767]
      const intSample = sample < 0 ? sample * 32768 : sample * 32767;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }
  
  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

export function formatSeconds(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs.toString().padStart(2, '0')}:${remMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
