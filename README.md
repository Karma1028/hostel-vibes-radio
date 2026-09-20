# Hostel Vibes Radio

Build "Hostel Radio" — a single-page viral Indian website in the "aesthetic scenario radio" genre (like saloon.wtf, roadways.wtf). Concept: an always-on radio for Indian hostel/PG life at night.

LAYOUT:
- Single page, mobile-first (most traffic will be Instagram/X mobile).
- Top bar: a horizontal row of "room" tabs/pills always visible: "2 AM Corridor", "Mess Line", "Exam Night Grind", "Sunday Laundry + Cricket", "Power Cut Jam". Tapping a room instantly swaps BOTH the background scene AND the music — full theme change, not just the playlist.
- Center: large "now playing" style module — track name, artist, album art, a big play/pause button.
- Below/behind: an animated/gradient background unique per room (warm grainy dorm-corridor tones for "2 AM Corridor", bright mess-hall tones for "Mess Line", etc. — use CSS gradients/subtle motion, no heavy image assets needed for v1).
- A live counter near the top: "🟢 47 log jaag rahe hain" (uses Supabase realtime presence — count of open tabs on the site right now). Use Supabase (already available as an integration) for this.
- Small rotating Hinglish one-liner under the counter per room, e.g. "wing 3 ka fan phir se awaaz kar raha hai" — swap a random one every ~20s from a hardcoded array per room.
- Footer: tiny credit + "made for hostel boys, by a hostel boy" line.

MUSIC:
- For v1, embed the actual Spotify playlist per room using Spotify's standard iframe embed (open.spotify.com/embed/playlist/...), styled to blend with the background (dark theme param).
- Room → playlist mapping (use these real playlists, more rooms can get placeholder embeds for now):
  - "2 AM Corridor" → https://open.spotify.com/playlist/22xZHuLGU8tZSlqsuNMMKN
  - "Mess Line" → https://open.spotify.com/playlist/69aWAlr5f1arenwI2MB9ki
  - Other rooms: use a temporary placeholder Spotify playlist embed, clearly marked in code comments as TODO so I can swap the real playlist URL in later.

STYLE:
- Warm, grainy, nostalgic aesthetic — dark backgrounds, film-grain/noise texture overlay, soft glow accents. Typography: bold condensed display font for room names, clean readable body font. Hinglish copy throughout, casual and funny, not corporate.
- Should feel like a scrappy, personal, indie project — not a polished SaaS product.

Keep it to this one page for now. Use Supabase for the live presence counter only; everything else can be static/client-side.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/76ad571e-2847-4cb5-8698-b259ce7fbcc4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
