import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MediaConvert',
    short_name: 'MediaConvert',
    description:
      'Fast Audio & Video Utility Suite - convert, trim and analyze media entirely in your browser.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090d16',
    theme_color: '#0891b2',
    icons: [
      { src: '/icon', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
