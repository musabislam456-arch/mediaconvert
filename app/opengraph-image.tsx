import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MediaConvert — Fast Audio & Video Utility Suite';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function Waveform() {
  const heights = [18, 34, 50, 30, 60, 40, 22, 46, 28, 16];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: 8, height: h, borderRadius: 4, background: '#ffffff' }} />
      ))}
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 70% 30%, #083344 0%, #090d16 65%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 22,
              background: '#0891b2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(8,145,178,0.5)',
            }}
          >
            <Waveform />
          </div>
          <div style={{ fontSize: 62, fontWeight: 800, color: '#ffffff', letterSpacing: -1 }}>
            MediaConvert
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#a5f3fc', maxWidth: 940, textAlign: 'center' }}>
          Fast Audio &amp; Video Utility Suite (Client-Side)
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 16 }}>
          {['Convert', 'Trim', 'Waveform', 'Private'].map((t) => (
            <div
              key={t}
              style={{
                padding: '10px 24px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                color: '#cffafe',
                fontSize: 20,
                border: '1px solid rgba(6,182,212,0.35)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
