CREATE TABLE public.plays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  room_id text,
  song_title text NOT NULL CHECK (char_length(song_title) BETWEEN 1 AND 300),
  artist text NOT NULL CHECK (char_length(artist) BETWEEN 1 AND 300),
  source text NOT NULL CHECK (source IN ('room', 'search')),
  search_query text CHECK (search_query IS NULL OR char_length(search_query) <= 300)
);

GRANT INSERT ON public.plays TO anon, authenticated;
GRANT ALL ON public.plays TO service_role;

ALTER TABLE public.plays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anonymous visitors can log plays"
ON public.plays
FOR INSERT
TO anon, authenticated
WITH CHECK (
  source IN ('room', 'search')
  AND song_title <> ''
  AND artist <> ''
  AND (source = 'room' OR room_id IS NULL)
);

CREATE INDEX plays_created_at_idx ON public.plays (created_at DESC);
CREATE INDEX plays_room_id_idx ON public.plays (room_id) WHERE room_id IS NOT NULL;