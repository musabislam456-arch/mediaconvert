import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

function Waveform() {
  const heights = [15, 28, 42, 24, 48, 32, 18];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: 7, height: h, borderRadius: 4, background: '#ffffff' }} />
      ))}
    </div>
  );
}

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0891b2',
        }}
      >
        <Waveform />
      </div>
    ),
    { ...size }
  );
}
