import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play, Radio, Volume2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hostel Radio — Raat Abhi Baaki Hai" },
      {
        name: "description",
        content: "Indian hostel aur PG ki raaton ka always-on radio. Room badlo, mood badlo, gaana chalta rahe.",
      },
      { property: "og:title", content: "Hostel Radio — Raat Abhi Baaki Hai" },
      {
        property: "og:description",
        content: "Indian hostel aur PG ki raaton ka always-on radio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Room = {
  id: string;
  name: string;
  shortName: string;
  number: string;
  track: string;
  artist: string;
  playlistId: string;
  notes: string[];
};

const ROOMS: [Room, ...Room[]] = [
  {
    id: "corridor",
    name: "2 AM Corridor",
    shortName: "2 AM Corridor",
    number: "01",
    track: "Raat abhi baaki hai",
    artist: "Corridor ke puraane speakers",
    playlistId: "22xZHuLGU8tZSlqsuNMMKN",
    notes: [
      "wing 3 ka fan phir se awaaz kar raha hai",
      "kisi ke room mein maggi ban rahi hai",
      "warden ke steps hain ya overthinking?",
      "kal 8 baje class hai. theoretically.",
    ],
  },
  {
    id: "mess",
    name: "Mess Line",
    shortName: "Mess Line",
    number: "02",
    track: "Aaj paneer hai kya?",
    artist: "Steel plate orchestra",
    playlistId: "69aWAlr5f1arenwI2MB9ki",
    notes: [
      "bhai ek extra roti dena",
      "aaj ki dal suspiciously achhi hai",
      "line lambi hai, gossip usse lambi",
      "dessert ka bowl pehle reserve kar lo",
    ],
  },
  {
    id: "exam",
    name: "Exam Night Grind",
    shortName: "Exam Night",
    number: "03",
    track: "Ek chapter aur",
    artist: "Last-minute toppers association",
    // TODO: Replace with the real Exam Night Grind Spotify playlist ID.
    playlistId: "37i9dQZF1DX8NTLI2TtZa6",
    notes: [
      "syllabus dekh ke syllabus bhi darr gaya",
      "notes bhej de bhai, dua lagegi",
      "chai number chaar officially shuru",
      "5 minute break ne 45 minute le liye",
    ],
  },
  {
    id: "sunday",
    name: "Sunday Laundry + Cricket",
    shortName: "Laundry + Cricket",
    number: "04",
    track: "Kapde, catch aur commentary",
    artist: "Terrace XI",
    // TODO: Replace with the real Sunday Laundry + Cricket Spotify playlist ID.
    playlistId: "37i9dQZF1DX0XUsuxWHRQd",
    notes: [
      "woh black t-shirt meri hai shayad",
      "one tip one hand abhi bhi valid hai",
      "bucket pe naam likhna zaroori hai",
      "chhat pe dhoop, neeche full toss",
    ],
  },
  {
    id: "powercut",
    name: "Power Cut Jam",
    shortName: "Power Cut Jam",
    number: "05",
    track: "Inverter pe unplugged",
    artist: "Room 217 & friends",
    // TODO: Replace with the real Power Cut Jam Spotify playlist ID.
    playlistId: "37i9dQZF1DX4WYpdgoIcn6",
    notes: [
      "light gayi, talent aa gaya",
      "guitar ka sirf teen chord aata hai",
      "phone ki torch stage light hai ab",
      "inverter ko koi fan se mat jodo",
    ],
  },
];

function Index() {
  const [activeRoomId, setActiveRoomId] = useState(ROOMS[0].id);
  const [noteIndex, setNoteIndex] = useState(0);
  const [onlineCount, setOnlineCount] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);
  const activeRoom = useMemo(
    () => ROOMS.find((room) => room.id === activeRoomId) ?? ROOMS[0],
    [activeRoomId],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNoteIndex((current) => (current + 1) % activeRoom.notes.length);
    }, 20_000);
    return () => window.clearInterval(timer);
  }, [activeRoom]);

  useEffect(() => {
    const channel = supabase.channel("hostel-radio-live", {
      config: { presence: { key: crypto.randomUUID() } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const total = Object.values(channel.presenceState()).reduce(
          (sum, presences) => sum + presences.length,
          0,
        );
        setOnlineCount(total);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const selectRoom = (roomId: string) => {
    setActiveRoomId(roomId);
    setNoteIndex(0);
    setIsPlaying(false);
    setPlayerKey((key) => key + 1);
  };

  const togglePlayback = () => {
    setIsPlaying((playing) => !playing);
    setPlayerKey((key) => key + 1);
  };

  const embedUrl = `https://open.spotify.com/embed/playlist/${activeRoom.playlistId}?utm_source=generator&theme=0${isPlaying ? "&autoplay=1" : ""}`;

  return (
    <main className="radio-shell" data-room={activeRoom.id}>
      <div className="scene-light scene-light-one" aria-hidden="true" />
      <div className="scene-light scene-light-two" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-lockup">
          <Radio aria-hidden="true" />
          <span>HOSTEL RADIO</span>
          <span className="brand-frequency">93.5</span>
        </div>
        <nav className="room-tabs" aria-label="Hostel rooms">
          {ROOMS.map((room) => (
            <Button
              key={room.id}
              type="button"
              variant="ghost"
              className="room-tab"
              aria-pressed={room.id === activeRoom.id}
              onClick={() => selectRoom(room.id)}
            >
              <span>{room.number}</span>
              {room.shortName}
            </Button>
          ))}
        </nav>
      </header>

      <section className="radio-stage" aria-live="polite">
        <div className="presence-wrap">
          <p className="presence">
            <span className="live-dot" aria-hidden="true" />
            {onlineCount === null ? "signal dhoond rahe hain…" : `${onlineCount} log jaag rahe hain`}
          </p>
          <p key={`${activeRoom.id}-${noteIndex}`} className="room-note">
            “{activeRoom.notes[noteIndex]}”
          </p>
        </div>

        <div className="now-playing">
          <div className="album-art" aria-hidden="true">
            <div className="album-window">
              <span className="album-number">{activeRoom.number}</span>
              <span className="album-label">HOSTEL<br />RADIO</span>
              <div className="album-sun" />
              <div className="album-lines" />
            </div>
          </div>

          <div className="track-copy">
            <p className="eyebrow"><span /> LIVE FROM THE HOSTEL</p>
            <h1>{activeRoom.name}</h1>
            <p className="track-name">{activeRoom.track}</p>
            <p className="artist">{activeRoom.artist}</p>
            <div className="play-row">
              <Button
                type="button"
                className="play-button"
                size="icon"
                onClick={togglePlayback}
                aria-label={isPlaying ? "Pause radio" : "Play radio"}
              >
                {isPlaying ? <Pause /> : <Play className="play-icon" />}
              </Button>
              <div className={`equalizer ${isPlaying ? "is-playing" : ""}`} aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
              </div>
              <Volume2 className="volume-icon" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="spotify-wrap">
          <iframe
            key={`${activeRoom.id}-${playerKey}`}
            title={`${activeRoom.name} Spotify playlist`}
            src={isPlaying ? embedUrl : `https://open.spotify.com/embed/playlist/${activeRoom.playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
        <p className="player-hint">Spotify pe baj raha hai · login ho toh full gaane</p>
      </section>

      <footer>
        <span>MADE FOR HOSTEL BOYS, BY A HOSTEL BOY</span>
        <span className="footer-mark">© 2026 · RAAT ABHI BAAKI HAI</span>
      </footer>
    </main>
  );
}
