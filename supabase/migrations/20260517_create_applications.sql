CREATE TABLE applications (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT now(),

  -- Bloco 1
  full_name       TEXT        NOT NULL,
  email           TEXT        NOT NULL,
  phone           TEXT        NOT NULL,
  university      TEXT        NOT NULL,
  course          TEXT        NOT NULL,
  academic_year   TEXT        NOT NULL,
  has_event_xp    BOOLEAN     NOT NULL,
  event_xp_desc   TEXT,
  availability    TEXT        NOT NULL,
  can_travel      TEXT        NOT NULL,

  -- Bloco 2
  sector_prefs    JSONB       NOT NULL,
  motivation      TEXT        NOT NULL,
  differentiation TEXT        NOT NULL,
  how_found_out   TEXT        NOT NULL,

  -- Bloco 3 — keyed by sector slug
  sector_answers  JSONB       NOT NULL
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert" ON applications FOR INSERT TO anon WITH CHECK (true);
