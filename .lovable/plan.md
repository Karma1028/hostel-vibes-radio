# Hostel Radio

## What I’ll build
- Replace the starter screen with a mobile-first, single-page hostel-night radio.
- Add an always-visible horizontal room selector for all five scenarios.
- Make each room instantly switch its colors, animated atmosphere, copy, track details, artwork treatment, and Spotify playlist.
- Embed the provided Spotify playlists for “2 AM Corridor” and “Mess Line”; use clearly marked placeholder playlist IDs for the other rooms.
- Add rotating Hinglish one-liners per room every 20 seconds.
- Add the compact hostel-boy footer credit.

## Live listeners
- Enable Lovable Cloud and use realtime presence to count currently open tabs.
- Show the live total as “🟢 N log jaag rahe hain,” with a resilient connecting state.
- Use an anonymous per-tab presence identity; no login or stored personal data.

## Visual direction
- Warm, grainy, nostalgic, dark hostel atmosphere with distinct scene palettes per room.
- Condensed display typography for room names and a readable body face.
- Soft light movement, film noise, restrained motion, and a scrappy indie feel.
- Keep Spotify’s actual player as the playback control so music works reliably and legally.

## Verification
- Check the page at mobile and desktop sizes, room switching, rotating copy, Spotify embeds, and live presence behavior.
- Confirm route metadata and the latest build status are clean.

## Technical notes
- The page remains static/client-side except for realtime presence.
- Each room will be defined in one data map so future playlist URLs are easy to replace.
- Motion will respect reduced-motion preferences.
