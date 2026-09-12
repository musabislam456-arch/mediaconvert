# MediaConvert

**Live site:** [mediaconvert.toolbay.site](https://mediaconvert.toolbay.site)

Fast, client-side audio and video utility suite — format conversion, video trimming, waveform inspection, and transcription notes.

## Features

- **Audio Converter** — MP3, WAV, OGG conversion
- **Video Trimmer** — precision client-side trimming
- **Audio to Text** — transcription notes
- Format guides (MP3, WAV, OGG) for SEO
- Blog for creator education
- 100% client-side — no uploads to a server

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React + TypeScript
- Tailwind CSS
- Auto-generated `sitemap.xml` and `robots.txt`

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
bun run build
bun start
```

## Project Structure

```
app/            Routes (tools/*, formats/*, blog, about, contact, privacy, terms)
components/     Shared UI components (Navbar, Footer, etc.)
lib/            Blog data and format data
```

## License

All rights reserved.
