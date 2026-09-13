import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

function Waveform() {
  const heights = [16, 30, 44, 26, 52, 34, 20];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: 8, height: h, borderRadius: 4, background: '#ffffff' }} />
      ))}
    </div>
  );
}

export default function Icon() {
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
          borderRadius: 40,
        }}
      >
        <Waveform />
      </div>
    ),
    { ...size }
  );
}
