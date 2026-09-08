# Asset guide

Replace the demo artwork by adding your own assets in these folders. Keep the filenames below unless you also update `CONFIG.assets` and the memory list in `script.js`. Until then, the page uses original local SVG demo artwork from `assets/demo/`.

## Photos

Put the birthday image and timeline photos in `assets/photos/`:

- `photo-01` is used for the birthday image.
- `photo-02` through `photo-07` are used for the 2021-2026 timeline.
- `photo-08` through `photo-17` are used for the memory deck.
- `photo-18` through `photo-21` are preserved for additional memories.

Each file keeps its original extension, for example `photo-01.jpg`, `photo-01.jpeg`, or `photo-01.png`.

JPG or PNG files work. Portrait photos look especially good in the birthday and memory cards. The page crops images gently with `object-fit: cover`.

## Illustrations

Put the three story illustrations in `assets/illustrations/`:

- `story-01.png`
- `story-02.png`
- `story-03.png`

Transparent PNGs, drawings, scans, or exported artwork all work.

## Music

The top music bar automatically builds a playlist from the local songs currently configured in `script.js`:

- `assets/music/Andaz E Karam.mp3`
- `assets/music/jaane_meriye.mp3`
- `assets/music/kasam_ki_kasam.mp3`
- `assets/music/romantic.mp3`

Replace these files, or update the small `CONFIG.playlist` list in `script.js` if you want different filenames. The player attempts autoplay but gracefully waits for a tap when the browser blocks sound. If a song fails to load, the built-in original Web Audio demo melody remains available.

## Demo fallback

The page tries a real photo first, then falls back to the matching original illustration in `assets/demo/`. Demo artwork is labeled subtly as `demo artwork · replace with your memory` and disappears automatically when a real file loads.
